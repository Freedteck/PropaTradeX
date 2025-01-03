import UserMessageCard from "../../../../components/userMessageCard/UserMessageCard";
import OtherMessageCard from "../../../../components/messageCardFrom/OtherMessageCard";
import styles from "./Messages.module.css"

const Messages = () => {
  return (
    <div className={styles.messages}>
      <h1>Messages</h1>
      <UserMessageCard text="I cherish you" timeStamp="2:25 PM"/>
      <OtherMessageCard text="I love you" timeStamp="2:25 PM"/>
    </div>
  );
};

export default Messages;
