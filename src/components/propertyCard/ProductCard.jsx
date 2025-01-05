import { BedDouble, MapPin } from "lucide-react";
import styles from "./ProductCard.module.css";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
// import { readableSecondsToDays } from "../../utils/secondsToDays";
import { Link } from "react-router-dom";
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
    <Link
      to={`/property/${data.address || data.protectedData.id}`}
      className={styles.link}
    >
      <li className={styles.card}>
        <div className={styles.tag}>
          {data.address
            ? data.address.slice(0, 6)
            : data.protectedData.id.slice(0, 6)}
          ...
          {data.address
            ? data.address.slice(-6)
            : data.protectedData.id.slice(-6)}
        </div>
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
            {data.isRentable ? (
              <p>{Number(data.rentalParams?.price) / 10 ** 9} RLC</p>
            ) : data.isForSale ? (
              <p>{Number(data.saleParams?.price) / 10 ** 9} RLC</p>
            ) : data.rentalParams ? (
              <p>{readableSecondsToDays(data.rentalParams.duration)}</p>
            ) : (
              ""
            )}
            {!isConnected ? (
              <Button label="Connect" btnClass="primary" />
            ) : data.isRentable ? (
              <div>
                <p className={styles.label}>For Rent</p>
                {/* <small>{readableSecondsToDays(data.rentalParams.duration)}</small> */}
              </div>
            ) : data.isForSale ? (
              <p className={styles.label}>For Sale</p>
            ) : data.rentalParams ? (
              <p className={styles.label}>Rented</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </li>
    </Link>
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
