import styles from "./Messages.module.css";
import { useAccount } from "wagmi";
import { useState, useEffect, useContext } from "react";
// import { pinataMessage } from "../../../../utils/pinataConfig"
import Button from "../../../../components/button/Button.jsx";
import { ProtectedDataContext } from "../../../../context/ProtectedDataContext.js";
import { Avatar } from "connectkit";
import useFetchCollectionIds from "../../../../hooks/useFetchCollectionIds.jsx";
import { getAllUsers } from "../../../../modules/getAllUsers.js";
import MessageModal from "../../../../components/messageModal/MessageModal.jsx";

const Messages = () => {
  const { address, connector } = useAccount();
  const [chatAddress, setChatAddress] = useState();
  const { contacts } = useContext(ProtectedDataContext);
  const [allUsers, setAllUsers] = useState([]);
  const { collectionIds, loading } = useFetchCollectionIds();
  const [showModal, setShowModal] = useState(false);
  const [protectedDataAddress, setProtectedDataAddress] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      if (contacts && !loading) {
        const allusers = await getAllUsers(collectionIds, connector, contacts);
        setAllUsers(allusers.slice(0, allusers.length - 2));
        console.log("All Users:", allusers.slice(0, allusers.length - 2));
      }
    };
    fetchChats();
  }, [contacts, loading]);

  const handleShowModal = (userAddress) => {
    setShowModal(true);
    setProtectedDataAddress(userAddress);
  };

  return (
    <div className={styles.messages}>
      <h1>Chats</h1>
      <form>
        <input
          className={styles.input}
          type="text"
          value={chatAddress}
          onChange={(e) => setChatAddress(e.target.value)}
          placeholder="Enter the address you want to chat with"
        />
        <Button label="Search" btnClass="primary" />
      </form>
      {allUsers.map((user, index) => (
        <div key={index} className={styles.chatItem}>
          <section>
            <div className={styles.avatar}>
              <Avatar
                size={80}
                address={
                  Array.isArray(user.userDetails) &&
                  user.userDetails[0]?.address
                }
              />
            </div>
            <div className={styles.chatInfo}>
              <p className={styles.name}>
                {Array.isArray(user.userDetails) && user.userDetails[0]?.name}
              </p>
              <p className={styles.address}>
                {Array.isArray(user.userDetails) &&
                  user.userDetails[0]?.address}
              </p>
            </div>
            <Button
              label="Chat"
              btnClass="primary"
              handleClick={(e) =>
                handleShowModal(
                  Array.isArray(user.userDetails) &&
                    user.userDetails[0]?.address
                )
              }
            />
          </section>
        </div>
      ))}

      {showModal && (
        <MessageModal
          address={protectedDataAddress}
          handleClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Messages;
