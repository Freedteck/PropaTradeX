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
      <h4>{address || "Please Connect Wallet"}</h4>

      <div className={styles.profileStats}>
        <div>
          <p>Balance: </p>
          <p>Rentals: </p>
        </div>
        <div>
          <p>Sales: </p>
          <p>Total Listed Assets: </p>
        </div>
      </div>
 
    </>
  );
};

export default Profile;
