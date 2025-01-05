import React, { useState } from "react";
import styles from './EditProfile.module.css';
import { useNavigate, useLocation } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    address: userData?.address || "",
    profilePicture: userData?.profilePicture || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCancel = () => {
    navigate("/manage/profile");
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <div className={styles.editProfilePage}>
      <h2 className={styles.title}>Edit Profile</h2>

      {/* Profile Picture Upload */}
      <div className={styles.profilePictureSection}>
        <div className={styles.profileImage}>
          {formData.profilePicture ? (
            <img src={formData.profilePicture} alt="Profile" className={styles.image} />
          ) : (
            <span className={styles.placeholder}>No Image</span>
          )}
        </div>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <label htmlFor="profilePicture" className={styles.uploadButton}>
          Upload Photo
        </label>
      </div>

      {/* name Field */}
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Address Field */}
      <div className={styles.formGroup}>
        <label htmlFor="address" className={styles.label}>
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter your address"
          required
        />
      </div>

     
      <button className={styles.saveButton} >
        Save Changes
      </button>
      <button className={styles.cancelButton} onClick={handleCancel}> Cancel</button>
    </div>
  );
};

export default EditProfile;