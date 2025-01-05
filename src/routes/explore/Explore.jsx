import { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import PropertyList from "../../components/propertyList/PropertyList";
import styles from "./Explore.module.css";
import useFetchCollectionIds from "../../hooks/useFetchCollectionIds";
import { useAccount } from "wagmi";
import { getProtectedProperties } from "../../modules/getProtectedProperties";

const Explore = () => {
  const [properties, setProperties] = useState([]);
  const { collectionIds, loading } = useFetchCollectionIds();
  const { connector } = useAccount();

  useEffect(() => {
    const fetchProperties = async () => {
      if (!loading) {
        const protectedProperties = await getProtectedProperties(
          collectionIds,
          connector
        );

        setProperties(protectedProperties);
      }
    };

    fetchProperties();
  }, [collectionIds, loading, connector]);
  return (
    <div className={styles.explore}>
      <Hero isExplore={true} />
      <div className={styles.all}>
        <PropertyList
          showViewAll={false}
          properties={properties}
          loading={loading}
          heading={"Discover a World of Possibilities"}
          desc={
            "Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home"
          }
        />
      </div>
    </div>
  );
};

export default Explore;
