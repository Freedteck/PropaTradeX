import { LayoutDashboard, Plus, User2, UsersIcon } from "lucide-react";
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
            to={"/manage/users"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <UsersIcon size={24} />
            All Users
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
