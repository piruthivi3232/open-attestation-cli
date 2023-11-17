import { providers } from "ethers";

export type networkCurrency = "ETH" | "MATIC" | "XDC" | "HBAR";

type SupportedNetwork = {
  explorer: string;
  provider: () => providers.Provider;
  networkId: number;
  networkName: string;
  currency: networkCurrency;
};

export enum NetworkCmdName {
  Local = "local",
  Mainnet = "mainnet",
  Sepolia = "sepolia",
  Matic = "matic",
  Maticmum = "maticmum",
  XDC = "xdc",
  XDCApothem = "xdcapothem",
  HederaMainnet = "hederamainnet",
  HederaTestnet = "hederatestnet",
}

const defaultInfuraProvider =
  (networkName: string): (() => providers.Provider) =>
  () =>
    new providers.InfuraProvider(networkName);

const jsonRpcProvider =
  (url: string): (() => providers.Provider) =>
  () =>
    new providers.JsonRpcProvider(url);

export const supportedNetwork: {
  [key in NetworkCmdName]: SupportedNetwork;
} = {
  [NetworkCmdName.Local]: {
    explorer: "https://localhost/explorer",
    provider: jsonRpcProvider("http://127.0.0.1:8545"),
    networkId: 1337,
    networkName: "local",
    currency: "ETH",
  },
  [NetworkCmdName.Mainnet]: {
    explorer: "https://etherscan.io",
    provider: defaultInfuraProvider("homestead"),
    networkId: 1,
    networkName: "homestead",
    currency: "ETH",
  },
  [NetworkCmdName.Sepolia]: {
    explorer: "https://sepolia.etherscan.io",
    provider: jsonRpcProvider("https://sepolia.infura.io/v3/bb46da3f80e040e8ab73c0a9ff365d18"),
    networkId: 11155111,
    networkName: "sepolia",
    currency: "ETH",
  },
  [NetworkCmdName.Matic]: {
    explorer: "https://polygonscan.com",
    provider: defaultInfuraProvider("matic"),
    networkId: 137,
    networkName: "matic",
    currency: "MATIC",
  },
  [NetworkCmdName.Maticmum]: {
    explorer: "https://mumbai.polygonscan.com",
    provider: defaultInfuraProvider("maticmum"),
    networkId: 80001,
    networkName: "maticmum",
    currency: "MATIC",
  },
  [NetworkCmdName.XDC]: {
    explorer: "https://xdcscan.io",
    provider: jsonRpcProvider("https://erpc.xinfin.network"),
    networkId: 50,
    networkName: "xdc",
    currency: "XDC",
  },
  [NetworkCmdName.XDCApothem]: {
    explorer: "https://apothem.xdcscan.io",
    provider: jsonRpcProvider("https://erpc.apothem.network"),
    networkId: 51,
    networkName: "xdcapothem",
    currency: "XDC",
  },
  [NetworkCmdName.HederaMainnet]: {
    explorer: "https://hashscan.io/mainnet",
    provider: jsonRpcProvider("https://mainnet.hashio.io/api"),
    networkId: 295,
    networkName: "hederamainnet",
    currency: "HBAR",
  },
  [NetworkCmdName.HederaTestnet]: {
    explorer: "https://hashscan.io/testnet",
    provider: jsonRpcProvider("https://testnet.hashio.io/api"),
    networkId: 296,
    networkName: "hederatestnet",
    currency: "HBAR",
  },
};

export const getSupportedNetwork = (networkCmdName: string): SupportedNetwork => {
  return supportedNetwork[networkCmdName as NetworkCmdName];
};
