import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./ConsumeStatusModal.module.css";
import { CheckCircle, Loader, XCircle } from "lucide-react";

const ConsumeStatusModal = ({ statuses }) => {
  return (
    <div className={styles.bg}>
      <div className={styles.modal}>
        {Object.entries(statuses).map(([message, isDone, isError]) => (
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
      </div>
    </div>
  );
};

ConsumeStatusModal.propTypes = {
  statuses: PropTypes.object,
};

export default ConsumeStatusModal;
