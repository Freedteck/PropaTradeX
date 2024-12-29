import { http, createConfig } from "wagmi";
// import { mainnet, sepolia } from "wagmi/chains";
// import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { bellecour } from "./bellecourChainConfig";
import { getDefaultConfig } from "connectkit";

// Wagmi Client initialization
if (!import.meta.env.VITE_WC_PROJECT_ID) {
  throw new Error(
    "You need to provide VITE_WALLET_CONNECT_PROJECT_ID env variable"
  );
}

// WalletConnect project ID
export const projectId = import.meta.env.VITE_WC_PROJECT_ID;

// export const config = createConfig({
//   chains: [bellecour],
//   connectors: [
//     injected(),
//     coinbaseWallet(),
//     walletConnect({ projectId, metadata }),
//   ],
//   transports: {
//     [bellecour.id]: http(),
//   },
// });

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [bellecour],
    transports: {
      [bellecour.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId: projectId,

    // Required App Info
    appName: "PropaTradeX",

    // Optional App Info
    appDescription: "Decentralized Real Estate Platform",
    appUrl: "https://github.com/Freedteck/PropaTradeX", // your app's url
    appIcon:
      "https://raw.githubusercontent.com/Freedteck/PropaTradeX/main/public/favicon.ico", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

// declare module "wagmi" {
//   interface Register {
//     config: typeof config;
//   }
// }
