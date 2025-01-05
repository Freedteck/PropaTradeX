import { initDataProtectorSDK } from "../clients/dataProtectorClient";
import { pinata } from "../utils/pinataConfig";

export const getRentals = async (connector, userAddress) => {
  console.log("Get rentals");
  const { dataProtectorSharing } = await initDataProtectorSDK({ connector });
  const { rentals } = await dataProtectorSharing.getRentals({
    renterAddress: userAddress,
    includePastRentals: false,
  });
  console.log("Rentals", rentals);
  // Fetch IPFS details for each property
  const rentalsWithIpfs = await Promise.all(
    rentals.map(async (property) => {
      try {
        // List files from Pinata by name and pin start time
        const pinataFiles = await pinata
          .listFiles()
          .name(property.protectedData.name)
          .pinStart("2025-01-05T00:09:39.434Z");

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

  console.log("Rentals with IPFS", rentalsWithIpfs);

  return rentalsWithIpfs;
  // Add fake delay for tests, to better see loading state
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(rentals);
  //   }, 1000);
  // });
};
