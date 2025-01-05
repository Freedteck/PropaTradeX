import { initDataProtectorSDK } from "../clients/dataProtectorClient";

export const buyProperty = async (
  protectedDataAddress,
  priceInRLC,
  connector
) => {
  console.log("Buy property", priceInRLC);

  const { dataProtectorSharing } = await initDataProtectorSDK({ connector });
  return dataProtectorSharing.buyProtectedData({
    protectedData: protectedDataAddress,
    price: priceInRLC,
  });
};
