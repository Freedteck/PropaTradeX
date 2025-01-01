import React, { useState } from "react";
import styles from "./NewProperty.module.css";
import Button from "../../../../../../components/button/Button";
import { UploadCloud } from "lucide-react";

function NewProperty({ onSubmit }) {
  const [property, setProperty] = useState({
    thumbnail: null,
    document: null,
    receipt: null,
    video: null,
  });

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProperty((prev) => ({
        ...prev,
        [field]: { name: file.name, type: file.type, content: reader.result },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property Details:", property);
    alert("Property details uploaded successfully!");
    if (onSubmit) onSubmit(property);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset>
        <h2>Upload Property Files</h2>

        {/* Thumbnail Upload */}
        <label className={styles.fileLabel}>
          <UploadCloud size={48} absoluteStrokeWidth />
          <div>
            <h3>Thumbnail</h3>
            {property.thumbnail ? (
              <p>{property.thumbnail.name}</p>
            ) : (
              <p>Upload a single JPG/PNG image. Max size: 10MB.</p>
            )}
          </div>
          <input
            className={styles.fileInput}
            type="file"
            accept=".jpg, .jpeg, .png"
            required
            onChange={(e) => handleFileUpload(e, "thumbnail")}
          />
        </label>

        {/* Document Upload */}
        <label className={styles.fileLabel}>
          <UploadCloud size={48} absoluteStrokeWidth />
          <div>
            <h3>Property Document</h3>
            {property.document ? (
              <p>{property.document.name}</p>
            ) : (
              <p>Upload a legal document (PDF). Max size: 10MB.</p>
            )}
          </div>
          <input
            className={styles.fileInput}
            type="file"
            accept=".pdf"
            required
            onChange={(e) => handleFileUpload(e, "document")}
          />
        </label>

        {/* Receipt Upload */}
        <label className={styles.fileLabel}>
          <UploadCloud size={48} absoluteStrokeWidth />
          <div>
            <h3>Receipt</h3>
            {property.receipt ? (
              <p>{property.receipt.name}</p>
            ) : (
              <p>Upload a receipt for the transaction (PDF). Max size: 10MB.</p>
            )}
          </div>
          <input
            className={styles.fileInput}
            type="file"
            accept=".pdf"
            required
            onChange={(e) => handleFileUpload(e, "receipt")}
          />
        </label>

        {/* Video Upload */}
        <label className={styles.fileLabel}>
          <UploadCloud size={48} absoluteStrokeWidth />
          <div>
            <h3>Inspection Video</h3>
            {property.video ? (
              <p>{property.video.name}</p>
            ) : (
              <p>Upload a video walkthrough (MP4). Max size: 50MB.</p>
            )}
          </div>
          <input
            className={styles.fileInput}
            type="file"
            accept=".mp4"
            required
            onChange={(e) => handleFileUpload(e, "video")}
          />
        </label>
        <Button label="Continue" btnClass="primary" />
      </fieldset>
    </form>
  );
}

export default NewProperty;
