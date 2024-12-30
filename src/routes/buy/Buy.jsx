import Hero from "../../components/hero/Hero";
import ProductCard from "../../components/propertyCard/ProductCard";
import { properties } from "../../samples/properties";
import styles from "./Buy.module.css";

const Buy = () => {
    const BuyableProperties = properties.filter(property => property.type === 'sale')
  return (
      <>
        <Hero />
        <div className={styles.container}>
            {
                BuyableProperties.map((property) => {
                    return(
                    <ProductCard key={property.id} data={property} />
                    )
                })
            }
        </div>

      </>
  );
};

export default Buy;
