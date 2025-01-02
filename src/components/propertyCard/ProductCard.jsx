import { BedDouble, MapPin } from "lucide-react";
import styles from "./ProductCard.module.css";
import Button from "../button/Button";
import bgImage from "../../assets/image.png";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ProductCard = ({ data }) => {
  const [metaData, setMetaData] = useState(null);
  useEffect(() => {
    const getMetaData = async () => {
      const request = await fetch(data.metaData);
      const response = await request.json();
      setMetaData(response);
      console.log(response);
    };
    getMetaData();
  }, [data]);

  return (
    <li className={styles.card}>
      <div
        className={styles.productImage}
        style={{ backgroundImage: `url(${data.thumbnail})` }}
      ></div>
      <div className={styles.productInfo}>
        <h3>{metaData?.title}</h3>
        <p>
          {metaData?.description > 100
            ? `${metaData?.description.substring(0, 100)}... Read More`
            : metaData?.description}
        </p>
        <div className={styles.info}>
          <BedDouble size={16} />
          <span>{metaData?.rooms}-Bedroom</span>
        </div>
        <div className={styles.info}>
          <MapPin size={16} />
          <span>{metaData?.location}</span>
        </div>
        <div className={styles.price}>
          <p>{data.price} RLC</p>
          <Button label="Connect" btnClass="primary" />
        </div>
      </div>
    </li>
  );
};

ProductCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    rooms: PropTypes.number,
    location: PropTypes.string,
    price: PropTypes.number,
  }),
};

export default ProductCard;
