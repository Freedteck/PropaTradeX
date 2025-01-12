import PropTypes from "prop-types";
import styles from "./PropertyList.module.css";
import ProductCard from "../propertyCard/ProductCard";
import { Link } from "react-router-dom";
import { LoaderIcon } from "lucide-react";

const PropertyList = ({
  properties,
  loading,
  error,
  heading,
  desc,
  feature,
  showViewAll = true,
}) => {
  return (
    <section className={`${styles.section} ${styles[feature]}`}>
      <div className={styles.top}>
        <div>
          <h2>{heading}</h2>
          <p>{desc}</p>
        </div>
        {showViewAll && (
          <Link to="/explore" className={styles.link}>
            View All
          </Link>
        )}
      </div>
      {loading ? (
        <div className={styles.loader}>
          <LoaderIcon size={48} />
        </div>
      ) : properties.length > 0 ? (
        <div className={styles.row}>
          {properties.map((property, index) => (
            <ProductCard key={index} data={property} />
          ))}
        </div>
      ) : (
        <p>No properties found</p>
      )}

      {error && <p>{error}</p>}
    </section>
  );
};

PropertyList.propTypes = {
  properties: PropTypes.array,
  heading: PropTypes.string,
  desc: PropTypes.string,
};

export default PropertyList;
