import React, { useState } from "react";
import styles from './Profile.module.css'
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        address: "",
        followers: 0,
        totalContent: 0,
        rentals: 0,
        subscriptionStatus: false,

    });
      
  return (
    <div className={styles.profilePage}>
      
      <div className={styles.profileHeader}>
        <div className={styles.profileImage}></div>
        <h2>{userData.name || "Unnamed User"}</h2>
        <p className={styles.address}>{userData.address || "No Address Found"}</p>
      </div>
      <button
            className={styles.editButton}
            onClick={() => navigate("/manage/profile/edit")}
          >
            Edit Profile
          </button>

      
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
        <button
          className={styles.subscribeButton}
          onClick={() => alert("Subscribe functionality coming soon!")}
        >
          Subscribe
        </button>

      )}
       
       

      
    </div>
  );
};

export default Profile;
