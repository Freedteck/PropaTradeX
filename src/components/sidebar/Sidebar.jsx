import { LayoutDashboard, MessageSquareLock } from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li>
          <NavLink
            to={"/manage"}
            end
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <LayoutDashboard size={24} />
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/manage/messages"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <MessageSquareLock size={24} />
            Messages
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
