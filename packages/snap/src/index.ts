import { OnRpcRequestHandler } from '@metamask/snap-types';
import { OnTransactionHandler } from '@metamask/snap-types';
import { NETWORKS_BY_CHAIN_ID } from './network';
import { abiFetch } from './abi-fetch';
import { ethers } from 'ethers';

/**
 * Get a message from the origin. For demonstration purposes only.
 *
 * @param originString - The origin string.
 * @returns A message based on the origin.
 */
export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

const labels: { [key: string]: string } = {
  scam: 'Address has been involved in scams',
};

interface LabeledAddresses {
  label: string;
  addresses: { [address: string]: number };
}

interface AddressResponse {
  results: LabeledAddresses[];
}

interface AddressLabels {
  address: string;
  labels: string[];
}

interface LabelResponse {
  results: AddressLabels[];
}

const getScams = async (): Promise<AddressResponse> => {
  const url = `https://api.forta.network/address-risk/addresses?labels=scam`;
  const resp = await fetch(url);
  return (await resp.json()) as AddressResponse;
};

// this might be helpful if we need it
const extractAddresses = async (
  chainId: string,
  transaction: { [key: string]: unknown },
): Promise<string[]> => {
  let results = [transaction.to as string];

  try {
    const chainIdSegments = chainId.split(':');
    if (chainIdSegments.length == 2) {
      const nw = NETWORKS_BY_CHAIN_ID[parseInt(chainIdSegments[1], 10)];
      if (nw) {
        const abi = await abiFetch(transaction.to as string, nw);
        const iface = new ethers.utils.Interface(abi);

        console.log('PARSED INTERFACE');
        console.log(JSON.stringify(iface));

        const tx = iface.parseTransaction({ data: transaction.data as string });
        console.log('PARSED TRANSACTION');
        console.log(JSON.stringify(tx));

        for (let i = 0; i < tx.functionFragment.inputs.length; i++) {
          if (tx.functionFragment.inputs[i].baseType === 'address') {
            if (tx.args.length > i) {
              results.push(tx.args[i]);
            }
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  return results;
};

function contains(haystack: string, needle: string): Boolean {
  const hs = haystack.replace(/0x/g, '').toLowerCase();
  const nd = needle.replace(/0x/g, '').toLowerCase();
  return hs.indexOf(nd) > 0;
}

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}) => {
  console.log(transaction);
  var insights: { [key: string]: any } = {};

  try {
    const toAddress = (transaction.to as string).toLowerCase();
    const data = (transaction.data as string).toLowerCase();
    const scams = await getScams();

    const badAddresses = [];
    for (let result of scams.results) {
      if (labels[result.label]) {
        for (let addr in result.addresses) {
          if (contains(data, addr)) {
            badAddresses.push(addr);
          }
          if (contains(data, toAddress)) {
            badAddresses.push(toAddress);
          }
        }
      }
    }

    if (badAddresses.length == 0) {
      insights['Results'] =
        'There are no detected issues with this transaction.';
    } else if (badAddresses.length == 1) {
      insights['Recommendation'] = 'Do not confirm this transaction';
      insights[
        'Details'
      ] = `The following address has been involved in scams:\n${badAddresses[0]}`;
    } else {
      insights['Recommendation'] = 'Do not confirm this transaction';
      insights[
        'Details'
      ] = `The following addresses have been involved in scams:\n${badAddresses.join(
        '\n',
      )}`;
    }

    return {
      insights,
    };
  } catch (e) {
    console.log(e);
    return {
      insights: {
        Error: e.message,
      },
    };
  }
};

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_confirm` call failed.
 */
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: getMessage(origin),
            description:
              'This custom confirmation is just for display purposes.',
            textAreaContent:
              'But you can edit the snap source code to make it do something, if you want to!',
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};
