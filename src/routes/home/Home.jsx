import { Link } from "react-router-dom";
import Banner from "../../components/banner/Banner";
import styles from "./Home.module.css";
import ProductCard from "../../components/productCard/ProductCard";
import { properties } from "../../samples/properties";

const Home = () => {
  return (
    <>
      <Banner />
      <section className={`${styles.section} ${styles.featured}`}>
        <div className={styles.top}>
          <div>
            <h2>New Properties</h2>
            <p>
              Discover the latest properties available for rent or sale in
              various locations.
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
    </>
  );
};

export default Home;
