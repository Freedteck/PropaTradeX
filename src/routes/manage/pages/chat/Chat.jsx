import UserMessageCard from "../../../../components/userMessageCard/UserMessageCard"
import OtherMessageCard from "../../../../components/otherMessageCard/OtherMessageCard"
import styles from "./Chat.module.css"
import Button from "../../../../components/button/Button" 


const Chat = () =>{
    return(
        <div className={styles.chat}>
      <h1>Messages</h1>
      <div className={styles.chatContainer}>
        <UserMessageCard 
        text="Hello, I Would like to make enquiries on your listed house at Lekki, Lagos."
        timeStamp="2:25 PM"/>
        
        <OtherMessageCard 
        text="Hi, good to meet you. The house is a well furnished 3 bedroom apartment" 
        timeStamp="2:25 PM"/>

        <UserMessageCard 
        text="How much does it cost"
        timeStamp="2:25 PM"/>
      </div>

      <form>
        <input 
        type="text"
        placeholder="Enter your message"/>
        <Button label="Send" btnClass="primary" />
      </form>
    </div>

        )
}

export default Chat
