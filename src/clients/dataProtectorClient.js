import { IExecDataProtector } from "@iexec/dataprotector";
import { useUserStore } from "../stores/user.store";
import { getConnector } from "../stores/connectorManager";

let dataProtectorCore = null;
let dataProtectorSharing = null;

export const cleanDataProtectorSDK = () => {
  dataProtectorCore = null;
};

export const initDataProtectorSDK = async ({ connector }) => {
  console.log("Initializing data protector SDK...");
  const provider = await connector?.getProvider();

  const dataProtectorOptions = {
    subgraphUrl: import.meta.env.VITE_DATAPROTECTOR_SUBGRAPH_URL,
    ipfsGateway: import.meta.env.VITE_IPFS_GATEWAY_URL,
    ipfsNode: import.meta.env.VITE_IPFS_NODE_URL,
  };

  const dataProtector = new IExecDataProtector(provider, dataProtectorOptions);

  dataProtectorCore = dataProtector.core;
  dataProtectorSharing = dataProtector.sharing;

  console.log("Data protector SDK initialized", {
    dataProtectorCore,
    dataProtectorSharing,
  });

  return { dataProtectorCore, dataProtectorSharing };
};

// export const getDataProtectorClient = async () => {
//   if (!dataProtectorCore || !dataProtectorSharing) {
//     const connector = getConnector();
//     if (!connector) throw new Error("No connector available");

//     await initDataProtectorSDK({ connector });
//   }

//   if (!dataProtectorCore || !dataProtectorSharing) {
//     throw new Error("iExecDataProtector is not initialized");
//   }

//   return { dataProtectorCore, dataProtectorSharing };
// };
