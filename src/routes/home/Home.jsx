import Banner from "../../components/banner/Banner";
import { properties } from "../../samples/properties";
import PropertyList from "../../components/propertyList/PropertyList";

const Home = () => {
  return (
    <>
      <Banner />
      <PropertyList properties={properties} />
    </>
  );
};

export default Home;
