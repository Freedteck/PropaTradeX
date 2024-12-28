import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ btnClass, label }) => {
  return <button className={styles[btnClass]}>{label}</button>;
};

Button.propTypes = {
  btnClass: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Button;
