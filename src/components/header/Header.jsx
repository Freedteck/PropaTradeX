import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Button from "../button/Button";
import { Lock } from "lucide-react";

const Header = ({ protectedDataAddress }) => {
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
                to={"manage/properties"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Manage
              </NavLink>
            </li>
          </ul>
        )}
        <div className={styles.accounts}>
          {isConnected && (
            <p>
              <Lock size={16} />
              {protectedDataAddress.slice(0, 6)}...
              {protectedDataAddress.slice(-4)}
            </p>
          )}
          <ConnectKitButton mode="light" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
