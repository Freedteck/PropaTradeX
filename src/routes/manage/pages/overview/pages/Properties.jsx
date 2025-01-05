import { useEffect, useState } from "react";
import ProductCard from "../../../../../components/propertyCard/ProductCard";
import PropTypes from "prop-types";
import styles from "./Properties.module.css";
import { LoaderIcon } from "lucide-react";
import useFetchCollectionIds from "../../../../../hooks/useFetchCollectionIds";
import { useAccount } from "wagmi";
import { getUserProtectedProperties } from "../../../../../modules/getUserProtectedProperty";

const Properties = ({ propertyType }) => {
  const [properties, setProperties] = useState([]);
  const { collectionIds, loading } = useFetchCollectionIds();
  const { connector, address } = useAccount();

  useEffect(() => {
    const fetchProperties = async () => {
      if (!loading) {
        const protectedProperties = await getUserProtectedProperties(
          address,
          connector
        );

        if (propertyType === "rent") {
          const propertiesForRent = protectedProperties.filter(
            (property) => property.isRentable === true
          );
          setProperties(propertiesForRent);
        } else if (propertyType === "purchase") {
          const propertiesForSale = protectedProperties.filter(
            (property) => property.isForSale === true
          );
          setProperties(propertiesForSale);
        } else {
          setProperties(protectedProperties);
        }
      }
    };

    fetchProperties();
  }, [loading, connector, address, propertyType]);

  const setHeadingAndDescription = () => {
    if (propertyType === "rent") {
      return {
        heading: "Rented Properties",
        description: "Find your rented homes here",
      };
    } else if (propertyType === "purchase") {
      return {
        heading: "Purchased Properties",
        description: "Find all your Purchase properties",
      };
    } else {
      return {
        heading: "All Properties",
        description: "Find all your properties here",
      };
    }
  };

  return (
    <div className={styles.properties}>
      <div className={styles.heading}>
        <h2>{setHeadingAndDescription().heading}</h2>
        <p>{setHeadingAndDescription().description}</p>
      </div>
      {loading ? (
        <div className={styles.loader}>
          <LoaderIcon size={48} />
        </div>
      ) : properties.length === 0 ? (
        <p>No properties found</p>
      ) : (
        <div className={styles.container}>
          {properties.map((property) => (
            <ProductCard key={property.id} data={property} />
          ))}
        </div>
      )}
    </div>
  );
};

Properties.propTypes = {
  propertyType: PropTypes.string,
};

export default Properties;
