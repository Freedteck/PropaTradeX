import Banner from "../../components/banner/Banner";
import { properties } from "../../samples/properties";
import PropertyList from "../../components/propertyList/PropertyList";
import styles from "./Home.module.css";
import Button from "../../components/button/Button";

const Home = () => {
  const propertiesForRent = properties.filter(
    (property) => property.type === "rent"
  );
  return (
    <>
      <Banner />
      <div className={styles.featured}>
        <PropertyList
          properties={properties.slice(-3)}
          heading={"New Properties"}
          desc={
            "Discover the latest properties available for rent or sale in variouslocations."
          }
          feature={"new"}
        />
      </div>
      <div className={styles.rent}>
        <PropertyList
          properties={propertiesForRent.slice(0, 4)}
          heading={"For Rent"}
          desc={
            "Discover the latest properties available for rent in various locations."
          }
        />
      </div>
      <section className={styles.cta}>
        <div>
          <h2>Find Your Next Home or Investment Today</h2>
          <p>
            Whether you're looking to rent a cozy apartment, buy your dream
            home, or invest in real estate, <br /> we've got you covered! Start
            your journey with just a few clicks.
          </p>
        </div>
        <Button label="Explore Properties" btnClass="secondary" />
      </section>
    </>
  );
};

export default Home;
