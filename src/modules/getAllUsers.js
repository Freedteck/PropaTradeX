import { initDataProtectorSDK } from "../clients/dataProtectorClient";
import { pinata } from "../utils/pinataConfig";

export const getAllUsers = async (collectionIdArray, connector, contacts) => {
  const { dataProtectorSharing, dataProtectorCore } =
    await initDataProtectorSDK({ connector });

  const protectedProperties = await Promise.all(
    collectionIdArray.map(async (collectionId) => {
      // Fetch data in the collection
      const { protectedDataInCollection } =
        await dataProtectorSharing.getProtectedDataInCollections({
          collectionId,
          createdAfterTimestamp: 1736707175,
          isDistributed: true,
        });

      const latestProtectedData = protectedDataInCollection.filter(
        (protectedData) => {
          return (
            protectedData.creationTimestamp * 1000 >
            new Date(1736707175 * 1000).getTime()
          );
        }
      );

      const allContacts = await Promise.all(
        latestProtectedData.map(async (property) => {
          try {
            const allUsers = contacts.filter(
              (contact) => property.collection.owner.id === contact.owner
            );

            const userDetails = await Promise.all(
              allUsers.map(async (user) => {
                const myData = await dataProtectorCore.getProtectedData({
                  owner: user.owner,
                  createdAfterTimestamp: 1736668255,
                });

                return myData;
              })
            );

            return {
              userDetails: userDetails.flat(),
            };
          } catch (error) {
            console.error(
              `Error processing property "${property.name}":`,
              error
            );

            return {
              ...property,
              metaData: null,
              video: null,
              thumbnail: null,
            };
          }
        })
      );

      return allContacts;
    })
  );

  return protectedProperties.flat();
};
