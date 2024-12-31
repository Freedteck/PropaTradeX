import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./Manage.module.css";

const Manage = () => {
  return (
    <div className={styles.manage}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Manage;
