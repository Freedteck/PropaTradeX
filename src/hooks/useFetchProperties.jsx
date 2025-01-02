import { useEffect, useState } from "react";
import { pinata } from "../utils/pinataConfig";
import { initDataProtectorSDK } from "../clients/dataProtectorClient";
import { useAccount } from "wagmi";

const useFetchProperties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { connector } = useAccount();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const { dataProtectorSharing } = await initDataProtectorSDK({
          connector,
        });
        const ipfsFile = await pinata
          .listFiles()
          .pinStart("2025-01-01T22:59:53.001Z");

        const ipfsFilesUrls = await Promise.all(
          ipfsFile.map(async (file) => {
            const ipfsFile = await pinata.gateways.convert(file.ipfs_pin_hash);
            return ipfsFile;
          })
        );

        console.log("ipfsFilesUrls", ipfsFilesUrls);

        const groupedFilesUrls = [];
        for (let i = 0; i < ipfsFilesUrls.length; i += 3) {
          groupedFilesUrls.push({
            metaData: ipfsFilesUrls[i],
            video: ipfsFilesUrls[i + 1],
            thumbnail: ipfsFilesUrls[i + 2],
          });
        }

        const { protectedDataInCollection } =
          await dataProtectorSharing.getProtectedDataInCollections({
            collectionId: import.meta.env.VITE_COLLECTION_ID,
          });

        const properties = protectedDataInCollection.map((property, index) => ({
          ...property,
          ...groupedFilesUrls[index],
        }));

        setAllProperties(properties);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { allProperties, loading, error };
};

export default useFetchProperties;
