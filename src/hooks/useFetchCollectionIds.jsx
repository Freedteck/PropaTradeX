import { useEffect, useState } from "react";
import { pinata } from "../utils/pinataConfig";

const useFetchCollectionIds = () => {
  const [collectionIds, setCollectionIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionIds = async () => {
      setLoading(true);
      setError(null);

      // Group files
      const groups = await pinata
        .listFiles()
        .group(import.meta.env.VITE_PINATA_COLLECTION_ID);

      const groupIpfsUrls = await Promise.all(
        groups.map(async (group) => {
          const ipfsFile = await pinata.gateways.convert(group.ipfs_pin_hash);
          return ipfsFile;
        })
      );

      // Fetch and populate collection IDs
      const ids = await Promise.all(
        groupIpfsUrls.map(async (group) => {
          const data = await fetch(group).then((res) => res.json());
          return data.collectionId;
        })
      );
      setCollectionIds(ids);

      setLoading(false);
    };

    fetchCollectionIds();
  }, []);

  return { collectionIds, loading, error };
};

export default useFetchCollectionIds;
