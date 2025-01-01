import React, { useState } from "react";
import styles from "./NewProperty.module.css";
import Upload from "../../../../../../components/upload/Upload";
import { createProtectedData } from "../../../../../../modules/createProtectedData";
import { getOrCreateCollection } from "../../../../../../modules/getOrCreateCollection";
import { getDataProtectorClient } from "../../../../../../clients/dataProtectorClient";
// import { WorkflowError } from "@iexec/dataprotector";
import Button from "../../../../../../components/button/Button";

// const FILE_SIZE_LIMIT_IN_KB = 500;
const FILE_SIZE_LIMIT_IN_KB = 10_000;

function NewProperty({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [thumbnail, setThumbnail] = useState(null);
  const [document, setDocument] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [video, setVideo] = useState(null);
  const [status, setStatus] = useState({
    title: "",
    isDone: false,
    payload: null,
  });
  const [createdProtectedDataAddress, setCreatedProtectedDataAddress] =
    useState("");
  const [addToCollectionError, setAddToCollectionError] = useState();
  const [addToCollectionSuccess, setAddToCollectionSuccess] = useState(false);

  const handleStatusUpdate = (status) => {
    setStatus(status);
  };

  const getData = async () => {
    const { dataProtectorSharing } = await getDataProtectorClient();
    const { protectedDataInCollection } =
      await dataProtectorSharing.getProtectedDataInCollections();

    console.log("Protected data in collection", protectedDataInCollection);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "bedrooms":
        setBedrooms(value);
        break;
      default:
        break;
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;

    console.log("File uploaded", name);

    if (!file) return;

    switch (name) {
      case "thumbnail":
        setThumbnail(file);
        break;
      case "document":
        setDocument(file);
        break;
      case "receipt":
        setReceipt(file);
        break;
      case "video":
        setVideo(file);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !location ||
      !bedrooms ||
      !thumbnail ||
      !document ||
      !receipt ||
      !video
    ) {
      console.log("Missing required fields");

      return;
    }

    // Check file sizes for each file
    const files = [thumbnail, document, receipt, video];
    const filesTooLarge = files.filter(
      (file) => file.size > FILE_SIZE_LIMIT_IN_KB * 1024
    );
    if (filesTooLarge.length > 0) {
      console.log("Files too large", filesTooLarge);

      return;
    }

    await handleFileSubmit();
    await getData();
  };

  async function handleFileSubmit() {
    // Reset statuses
    setStatus({ title: "", isDone: false, payload: null });
    setAddToCollectionError(null);

    console.log("Uploading new content");

    // Create protected data and add it to collection
    try {
      // 1- Create protected data
      const { address } = await createProtectedData({
        thumbnail,
        video,
        propertyDoc: document,
        receipt,
        details: {
          title,
          description,
          location,
          bedrooms,
        },
        onStatusUpdate: handleStatusUpdate,
      });
      setCreatedProtectedDataAddress(address);

      console.log("Uploaded new content", address);

      // 2- Get or create collection
      const collectionId = await getOrCreateCollection({
        onStatusUpdate: handleStatusUpdate,
      });

      // 3- Add to collection
      const dataProtector = await getDataProtectorClient();
      await dataProtector.dataProtectorSharing.addToCollection({
        protectedData: address,
        collectionId,
        addOnlyAppWhitelist: import.meta.env
          .VITE_PROTECTED_DATA_DELIVERY_WHITELIST_ADDRESS,
        onStatusUpdate: (status) => {
          if (status.title === "APPROVE_COLLECTION_CONTRACT") {
            const title =
              "Approve DataProtector Sharing smart-contract to manage this protected data";
            if (!status.isDone) {
              handleStatusUpdate({ title, isDone: false });
            } else {
              handleStatusUpdate({ title, isDone: true });
            }
          } else if (status.title === "ADD_PROTECTED_DATA_TO_COLLECTION") {
            const title = "Add protected data to your collection";
            if (!status.isDone) {
              handleStatusUpdate({ title, isDone: false });
            } else {
              handleStatusUpdate({ title, isDone: true });
            }
          }
        },
      });

      console.log("Added to collection", address);

      setAddToCollectionSuccess(true);

      // resetUploadForm
      // TODO: reset form later
    } catch (err) {
      // resetStatuses
      setStatus({ title: "", isDone: false, payload: null });
      setAddToCollectionError(err?.message);

      console.error("[Upload new content] ERROR", err, err.data && err.data);

      // TODO: Handle when fails but protected data well created, save protected data address to retry?
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Upload
          property={{
            title,
            description,
            location,
            bedrooms,
            thumbnail,
            document,
            receipt,
            video,
          }}
          handleInputChange={handleInputChange}
          handleFileUpload={handleFileUpload}
        />
      </form>

      {addToCollectionError && (
        <div className={styles.error}>{addToCollectionError}</div>
      )}

      {addToCollectionSuccess && (
        <div className={styles.success}>
          Property successfully uploaded!
          <Button label="Continue to Monetize" />
        </div>
      )}
    </>
  );
}

export default NewProperty;
