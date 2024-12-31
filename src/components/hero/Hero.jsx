import { useAccount, useEnsAvatar } from "wagmi";
import Button from "../button/Button";
import styles from "./Hero.module.css";
import { Avatar } from "connectkit";

const Hero = () => {
  const { address } = useAccount();

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `url(https://api.dicebear.com/5.x/identicon/svg?seed=${address})`,
      }}
    >
      <div className={styles.heroContent}>
        <h1>Find Your Dream Property</h1>
        {/* <p>
          Welcome to PropaTradeX, where your dream property awaits in every
          corner of our beautiful world. Explore our curated selection of
          properties, each offering a unique story and a chance to redefine your
          life. With categories to suit every dreamer, your journey starts here.
        </p> */}
      </div>
      {/* <div className={styles.controls}>
        <form>
          <input
            type="search"
            name="searchProp"
            placeholder="Search for a property"
          />
          <Button btnClass="primary" label="Find Property" />
        </form>

        <div className={styles.filters}></div>
      </div> */}

      <div className={styles.profile}>
        <Avatar address={address} size={120} />
      </div>
    </section>
  );
};

export default Hero;
