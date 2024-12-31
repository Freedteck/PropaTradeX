import {
  IExecDataProtector,
  IExecDataProtectorCore,
  IExecDataProtectorSharing,
} from "@iexec/dataprotector";
import { Connector } from "wagmi";
import { useUserStore } from "../stores/user.store";

let dataProtectorCore: IExecDataProtectorCore | null = null;
let dataProtectorSharing: IExecDataProtectorSharing | null = null;

export const cleanDataProtectorSDK = () => {
  dataProtectorCore = null;
};

export const initDataProtectorSDK = async ({
  connector,
}: {
  connector?: Connector;
}) => {
  const provider = await connector?.getProvider();

  //   const iexecOptions = {
  //     smsURL: import.meta.env.VITE_SMS_URL || undefined,
  //     iexecGatewayURL: import.meta.env.VITE_IEXEC_GATEWAY_URL || undefined,
  //     // Where user-specific encrypted data are uploaded (consumeProtectedData())
  //     resultProxyURL: import.meta.env.VITE_RESULT_PROXY_URL || undefined,
  //   };

  //   const dataProtectorOptions = {
  //     // dataprotectorContractAddress: import.meta.env.VITE_DATAPROTECTOR_ADDRESS,
  //     sharingContractAddress: import.meta.env.VITE_DATAPROTECTOR_SHARING_ADDRESS,
  //     subgraphUrl: import.meta.env.VITE_DATAPROTECTOR_SUBGRAPH_URL,
  //     ipfsGateway: import.meta.env.VITE_IPFS_GATEWAY_URL,
  //     ipfsNode: import.meta.env.VITE_IPFS_NODE_URL,
  //     // iexecOptions,
  //   };

  const dataProtector = new IExecDataProtector(
    provider as any
    // dataProtectorOptions
  );

  dataProtectorCore = dataProtector.core;
  dataProtectorSharing = dataProtector.sharing;
};

export async function getDataProtectorClient(): Promise<{
  dataProtectorCore: IExecDataProtectorCore;
  dataProtectorSharing: IExecDataProtectorSharing;
}> {
  if (!dataProtectorCore) {
    const connector = useUserStore.getState().connector;
    await initDataProtectorSDK({ connector });
  }
  if (!dataProtectorCore || !dataProtectorSharing) {
    throw new Error("iExecDataProtector is not initialized");
  }
  return { dataProtectorCore, dataProtectorSharing };
}
