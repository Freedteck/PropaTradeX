import PropTypes from "prop-types";
import styles from "./Upload.module.css";
import { UploadCloud } from "lucide-react";
import Button from "../button/Button";

const Upload = ({ property, handleInputChange, handleFileUpload }) => {
  return (
    <fieldset className={styles.fieldset}>
      <h2>Upload Property Details</h2>

      <label className={styles.inputLabel}>
        Title
        <input
          type="text"
          name="title"
          value={property.title}
          onChange={handleInputChange}
          placeholder="Enter the property title"
          required
        />
      </label>

      <label className={styles.inputLabel}>
        Brief Description
        <textarea
          name="description"
          value={property.description}
          onChange={handleInputChange}
          placeholder="Enter a brief description of the property"
          rows="3"
          required
        />
      </label>

      <label className={styles.inputLabel}>
        Location
        <input
          type="text"
          name="location"
          value={property.location}
          onChange={handleInputChange}
          placeholder="Enter the property location"
          required
        />
      </label>

      <label className={styles.inputLabel}>
        Number of Bedrooms
        <input
          type="number"
          name="bedrooms"
          value={property.bedrooms}
          onChange={handleInputChange}
          min="1"
          required
        />
      </label>

      <section>
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
            name="thumbnail"
            accept=".jpg, .jpeg, .png"
            required
            onChange={(e) => handleFileUpload(e)}
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
            name="video"
            accept=".mp4"
            required
            onChange={(e) => handleFileUpload(e)}
          />
        </label>
      </section>

      <section>
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
            name="document"
            accept=".pdf"
            required
            onChange={(e) => handleFileUpload(e)}
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
            name="receipt"
            accept=".pdf"
            required
            onChange={(e) => handleFileUpload(e)}
          />
        </label>
      </section>

      <Button label="Continue" btnClass="primary" />
    </fieldset>
  );
};

Upload.propTypes = {
  property: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
};

export default Upload;
