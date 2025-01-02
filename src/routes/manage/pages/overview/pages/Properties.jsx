import { useEffect, useState } from "react";
import ProductCard from "../../../../../components/propertyCard/ProductCard";
import PropTypes from "prop-types";
import styles from "./Properties.module.css";
import useFetchProperties from "../../../../../hooks/useFetchProperties";
import { LoaderIcon } from "lucide-react";

const Properties = ({ propertyType }) => {
  const [properties, setProperties] = useState([]);
  const { allProperties, loading } = useFetchProperties();

  useEffect(() => {
    if (!loading) {
      if (propertyType === "rent") {
        const rentedProperties = allProperties.filter(
          (property) => property.type === "rent"
        );
        setProperties(rentedProperties.slice());
      } else if (propertyType === "purchase") {
        const buyableProperties = allProperties.filter(
          (property) => property.type === "purchase"
        );
        setProperties(buyableProperties);
      } else {
        setProperties(allProperties);
      }
    }
  }, [loading, propertyType, allProperties]);

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
