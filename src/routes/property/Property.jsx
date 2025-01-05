import { Link, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import styles from "./Property.module.css";
import useFetchPropertyData from "../../hooks/useFetchPropertyData";
import { useEffect, useState } from "react";
import {
  CalendarClock,
  Loader,
  MailCheck,
  Shapes,
  ShoppingBagIcon,
  User2,
} from "lucide-react";
import { timestampToReadableDate } from "../../utils/timestampToReadableDate";
import { secondsToDays } from "../../utils/secondsToDays";
import { useAccount } from "wagmi";
import { buyProperty } from "../../modules/buyProperty";
import { rentProperty } from "../../modules/rentProperty";

const Property = () => {
  const { protectedDataAddress } = useParams();
  const [metaData, setMetaData] = useState({});
  const { address, connector } = useAccount();
  const { property, loading } = useFetchPropertyData({
    protectedDataAddress: protectedDataAddress,
  });

  const [isEditable, setIsEditable] = useState(false);
  const [renter, setRenter] = useState("false");

  useEffect(() => {
    const PropertyData = property;
    const fetchMetaData = async () => {
      await fetch(PropertyData.metaData)
        .then((response) => response.json())
        .then((data) => setMetaData(data));
    };

    console.log(address);

    if (!loading) {
      console.log("property", property);
    }

    fetchMetaData();
  }, [property, address]);

  useEffect(() => {
    if (!property.isForSale && !property.isRentable) {
      setIsEditable(true);
    }
    const thisOwner = property.rentals?.find((prop) => (prop.renter = address));
    console.log(thisOwner);
    setRenter(thisOwner);
  }, [property]);

  const handleBuy = async (priceInRLC) => {
    const txn = await buyProperty(
      protectedDataAddress,
      priceInRLC,
      connector,
      address
    );
    console.log(txn);
  };

  const handleRent = async (rentalParams) => {
    const txn = await rentProperty(
      protectedDataAddress,
      rentalParams,
      connector
    );
    console.log(txn);
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <Loader size={48} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.visuals}>
        <div
          className={styles.imageCard}
          style={{ backgroundImage: `url(${property.thumbnail})` }}
        ></div>
        <div className={styles.vid}></div>
      </div>
      <div className={styles.details}>
        <h2>{metaData.title}</h2>
        <section className={styles.info}>
          <p>
            <CalendarClock size={20} absoluteStrokeWidth />
            {timestampToReadableDate(property.creationTimestamp)}
          </p>
          <p>
            <User2 size={20} absoluteStrokeWidth />
            {property.collection?.owner.id || property.renter}
          </p>
        </section>

        <div className={styles.description}>
          <h2>Description</h2>

          <h3>Bedroom(s)</h3>
          <p>{metaData.bedrooms}-Bedroom</p>

          <h3>Location</h3>
          <p>{metaData.location}</p>

          <h3>Price (RLC)</h3>
          <p>
            {property.isForSale ? (
              Number(property.saleParams.price / 1e9)
            ) : property.isRentable ? (
              Number(property.rentalParams.price / 1e9)
            ) : (
              <div className={styles.edit}>
                Property not for sale or rent
                <Link to={`/manage/${protectedDataAddress}/monetize`}>
                  List Property &rarr;
                </Link>
              </div>
            )}
          </p>

          <h3>Description</h3>
          <p>{metaData.description}</p>
        </div>

        {address?.toLowerCase() ===
          property.collection?.owner.id.toLowerCase() && (
          <p>You own this property</p>
        )}
        {address?.toLowerCase() !==
          property.collection?.owner.id.toLowerCase() && (
          <div className={styles.actions}>
            {property.isRentable && (
              <Button
                label={`Rent Property for ${secondsToDays(
                  property.rentalParams.duration
                )} days`}
                btnClass="primary"
                icon={<Shapes size={20} />}
                handleClick={() => handleRent(property.rentalParams)}
              />
            )}

            {property.isForSale && (
              <Button
                label={`Buy Property`}
                btnClass="primary"
                icon={<ShoppingBagIcon size={20} />}
                handleClick={() => handleBuy(Number(property.saleParams.price))}
              />
            )}
            <Button
              label="Contact Agent"
              btnClass="secondary"
              icon={<MailCheck size={20} />}
            />
          </div>
        )}

        {address?.toLowerCase() === property.renter?.toLowerCase() && (
          <p>You have rented property</p>
        )}
      </div>
    </div>
  );
};

export default Property;
