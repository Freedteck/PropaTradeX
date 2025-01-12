import { useCallback, useEffect, useState } from "react";
import { initDataProtectorSDK } from "../clients/dataProtectorClient";
import { useAccount } from "wagmi";
import { pinata } from "../utils/pinataConfig";

const useFetchPropertyData = ({ protectedDataAddress }) => {
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { connector } = useAccount();

  const fetchProperty = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { dataProtectorSharing } = await initDataProtectorSDK({
        connector,
      });

      const { protectedDataInCollection } =
        await dataProtectorSharing.getProtectedDataInCollections({
          protectedData: protectedDataAddress,
        });

      const pinataFiles = await pinata
        .listFiles()
        .name(protectedDataInCollection[0].name);

      const ipfsFilesUrls = await Promise.all(
        pinataFiles.map(async (file) => {
          const ipfsFile = await pinata.gateways.convert(file.ipfs_pin_hash);
          return ipfsFile;
        })
      );

      const propertyData = protectedDataInCollection.map((property) => ({
        ...property,
        metaData: ipfsFilesUrls[0],
        video: ipfsFilesUrls[1],
        thumbnail: ipfsFilesUrls[2],
      }));

      console.log("Property data", propertyData);

      setProperty(propertyData[0]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [connector, protectedDataAddress]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  return { property, loading, error, refetch: fetchProperty };
};

export default useFetchPropertyData;
