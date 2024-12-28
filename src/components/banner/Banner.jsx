import { Lock, Mail, Wallet } from "lucide-react";
import Button from "../button/Button";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.bannerContent}>
        <h1>
          Find Your <br /> Dream Home
        </h1>
        <p>
          Your journey to finding the perfect property begins here. <br />
          Explore our listings to find the home that matches your dreams.
        </p>
        <Button btnClass="primary" label="Get Started" />
      </div>
      <div className={styles.cards}>
        <div>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Lock size={40} absoluteStrokeWidth />
            </div>
            <p>Secure Data Sharing</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Wallet size={40} absoluteStrokeWidth />
            </div>
            <p>Wallet-Based Access Control</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Mail size={40} absoluteStrokeWidth />
            </div>
            <p>Effortless Communication</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
