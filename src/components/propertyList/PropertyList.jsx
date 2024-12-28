import PropTypes from "prop-types";
import styles from "./PropertyList.module.css";
import ProductCard from "../propertyCard/ProductCard";
import { Link } from "react-router-dom";

const PropertyList = ({ properties }) => {
  return (
    <section className={`${styles.section} ${styles.featured}`}>
      <div className={styles.top}>
        <div>
          <h2>New Properties</h2>
          <p>
            Discover the latest properties available for rent or sale in various
            locations.
          </p>
        </div>
        <Link to="/explore" className={styles.link}>
          View All
        </Link>
      </div>
      <ul className={styles.row}>
        {properties.slice(-3).map((property) => (
          <ProductCard key={property.id} data={property} />
        ))}
      </ul>
    </section>
  );
};

PropertyList.propTypes = {
  properties: PropTypes.array,
};

export default PropertyList;
