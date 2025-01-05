import { initDataProtectorSDK } from "../clients/dataProtectorClient";
import { getOrCreateCollection } from "./getOrCreateCollection";

export const buyProperty = async (
  protectedDataAddress,
  priceInRLC,
  connector,
  ownerAddress
) => {
  console.log("Buy property", priceInRLC);

  const collectionId = await getOrCreateCollection({
    connector,
    ownerAddress: ownerAddress,
  });

  const { dataProtectorSharing } = await initDataProtectorSDK({ connector });
  return dataProtectorSharing.buyProtectedData({
    protectedData: protectedDataAddress,
    price: priceInRLC,
    addToCollectionId: collectionId,
    addOnlyAppWhitelist: import.meta.env
      .VITE_PROTECTED_DATA_DELIVERY_WHITELIST_ADDRESS,
  });
};
