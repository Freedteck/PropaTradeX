import { useEffect, useState } from "react";
import ProductCard from "../../../../../components/propertyCard/ProductCard";
import { properties as allProperties } from "../../../../../samples/properties";
import PropTypes from "prop-types";
import styles from "./Properties.module.css";

const Properties = ({ propertyType }) => {
  const [properties, setProperties] = useState([]);

  const buyableProperties = allProperties.filter(
    (property) => property.type === "sale"
  );

  const rentedProperties = allProperties.filter(
    (property) => property.type === "rent"
  );

  useEffect(() => {
    if (propertyType === "rent") {
      setProperties(rentedProperties);
    } else if (propertyType === "purchase") {
      setProperties(buyableProperties);
    } else {
      setProperties(allProperties);
    }
  }, [propertyType]);

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
      <div className={styles.container}>
        {properties.map((property) => (
          <ProductCard key={property.id} data={property} />
        ))}
      </div>
    </div>
  );
};

Properties.propTypes = {
  propertyType: PropTypes.string,
};

export default Properties;
