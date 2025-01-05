import styles from "./Messages.module.css"
import { Link } from "react-router-dom";
import { useAccount} from "wagmi";
import { Avatar } from "connectkit";

const Messages = () => {
    const { address } = useAccount();

  return (
    <div className={styles.messages}>
      <h1>Chats</h1>
      <Link to="/manage/messages/chat">
            <div className={styles.chatItem}>
               <Avatar address={address} size={80} /> 
                <div className={styles.chatInfo}>
                    <p className={styles.name}>Agent Freed</p>
                    <p className={styles.lastMessage}>You can come check it out tomorrow
                    </p>
                    <span>2:15 PM</span>
                </div>
            </div>
        </Link>
        <Link to="/manage/messages/chat">
            <div className={styles.chatItem}>
               <Avatar address={address} size={80} /> 
                <div className={styles.chatInfo}>
                    <p className={styles.name}>Agent Funmilayo</p>
                    <p className={styles.lastMessage}>Hey, are we still on for tomorrow?
                    </p>
                    <span>4:44 PM</span>
                </div>
            </div>
        </Link>
        <Link to="/manage/messages/chat">
            <div className={styles.chatItem}>
               <Avatar address={address} size={80} /> 
                <div className={styles.chatInfo}>
                    <p className={styles.name}>Agent Qudus</p>
                    <p className={styles.lastMessage}>Is the document for the house ready?
                    </p>
                    <span>6:11 AM</span>
                </div>
            </div>
        </Link>

    </div>
  );
};

export default Messages;
