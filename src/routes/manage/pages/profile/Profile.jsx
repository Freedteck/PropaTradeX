import React, { useState } from "react";
import styles from './Profile.module.css'
import { useNavigate } from "react-router-dom";
import { useAccount} from "wagmi";
import { Avatar } from "connectkit";
import Button from "../../../../components/button/Button";

const Profile = () => {
    const navigate = useNavigate()
    const { address } = useAccount()
    const [userData, setUserData] = useState({
        name: "",
        address: "",
        followers: 10,
        totalContent: 6,
        rentals: 4,
        subscriptionStatus: false,

    });
      
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <Avatar address={address} size={80} />
        <p className={styles.address}>{address}</p>
      </div>
      <Button label="Edit Profile" btnClass="primary" handleClick={() => navigate("/manage/profile/edit")} />

      <div className={styles.profileStats}>
        <h3>Subscription</h3>
        <p
          className={
            userData.subscriptionStatus ? styles.subscribed : styles.notSubscribed
          }
        >
          {userData.subscriptionStatus ? "Subscribed" : "Not Subscribed"}
        </p>
        <div className={styles.statsGrid}>
          <div>
            <h4>{userData.followers}</h4>
            <p>Followers</p>
          </div>
          <div>
            <h4>{userData.totalContent}</h4>
            <p>Total Content</p>
          </div>
          <div>
            <h4>{userData.rentals}</h4>
            <p>Rentals</p>
          </div>
          <div>
            <h4>{userData.subscriptionStatus ? "Available" : "Not Available"}</h4>
            <p>Content with Subscription</p>
          </div>
        </div>
      </div>
    
      {!userData.subscriptionStatus && (
        <Button btnClass="secondary" label="Subscribe"
          handleClick={() => alert("Subscribe functionality coming soon!")}
        />
      )}
      
    </div>
  );
};

export default Profile;
