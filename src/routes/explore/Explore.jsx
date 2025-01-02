import Hero from "../../components/hero/Hero";
import PropertyList from "../../components/propertyList/PropertyList";
import useFetchProperties from "../../hooks/useFetchProperties";
import styles from "./Explore.module.css";

const Explore = () => {
  const { allProperties, loading } = useFetchProperties({ param: "all" });
  return (
    <div className={styles.explore}>
      <Hero isExplore={true} />
      <div className={styles.all}>
        <PropertyList
          showViewAll={false}
          properties={allProperties}
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
