import { BedDouble, MapPin } from "lucide-react";
import styles from "./ProductCard.module.css";
import Button from "../button/Button";
import bgImage from "../../assets/image.png";
import PropTypes from "prop-types";

const ProductCard = ({ data }) => {
  return (
    <li className={styles.card}>
      <div
        className={styles.productImage}
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className={styles.productInfo}>
        <h3>{data.title}</h3>
        <p>
          {data.description > 100
            ? `${data.description.substring(0, 100)}... Read More`
            : data.description}
        </p>
        <div className={styles.info}>
          <BedDouble size={16} />
          <span>{data.rooms}-Bedroom</span>
        </div>
        <div className={styles.info}>
          <MapPin size={16} />
          <span>{data.location}</span>
        </div>
        <div className={styles.price}>
          <p>${data.price}</p>
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
