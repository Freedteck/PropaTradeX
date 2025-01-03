import UserMessageCard from "../../../../components/userMessageCard/UserMessageCard";
import OtherMessageCard from "../../../../components/otherMessageCard/OtherMessageCard";
import styles from "./Messages.module.css"

const Messages = () => {
  return (
    <>
    <div className={styles.messages}>
      <h1>Messages</h1>
      <UserMessageCard text="I cherish you" timeStamp="2:25 PM"/>
      <OtherMessageCard text="I love you" timeStamp="2:25 PM"/>
    </div>
    <form className={styles.form}>
      <input 
      type="text"
      placeholder="Enter your message"/>
      <button type="submit">
        Send
      </button>
    </form>
    </>
  );
};

export default Messages;
