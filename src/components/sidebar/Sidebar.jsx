import { LayoutDashboard, MessageSquareLock, Plus, User2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Button from "../button/Button";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className={styles.sidebar}>
      <Button
        label="New Property"
        btnClass="primary"
        icon={<Plus size={20} />}
        handleClick={() => navigate("/manage/new")}
      />
      <ul>
        <li>
          <NavLink
            to={"/manage/properties"}
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
        <li>
          <NavLink
            to={"/manage/profile"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <User2 size={24} />
            Profile
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
