import { OnTransactionHandler } from '@metamask/snaps-types';
import { panel, text, heading } from '@metamask/snaps-ui';
import { Json } from '@metamask/utils';
import { ethers } from 'ethers'

interface ABIConfig {
  abi: string
  args: string[]
}

const ABIs: ABIConfig[] = [
  {
    abi: "function transfer(address to, uint amount) returns (bool)",
    args: ["to"]
  },
  {
    abi: "function transferFrom(address from, address to, uint amount)",
    args: ["from", "to"]
  },
  {
    abi: "function approve(address spender, uint256 amount)",
    args: ["spender"]
  }
]

interface LabeledAddresses {
  address: string;
  labels: string[];
}

interface AddressResponse {
  results: LabeledAddresses[];
}

const getScams = async (addrs: string[]): Promise<AddressResponse> => {
  const url = `https://api.forta.network/address-risk/addresses?addresses=${addrs.join(",")}`;
  const resp = await fetch(url);
  return (await resp.json()) as AddressResponse;
};

function toPanel(map: { [key: string]: any }) {
  const result = []
  for (let key in map) {
    result.push(heading(key))
    result.push(text(map[key]))
  }
  return panel(result)
}

function collectAddresess(data: string): { [key: string]: boolean } {
  const dict: { [key: string]: boolean } = {}
  for (const abiCfg of ABIs) {
    try {
      const iface = new ethers.utils.Interface([abiCfg.abi])
      const res = iface.parseTransaction({ data })
      for (const arg of abiCfg.args) {
        const addr = res?.args[arg];
        if (addr) {
          dict[addr] = true
        }
      }
    } catch (e) {
      // squash, this just means it wasn't matched
    }
  }
  return dict
}

export const onTransaction: OnTransactionHandler = async (args: {
  transaction: {
    [key: string]: Json;
  };
  chainId: string;
  transactionOrigin?: string;
}) => {
  const { transaction, chainId, transactionOrigin } = args
  console.log(transaction);
  var insights: { [key: string]: any } = {};

  try {
    let addresses: { [key: string]: boolean } = {
      [transaction.to as string]: true,
    }
    if (transaction.data) {
      addresses = { ...addresses, ...collectAddresess(transaction.data as string) }
    }

    const scams = await getScams(Object.keys(addresses));
    const badAddresses = scams.results.map((r) => r.address);

    if (badAddresses.length == 0) {
      insights['✅ Low Risk'] =
        'There are no detected issues with this transaction.';
    } else {
      insights['🚨 High Risk'] = 'Do not confirm this transaction!';
      insights[
        'Forta Details'
      ] = `Forta detected high-risk addresses:\n${badAddresses.join('\n')}`;
    }
    return {
      content: toPanel(insights)
    };
  } catch (e) {
    console.log(e);
    return {
      content: e.message
    };
  }
};
