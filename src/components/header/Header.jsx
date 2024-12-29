import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

const Header = () => {
  const { isConnected } = useAccount();
  return (
    <header>
      <nav className={styles["header-nav"]}>
        <Link to={"/"} className={styles.logo}>
          PropaTradeX
        </Link>
        {isConnected && (
          <ul className={styles["nav-list"]}>
            <li>
              <NavLink
                to={"explore"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"rent"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Rent
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"buy"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Buy
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"manage"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Manage
              </NavLink>
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
