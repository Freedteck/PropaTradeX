import { initDataProtectorSDK } from "../clients/dataProtectorClient";

export async function consumeProtectedData({
  connector,
  protectedDataAddress,
  userAddress,
  handleConsumeStatuses,
}) {
  const { dataProtectorSharing } = await initDataProtectorSDK({ connector });

  return await dataProtectorSharing.consumeProtectedData({
    protectedData: protectedDataAddress,
    app: import.meta.env.VITE_PROTECTED_DATA_DELIVERY_DAPP_ADDRESS,
    path: "content",
    workerpool: import.meta.env.VITE_WORKERPOOL_ADDRESS,
    onStatusUpdate: (status) => {
      handleConsumeStatuses(status);
    },
  });
}
