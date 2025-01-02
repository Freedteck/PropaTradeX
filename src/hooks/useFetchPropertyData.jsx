import { useEffect, useState } from "react";
import { initDataProtectorSDK } from "../clients/dataProtectorClient";
import { useAccount } from "wagmi";
import { pinata } from "../utils/pinataConfig";

const useFetchPropertyData = ({ protectedDataAddress }) => {
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { connector } = useAccount();

  useEffect(() => {
    const fetchProperty = async () => {
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

        const property = protectedDataInCollection
          .map((property, index) => ({
            ...property,
            ...groupedFilesUrls[index],
          }))
          .filter(
            (property) =>
              property.id !== "0x5d194fdbdb913818fb6b9ed9316e1374c0129bb2"
          )
          .find((property) => property.id === protectedDataAddress);

        console.log("property", property);

        setProperty(property);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [protectedDataAddress, connector]);

  return { property, loading, error };
};

export default useFetchPropertyData;
