import { BedDouble, MapPin } from "lucide-react";
import styles from "./ProductCard.module.css";
import Button from "../button/Button";
import bgImage from "../../assets/image.png";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readableSecondsToDays } from "../../utils/secondsToDays";

const ProductCard = ({ data }) => {
  const [metaData, setMetaData] = useState(null);
  const { isConnected } = useAccount();
  useEffect(() => {
    const getMetaData = async () => {
      const request = await fetch(data.metaData);
      const response = await request.json();
      setMetaData(response);
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
          <span>{metaData?.bedrooms}-Bedroom</span>
        </div>
        <div className={styles.info}>
          <MapPin size={16} />
          <span>{metaData?.location}</span>
        </div>
        <div className={styles.price}>
          <p>{data.rentalParams?.price / 10 ** 9} RLC</p>
          {!isConnected ? (
            <Button label="Connect" btnClass="primary" />
          ) : data.isRentable ? (
            <p className={styles.label}>
              {readableSecondsToDays(data.rentalParams.duration)} Rent
            </p>
          ) : (
            <p className={styles.label}>For Sale</p>
          )}
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
