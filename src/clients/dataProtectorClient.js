import {
  IExecDataProtector,
  IExecDataProtectorCore,
  IExecDataProtectorSharing,
} from "@iexec/dataprotector";
import { useUserStore } from "../stores/user.store";
import { getConnector } from "../stores/connectorManager";

let dataProtectorCore = null;
let dataProtectorSharing = null;

export const cleanDataProtectorSDK = () => {
  dataProtectorCore = null;
};

export const initDataProtectorSDK = async ({ connector }) => {
  const provider = await connector?.getProvider();
  console.log("Initializing iExec DataProtector SDK", provider);

  // Uncomment and configure if necessary
  // const iexecOptions = {
  //   smsURL: process.env.VITE_SMS_URL || undefined,
  //   iexecGatewayURL: process.env.VITE_IEXEC_GATEWAY_URL || undefined,
  //   resultProxyURL: process.env.VITE_RESULT_PROXY_URL || undefined,
  // };

  const dataProtectorOptions = {
    subgraphUrl: import.meta.env.VITE_DATAPROTECTOR_SUBGRAPH_URL,
    ipfsGateway: import.meta.env.VITE_IPFS_GATEWAY_URL,
    ipfsNode: import.meta.env.VITE_IPFS_NODE_URL,
  };

  const dataProtector = new IExecDataProtector(provider);

  dataProtectorCore = dataProtector.core;
  dataProtectorSharing = dataProtector.sharing;
};

export async function getDataProtectorClient() {
  if (!dataProtectorCore) {
    const connector = getConnector();
    console.log("Connector", connector);

    await initDataProtectorSDK({ connector });
  }
  if (!dataProtectorCore || !dataProtectorSharing) {
    throw new Error("iExecDataProtector is not initialized");
  }
  return { dataProtectorCore, dataProtectorSharing };
}
