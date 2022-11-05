import { ethers } from "ethers";
import { NETWORK_INFO, Network } from "./network";

export async function abiFetch(
  contractAddress: string,
  network: Network
): Promise<Array<ethers.utils.Fragment>> {
  const proxyImplementationAddress = await checkProxyImplementation(
    contractAddress,
    network
  );
  const address = proxyImplementationAddress || contractAddress;

  for(let i=0; i<3; i++) {
    await new Promise(r => setTimeout(r, 5000));

    let responses = await Promise.allSettled([
      getAbiFromBlockExplorer(address, network),
      getAbiFromSourcify(address, network),
    ]);
  
    for(let response of responses) {
      console.log(JSON.stringify(response))
      if(response.status === "fulfilled" && !!response.value) {
        console.log("RETURNING ABI")
        return abiParse(response.value);
      }
    }

    // avoid rate limits
  }

 

  throw new Error("Request error");
}

async function checkProxyImplementation(
  address: string,
  network: Network
): Promise<string | undefined> {
  try {
    const response = await fetch(NETWORK_INFO[network].rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "eth_getStorageAt",
        id: Date.now(),
        jsonrpc: "2.0",
        params: [
          address,
          "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc",
          "latest",
        ],
      }),
    });

    if (!response.ok) {
      return undefined;
    }

    const { result } = await response.json();
    if (
      result ===
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    ) {
      return undefined;
    }

    return `0x${result.replace("0x000000000000000000000000", "")}`;
  } catch (_) {
    console.log("error fetching proxy implementation address");
  }

  return undefined;
}

async function getAbiFromBlockExplorer(
  address: string,
  network: Network
): Promise<Array<ethers.utils.Fragment> | undefined> {
  try {
    const blockExplorerUrl = NETWORK_INFO[network].blockExplorerUrl;

    console.log(`https://${blockExplorerUrl}/api?module=contract&action=getabi&address=${address}`)

    const response = await fetch(
      `https://${blockExplorerUrl}/api?module=contract&action=getabi&address=${address}`
    );

    console.log(response.status)
      
    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    return JSON.parse(data.result);
  } catch (_) {
    throw new Error("Block explorer ABI request error");
  }
}

async function getAbiFromSourcify(
  address: string,
  network: Network
): Promise<Array<ethers.utils.Fragment> | undefined> {
  try {
    const chainId = NETWORK_INFO[network].chainId;
    const response = await fetch(
      `https://repo.sourcify.dev/contracts/full_match/${chainId}/${address}/metadata.json`
    );

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    return data.output.abi;
  } catch (_) {
    throw new Error("Sourcify ABI request error");
  }
}

export function abiParse(
  abi: Array<ethers.utils.Fragment> | { abi: Array<ethers.utils.Fragment> }
): Array<ethers.utils.Fragment> {
  if (!Array.isArray(abi)) abi = abi["abi"];

  try {
    new ethers.utils.Interface(abi);
    return abi;
  } catch (err) {
    throw new Error(err.message);
  }
}