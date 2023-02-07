import { OnTransactionHandler } from '@metamask/snap-types';

const labels: { [key: string]: boolean } = {
  scam: true,
};

interface LabeledAddresses {
  label: string;
  addresses: { [address: string]: number };
}

interface AddressResponse {
  results: LabeledAddresses[];
}

const getScams = async (): Promise<AddressResponse> => {
  const url = `https://api.forta.network/address-risk/addresses?labels=scam`;
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
    if (hs.indexOf(nd) > 0) {
      return true;
    }
  }
  return false;
}

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}) => {
  console.log(transaction);
  var insights: { [key: string]: any } = {};

  try {
    const toAddress = transaction.to
      ? (transaction.to as string).toLowerCase()
      : '';
    const data = transaction.data
      ? (transaction.data as string).toLowerCase()
      : '';
    const scams = await getScams();

    const badAddresses = [];
    for (let result of scams.results) {
      if (labels[result.label]) {
        for (let addr in result.addresses) {
          if (anyContains([data, toAddress], addr)) {
            badAddresses.push(`${addr} (${result.addresses[addr]} scams)`);
          }
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
