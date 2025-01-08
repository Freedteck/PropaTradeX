import { useState } from "react";
import Button from "../button/Button";
import styles from "./MessageModal.module.css";
import { sendEmail } from "../../modules/sendEmail";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";

const MessageModal = ({ address }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { connector } = useAccount();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { taskId } = await toast.promise(
        sendEmail({
          connector,
          protectedData: "0x4c4efe261f70c39b43c889cdf5e794f7add29c53",
          emailSubject: subject,
          emailContent: message,
          senderName: name,
        }),
        {
          pending: "Sending email...",
          success: "Email sent successfully!",
          error: "Failed to send message. Please try again later.",
        },
        {
          position: "top-center",
        }
      );

      console.log("Email sent with taskId:", taskId);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send message. Please try again later.", {
        position: "top-center",
      });
    }
  };
  return (
    <div className={styles.bg}>
      <form className={styles.modal}>
        <fieldset>
          <div>
            <h2>Send a Message</h2>
            <p className={styles.title}>{address}</p>
          </div>
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
          <label>
            Subject:
            <input
              type="text"
              placeholder="Enter the email subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>
          <label>
            Message:
            <textarea
              placeholder="Enter your message"
              required
              cols={10}
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </label>
          <Button label="Send" btnClass="primary" handleClick={handleSubmit} />
        </fieldset>
      </form>
    </div>
  );
};

export default MessageModal;
