import styles from "./Messages.module.css"
import { Link } from "react-router-dom";
import { useAccount} from "wagmi";
import { Avatar } from "connectkit";
import { useState, useEffect } from "react";
import { pinataMessage } from "../../../../utils/pinataConfig"
import Button from "../../../../components/button/Button.jsx" 

const Messages = () => {
    const { address } = useAccount();
    const [ chatAddress, setChatAddress] = useState() 
    const [ chats, setChats ] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newChat = await pinataMessage.groups.create({
                    name: `${chatAddress}`,
            });
            
        } catch (e) {
            console.log(e);
        }
        setChatAddress("")

    }

    useEffect(() => {
      const fetchChats = async () => {
        try {
            const chatList = await pinataMessage.groups.list()
            setChats(chatList)
        } catch (e) {
           console.log(e); 
        }
      }
      fetchChats()
    }, [])

  return (
    <div className={styles.messages}>
      <h1>Chats</h1>
       <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={chatAddress}
        onChange={(e) => setChatAddress(e.target.value)}
        placeholder="Enter the address you want to chat with"/>
        <Button label="Send" btnClass="primary" />
      </form>
      {
        chats.map((myChats) => {
          return (
          
          <Link to={`/manage/messages/chat/${myChats.name}`} key={myChats.id}>
                <div className={styles.chatItem}>
                   <Avatar address={myChats.name} size={50} />
                    <div className={styles.chatInfo}>
                        <p className={styles.name}>{myChats.name}</p>
                        <p className={styles.lastMessage}>You can come check it out tomorrow
                        </p>
                        <span>2:15 PM</span>
                    </div>
                </div>
            </Link>
          )
        })
      }

        {/*<Link to="/manage/messages/chat">
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
        </Link>*/}

    </div>
  );
};

export default Messages;
