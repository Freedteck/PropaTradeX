import { initDataProtectorSDK } from "../clients/dataProtectorClient";

export const rentProperty = async (
  protectedDataAddress,
  rentalParams,
  connector
) => {

  const { dataProtectorSharing } = await initDataProtectorSDK({ connector });
  return dataProtectorSharing.rentProtectedData({
    protectedData: protectedDataAddress,
    price: Number(rentalParams.price),
    duration: Number(rentalParams.duration),
  });
};
