import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import styles from "./StatusModal.module.css";
import { CheckCircle, Loader, XCircle } from "lucide-react";

const StatusModal = ({ statuses, addToCollectionSuccess }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.bg}>
      <div className={styles.modal}>
        {Object.entries(statuses).map(([message, { isDone, isError }]) => (
          <div
            key={message}
            className={`${styles.message} ${
              isDone ? styles.success : isError ? styles.error : styles.loading
            }`}
          >
            {isError ? (
              <XCircle size="48" />
            ) : isDone ? (
              <CheckCircle size="48" />
            ) : (
              <Loader size="48" />
            )}
            <p>{message}</p>
          </div>
        ))}
        {addToCollectionSuccess && (
          <Button
            label="Continue to Monetize"
            handleClick={() => navigate("/manage/monetize")}
            btnClass="primary"
          />
        )}
      </div>
    </div>
  );
};

StatusModal.propTypes = {
  statuses: PropTypes.object,
};

export default StatusModal;
