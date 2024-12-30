import Hero from "../../components/hero/Hero";
import ProductCard from "../../components/propertyCard/ProductCard";
import { properties } from "../../samples/properties";
import styles from "./Buy.module.css";

const Buy = () => {
    const buyableProperties = properties.filter(property => property.type === 'sale')
  return (
      <>
        <Hero />

        <div className={styles.controls}>

          <select>
            <option value="">Property Type</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="6">6 Bedrooms</option>
            <option value="8">8 Bedrooms</option>
          </select>

          <select>
            <option value="">Location</option>
            <option value="newyork">NewYork</option>
            <option value="california">California</option>
            <option value="arizona">Arizona</option>
            <option value="florida">Florida</option>
          </select>

          <select>
            <option value="">Price</option>
            {buyableProperties.map((property) => {
            return (
            <option key={property.id} value={property.price}>{property.price} RLC</option>
            )})}
          </select>

        </div>

        <div className={styles.container}>
            {
                buyableProperties.map((property) => {
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
