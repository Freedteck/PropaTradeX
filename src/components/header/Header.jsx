import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Button from "../button/Button";
import { Lock, Moon, Sun } from "lucide-react";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import logo from "../../assets/logo.png";

const Header = ({ protectedDataAddress }) => {
  const { isConnected } = useAccount();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  return (
    <header>
      <nav className={styles["header-nav"]}>
        <Link to={"/"} className={styles.logo}>
          <img src={logo} alt="logo" width={28} />
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
          <ConnectKitButton mode={`${isDarkMode ? "dark" : "light"}`} />
          {/* Toggle Theme */}
          <div onClick={toggleTheme} className={styles["theme-toggle"]}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
