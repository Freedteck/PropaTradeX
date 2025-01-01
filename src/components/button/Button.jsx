import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ btnClass, label, icon, handleClick }) => {
  return (
    <button className={styles[btnClass]} onClick={handleClick}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </button>
  );
};

Button.propTypes = {
  btnClass: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  handleClick: PropTypes.func,
};

export default Button;
