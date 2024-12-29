import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Button from "../button/Button";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

const Header = () => {
  const { isConnected } = useAccount();
  return (
    <header>
      <nav className={styles["header-nav"]}>
        <h1 className={styles.logo}>PropaTradeX</h1>
        {isConnected && (
          <ul className={styles["nav-list"]}>
            <li>
              <NavLink to={"explore"}>Explore</NavLink>
            </li>
            <li>
              <NavLink to={"rent"}>Rent</NavLink>
            </li>
            <li>
              <NavLink to={"buy"}>Buy</NavLink>
            </li>
            <li>
              <NavLink to={"manage"}>Manage</NavLink>
            </li>
          </ul>
        )}
        {/* <Button btnClass="primary" label="Connect Wallet" /> */}
        <ConnectKitButton mode="light" />
      </nav>
    </header>
  );
};

export default Header;
