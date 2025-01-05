import { initDataProtectorSDK } from "../clients/dataProtectorClient";
import { pinata } from "../utils/pinataConfig";

export const getUserProtectedProperties = async (ownerAddress, connector) => {
  const { dataProtectorSharing } = await initDataProtectorSDK({ connector });

  // Fetch data in the collection
  const { protectedDataInCollection } =
    await dataProtectorSharing.getProtectedDataInCollections({
      collectionOwner: ownerAddress,
    });

  const latestProtectedData = protectedDataInCollection.filter(
    (protectedData) => {
      return (
        protectedData.creationTimestamp * 1000 >=
        new Date(1736075130 * 1000).getTime()
      );
    }
  );

  // Fetch IPFS details for each property
  const propertiesWithIpfs = await Promise.all(
    latestProtectedData.map(async (property) => {
      try {
        // List files from Pinata by name and pin start time
        const pinataFiles = await pinata
          .listFiles()
          .name(property.name)
          .pinStart("2025-01-05T00:09:39.434Z");

        console.log("Pinata Files:", pinataFiles);

        // Convert IPFS hashes to URLs
        const ipfsFilesUrls = await Promise.all(
          pinataFiles.map(async (file) => {
            const ipfsFile = await pinata.gateways.convert(file.ipfs_pin_hash);
            return ipfsFile;
          })
        );

        return {
          ...property,
          metaData: ipfsFilesUrls[0] || null,
          video: ipfsFilesUrls[1] || null,
          thumbnail: ipfsFilesUrls[2] || null,
        };
      } catch (error) {
        console.error(`Error processing property "${property.name}":`, error);

        return {
          ...property,
          metaData: null,
          video: null,
          thumbnail: null,
        };
      }
    })
  );

  return propertiesWithIpfs;
};
