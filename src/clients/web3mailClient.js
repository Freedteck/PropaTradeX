import { IExecWeb3mail } from "@iexec/web3mail";

export const initWeb3mail = async ({ connector }) => {
  console.log("Initializing Web 3 mail...");
  const provider = await connector?.getProvider();

  const dataProtectorOptions = {
    ipfsGateway: import.meta.env.VITE_IPFS_GATEWAY_URL,
    ipfsNode: import.meta.env.VITE_IPFS_NODE_URL,
  };

  const web3mail = new IExecWeb3mail(provider);

  return { web3mail };
};
