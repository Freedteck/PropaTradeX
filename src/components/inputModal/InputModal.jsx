import PropTypes from "prop-types";
import Button from "../button/Button";
import styles from "./InputModal.module.css";
import { toast } from "react-toastify";
import { useState } from "react";

const InputModal = ({ handleProtectAndGrantAccess }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error("Please enter your email and name to proceed.");
      return;
    }
    handleProtectAndGrantAccess(email, name);
  };
  return (
    <div className={styles.bg}>
      <form className={styles.modal}>
        <fieldset>
          <div>
            <h2>Get Access to All Features of PropaTradeX</h2>
            <p>
              Be rest assured that your email address is protected and not
              accessible to anyone.
            </p>
          </div>
          <label>
            Email:
            <input
              type="text"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <Button
            label="Grant Me Access"
            btnClass="primary"
            handleClick={handleSubmit}
          />
        </fieldset>
      </form>
    </div>
  );
};

InputModal.propTypes = {
  handleClick: PropTypes.func,
};

export default InputModal;
