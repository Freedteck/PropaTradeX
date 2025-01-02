import {
  // getDataProtectorClient,
  initDataProtectorSDK,
} from "../clients/dataProtectorClient";

export async function getOrCreateCollection({
  connector,
  ownerAddress,
  onStatusUpdate,
}) {
  const dataProtector = await initDataProtectorSDK({ connector });

  const collectionsResult =
    await dataProtector.dataProtectorSharing.getCollectionsByOwner({
      owner: ownerAddress,
    });

  // If collections exist, use the first one
  if (collectionsResult.collections?.length > 0) {
    if (collectionsResult.collections.length >= 2) {
      console.log(
        `It looks like you have more than one collection. The first one will be used. (id: ${collectionsResult.collections[0].id})`
      );
    }
    return collectionsResult.collections[0].id;
  }

  // Create a new collection if none exist
  onStatusUpdate({
    title: "Create user's first collection",
    isDone: false,
  });

  const { collectionId: createdCollectionId } =
    await dataProtector.dataProtectorSharing.createCollection();

  onStatusUpdate({
    title: "Create user's first collection",
    isDone: true,
    payload: {
      createdCollectionId: String(createdCollectionId),
    },
  });

  return createdCollectionId;
}
