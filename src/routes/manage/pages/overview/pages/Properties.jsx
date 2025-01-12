import { useEffect, useState } from "react";
import ProductCard from "../../../../../components/propertyCard/ProductCard";
import PropTypes from "prop-types";
import styles from "./Properties.module.css";
import { LoaderIcon } from "lucide-react";
import { useAccount } from "wagmi";
import { getUserProtectedProperties } from "../../../../../modules/getUserProtectedProperty";
import { getRentals } from "../../../../../modules/getRentals";

const Properties = ({ propertyType }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { connector, address, isConnected } = useAccount();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      if (connector && isConnected) {
        const protectedProperties = await getUserProtectedProperties(
          address,
          connector
        );

        if (propertyType === "rent") {
          const propertiesForRent = await getRentals(connector, address);

          setProperties(propertiesForRent);
        } else {
          setProperties(protectedProperties);
        }

        setLoading(false);
      } else {
        setError("No account found or not connected");
      }
    };

    fetchProperties();
  }, [connector, address, propertyType, isConnected]);

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
      ) : properties.length > 0 ? (
        <div className={styles.container}>
          {properties.map((property, index) => (
            <ProductCard key={index} data={property} />
          ))}
        </div>
      ) : (
        <p>No properties found</p>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

Properties.propTypes = {
  propertyType: PropTypes.string,
};

export default Properties;
