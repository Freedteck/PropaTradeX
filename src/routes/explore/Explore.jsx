import Hero from "../../components/hero/Hero";
import PropertyList from "../../components/propertyList/PropertyList";
import { properties } from "../../samples/properties";
import styles from "./Explore.module.css";

const Explore = () => {
  return (
    <div className={styles.explore}>
      <Hero isExplore={true} />
      <div className={styles.all}>
        <PropertyList
          showViewAll={false}
          properties={properties}
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
