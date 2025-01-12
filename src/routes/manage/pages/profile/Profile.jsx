import React, { useState } from "react";
import styles from './Profile.module.css'
import { useNavigate } from "react-router-dom";
import { useAccount} from "wagmi";
import { Avatar } from "connectkit";
import Button from "../../../../components/button/Button";
import Hero from "../../../../components/hero/Hero";

const Profile = () => {
    const navigate = useNavigate()
    const { address } = useAccount()
      
  return (
    <>
      <Hero header="My Profile"/>
      <div className={styles.profile}>
        <h1>{address || "Please Connect Wallet"}</h1>
      {/*<Button label="Edit Profile" btnClass="primary" handleClick={() => navigate("/manage/profile/edit")} />*/}
      </div>
 
    </>
  );
};

export default Profile;
