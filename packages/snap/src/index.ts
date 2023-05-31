import { OnTransactionHandler } from '@metamask/snaps-types';
import { panel, text, heading } from '@metamask/snaps-ui';
import { Json } from '@metamask/utils';

const labels = [
  "scammer-eoa", "scammer-contract"
]

interface LabeledAddresses {
  label: string;
  addresses: { [address: string]: number };
}

interface AddressResponse {
  results: LabeledAddresses[];
}

const getScams = async (): Promise<AddressResponse> => {
  const url = `https://api.forta.network/address-risk/addresses?labels=${labels.join(",")}`;
  const resp = await fetch(url);
  return (await resp.json()) as AddressResponse;
};

function anyContains(haystacks: string[], needle: string): Boolean {
  if (!needle) {
    return false;
  }
  for (let haystack of haystacks) {
    if (!haystack) {
      continue;
    }
    const hs = haystack.replace(/0x/g, '').toLowerCase();
    const nd = needle.replace(/0x/g, '').toLowerCase();
    if (hs.indexOf(nd) >= 0) {
      return true;
    }
  }
  return false;
}

function padData(data: string): string {
  if (!data) {
    return data;
  }

  // ensure data length-4 is evenly divisible by 32
  const b = Buffer.from(data.replace('0x', ''), 'hex');
  const padLevel = (b.length - 4) % 32;
  if (padLevel == 0) {
    return data;
  }

  // append 00 bytes
  let suffix = '';
  for (let i = 0; i < 32 - padLevel; i++) {
    suffix += '00';
  }
  return `${data}${suffix}`;
}

function toPanel(map: { [key: string]: any }) {
  const result = []
  for (let key in map) {
    result.push(heading(key))
    result.push(text(map[key]))
  }
  return panel(result)
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
    const toAddress = transaction.to
      ? (transaction.to as string).toLowerCase()
      : '';
    const data = padData(
      transaction.data ? (transaction.data as string).toLowerCase() : '',
    );

    const scams = await getScams();

    const badAddresses = [];
    for (let result of scams.results) {
      for (let addr in result.addresses) {
        if (anyContains([data, toAddress], addr)) {
          badAddresses.push(`${addr} (${result.addresses[addr]} scams)`);
        }
      }
    }

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
