import { useContext, useEffect, useState } from "react";
import styles from "./NewProperty.module.css";
import Upload from "../../../../components/upload/Upload";
import { createProtectedData } from "../../../../modules/createProtectedData";
import { getOrCreateCollection } from "../../../../modules/getOrCreateCollection";
import { useAccount } from "wagmi";
import { pinata } from "../../../../utils/pinataConfig";
import StatusModal from "../../../../components/statusModal/StatusModal";
import { initDataProtectorSDK } from "../../../../clients/dataProtectorClient";
import useFetchCollectionIds from "../../../../hooks/useFetchCollectionIds";
import { toast, ToastContainer } from "react-toastify";
import { ProtectedDataContext } from "../../../../context/ProtectedDataContext";

// const FILE_SIZE_LIMIT_IN_KB = 500;
const FILE_SIZE_LIMIT_IN_KB = 10_000;

function NewProperty() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [thumbnail, setThumbnail] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [video, setVideo] = useState(null);
  const [status, setStatus] = useState({
    title: "",
    isDone: false,
    isError: false,
    payload: null,
  });
  const [statuses, setStatuses] = useState({});
  const [addToCollectionError, setAddToCollectionError] = useState();
  const [addToCollectionSuccess, setAddToCollectionSuccess] = useState(false);
  const [createdProtectedDataAddress, setCreatedProtectedDataAddress] =
    useState("");
  const { connector, address: ownerAddress } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { collectionIds } = useFetchCollectionIds();
  const { protectedDataAddress } = useContext(ProtectedDataContext);

  const handleStatusUpdate = (status) => {
    setStatus(status);
    setStatuses((prev) => ({
      ...prev,
      [status.title]: {
        isDone: status.isDone,
        payload: status.payload,
        isError: status.isError || false,
      },
    }));
  };

  const resetStatuses = () => {
    setStatus({ title: "", isDone: false, payload: null });
    setStatuses({});
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setBedrooms(1);
    setThumbnail(null);
    setReceipt(null);
    setVideo(null);
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

    if (!file) return;

    switch (name) {
      case "thumbnail":
        setThumbnail(file);
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
      !receipt ||
      !video
    ) {
      console.log("Missing required fields");

      return;
    }

    // Check file sizes for each file
    const files = [thumbnail, receipt, video];
    const filesTooLarge = files.filter(
      (file) => file.size > FILE_SIZE_LIMIT_IN_KB * 1024
    );
    if (filesTooLarge.length > 0) {
      console.log("Files too large", filesTooLarge);
      return;
    }

    await handleFileSubmit();
  };

  async function handleFileSubmit() {
    // Reset statuses
    resetStatuses();
    setAddToCollectionError(null);

    setIsLoading(true);

    try {
      const uploadFileToPinata = async () => {
        const thumbnailFile = await pinata.upload.file(thumbnail, {
          metadata: { name: title },
        });
        const thumbnailCid = thumbnailFile.IpfsHash;
        console.log("Thumbnail CID", thumbnailCid);

        const videoFile = await pinata.upload.file(video, {
          metadata: { name: title },
        });
        const videoCid = videoFile.IpfsHash;
        console.log("Video CID", videoCid);

        const metaData = await pinata.upload.json(
          {
            title,
            description,
            location,
            bedrooms,
            protectedDataAddress,
          },
          { metadata: { name: title } }
        );
        const metaDataCid = metaData.IpfsHash;
        console.log("Meta Data CID", metaDataCid);
      };

      toast.promise(
        uploadFileToPinata,
        {
          pending: "Uploading files securely...",
          success: "Files uploaded successfully",
          error: "Error uploading files",
        },
        {
          position: "top-center",
        }
      );

      const { address } = await createProtectedData({
        connector,
        receipt: receipt,
        propertyTitle: title,
        onStatusUpdate: handleStatusUpdate,
      });

      setCreatedProtectedDataAddress(address);

      // 2- Get or create collection
      const collectionId = await getOrCreateCollection({
        connector,
        ownerAddress: ownerAddress,
        onStatusUpdate: handleStatusUpdate,
      });

      if (!collectionIds.includes(collectionId)) {
        const addCidTOCollection = async () => {
          const collectionIdCid = await pinata.upload.json({ collectionId });

          const addCidToGroup = await pinata.groups.addCids({
            groupId: import.meta.env.VITE_PINATA_COLLECTION_ID,
            cids: [collectionIdCid.IpfsHash],
          });
          console.log("Add CID to group", addCidToGroup);
        };

        toast.promise(
          addCidTOCollection,
          {
            pending: "Adding CID to collection...",
            success: "CID added to collection",
            error: "Error adding CID to collection",
          },
          {
            position: "top-center",
          }
        );
      }

      const dataProtector = await initDataProtectorSDK({ connector });
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

      resetForm();
      setAddToCollectionSuccess(true);

      setIsLoading(false);
    } catch (err) {
      resetStatuses();
      setAddToCollectionError(err?.message);
      console.error("[Upload new content] ERROR", err, err.data && err.data);
      setIsLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        <Upload
          property={{
            title,
            description,
            location,
            bedrooms,
            thumbnail,
            receipt,
            video,
          }}
          handleInputChange={handleInputChange}
          handleFileUpload={handleFileUpload}
          isLoading={isLoading}
        />
      </form>

      <div className={styles.status}>
        {Object.keys(statuses).length > 0 && (
          <StatusModal
            statuses={statuses}
            addToCollectionSuccess={addToCollectionSuccess}
            protectedDataAddress={createdProtectedDataAddress}
          />
        )}
      </div>

      {addToCollectionError && (
        <div className={styles.error}>{addToCollectionError}</div>
      )}
    </>
  );
}

export default NewProperty;
