import { useParams } from "react-router-dom";
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

const Property = () => {
  const { protectedDataAddress } = useParams();
  const [metaData, setMetaData] = useState({});
  const { property, loading } = useFetchPropertyData({
    protectedDataAddress: protectedDataAddress,
  });

  useEffect(() => {
    const PropertyData = property;
    const fetchMetaData = async () => {
      const request = await fetch(PropertyData.metaData);
      const response = await request.json();
      setMetaData(response);
    };

    fetchMetaData();
  }, [property]);

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
            {property.collection.owner.id}
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
            {property.isForSale
              ? Number(property.saleParams.price / 1e9)
              : Number(property.rentalParams.price / 1e9)}
          </p>

          <h3>Description</h3>
          <p>{metaData.description}</p>
        </div>

        <div className={styles.actions}>
          {property.isRentable && (
            <Button
              label={`Rent Property for ${secondsToDays(
                property.rentalParams.duration
              )} days`}
              btnClass="primary"
              icon={<Shapes size={20} />}
            />
          )}

          {property.isForSale && (
            <Button
              label={`Buy Property`}
              btnClass="primary"
              icon={<ShoppingBagIcon size={20} />}
            />
          )}
          <Button
            label="Contact Agent"
            btnClass="secondary"
            icon={<MailCheck size={20} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Property;
