import PropTypes from "prop-types";
import styles from "./PropertyList.module.css";
import ProductCard from "../propertyCard/ProductCard";
import { Link } from "react-router-dom";

const PropertyList = ({ properties, heading, desc, feature }) => {
  return (
    <section className={`${styles.section} ${styles[feature]}`}>
      <div className={styles.top}>
        <div>
          <h2>{heading}</h2>
          <p>{desc}</p>
        </div>
        <Link to="/explore" className={styles.link}>
          View All
        </Link>
      </div>
      <ul className={styles.row}>
        {properties.map((property) => (
          <ProductCard key={property.id} data={property} />
        ))}
      </ul>
    </section>
  );
};

PropertyList.propTypes = {
  properties: PropTypes.array,
  heading: PropTypes.string,
  desc: PropTypes.string,
};

export default PropertyList;
