
  export enum Network {
    ETHEREUM = "Ethereum",
    AVALANCHE = "Avalanche",
    POLYGON = "Polygon",
    BINANCE_SMART_CHAIN = "Binance Smart Chain",
    FANTOM = "Fantom",
    ARBITRUM = "Arbitrum",
    OPTIMISM = "Optimism",
    GOERLI = "Goerli"
  }
  
  export interface NetworkMetadata {
    chainId: number;
    blockExplorerUrl: string;
    rpcUrl: string;
  }

  export const NETWORKS_BY_CHAIN_ID: Record<number, Network> = {
    [1]: Network.ETHEREUM,
    [43114]: Network.AVALANCHE,
    [137]: Network.POLYGON,
    [56]: Network.BINANCE_SMART_CHAIN,
    [250]: Network.FANTOM,
    [42161]: Network.ARBITRUM,
    [10]: Network.OPTIMISM,
    [5]: Network.GOERLI,
  }
  
  export const NETWORK_INFO: Record<Network, NetworkMetadata> = {
    [Network.ETHEREUM]: {
      chainId: 1,
      blockExplorerUrl: "api.etherscan.io",
      rpcUrl: "https://cloudflare-eth.com/",
    },
    [Network.AVALANCHE]: {
      chainId: 43114,
      blockExplorerUrl: "api.snowtrace.io",
      rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    },
    [Network.POLYGON]: {
      chainId: 137,
      blockExplorerUrl: "api.polygonscan.com",
      rpcUrl: "https://polygon-rpc.com/",
    },
    [Network.BINANCE_SMART_CHAIN]: {
      chainId: 56,
      blockExplorerUrl: "api.bscscan.com",
      rpcUrl: "https://bsc-dataseed.binance.org/",
    },
    [Network.FANTOM]: {
      chainId: 250,
      blockExplorerUrl: "api.ftmscan.com",
      rpcUrl: "https://rpc.ankr.com/fantom/",
    },
    [Network.ARBITRUM]: {
      chainId: 42161,
      blockExplorerUrl: "api.arbiscan.io",
      rpcUrl: "https://arb1.arbitrum.io/rpc",
    },
    [Network.OPTIMISM]: {
      chainId: 10,
      blockExplorerUrl: "api-optimistic.etherscan.io",
      rpcUrl: "https://mainnet.optimism.io/",
    },
    [Network.GOERLI]: {
      chainId: 5,
      blockExplorerUrl: "api-goerli.etherscan.io",
      rpcUrl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
  };