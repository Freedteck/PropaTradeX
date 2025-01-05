import UserMessageCard from "../../../../components/userMessageCard/UserMessageCard";
import OtherMessageCard from "../../../../components/otherMessageCard/OtherMessageCard";
import styles from "./Messages.module.css"
import { Link } from "react-router-dom";

const Messages = () => {
  return (
    <div className={styles.messages}>
        <h1>Chats</h1>
        <Link to="/manage/messages/chat">
            <div className={styles.chatItem}>
                <div className={styles.chatAvatar}>
                    <img src="https://via.placeholder.com/50" alt="Agent Freed" />
                </div>
                <div className={styles.chatInfo}>
                    <p className={styles.name}>Agent Freed</p>
                    <p className={styles.lastMessage}>Hey, are we still on for tomorrow?
                    </p>
                    <span>2:15 PM</span>
                </div>
            </div>
        </Link>

    </div>
  );
};

export default Messages;
