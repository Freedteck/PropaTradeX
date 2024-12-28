import { BedDouble, MapPin } from "lucide-react";
import styles from "./ProductCard.module.css";
import Button from "../button/Button";
import bgImage from "../../assets/image.png";

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

export default ProductCard;
