import { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import PropertyList from "../../components/propertyList/PropertyList";
import styles from "./Explore.module.css";
import useFetchCollectionIds from "../../hooks/useFetchCollectionIds";
import { useAccount } from "wagmi";
import { getProtectedProperties } from "../../modules/getProtectedProperties";

const Explore = () => {
  const [properties, setProperties] = useState([]);
  const [isPropertiesLoading, setIsPropertiesLoading] = useState(true);
  const [isPropertiesError, setIsPropertiesError] = useState(false);
  const { collectionIds, loading } = useFetchCollectionIds();
  const { connector } = useAccount();

  useEffect(() => {
    const fetchProperties = async () => {
      setIsPropertiesLoading(true);
      if (connector && !loading) {
        const protectedProperties = await getProtectedProperties(
          collectionIds,
          connector
        );

        setProperties(protectedProperties);

        setIsPropertiesLoading(false);
      } else {
        setIsPropertiesLoading(false);
        setIsPropertiesError(true);
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
          loading={isPropertiesLoading}
          error={isPropertiesError}
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
