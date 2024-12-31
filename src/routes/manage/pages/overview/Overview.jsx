import { NavLink, Link, Outlet } from "react-router-dom";
import Hero from "../../../../components/hero/Hero";
import styles from "./Overview.module.css";
import Button from "../../../../components/button/Button";

const Overview = () => {
  return (
    <div>
      <Hero />
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to="/manage/properties"
              end
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              My Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage/properties/rent"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Rent
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage/properties/purchase"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Purchase
            </NavLink>
          </li>
        </ul>
        <Link to="/manage/properties/new-property">
          <Button label="New Property" btnClass="primary" />
        </Link>
        
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Overview;
