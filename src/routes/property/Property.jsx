import { Link, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import styles from "./Property.module.css";
import useFetchPropertyData from "../../hooks/useFetchPropertyData";
import { useEffect, useState } from "react";
import {
  CalendarClock,
  Loader,
  MailCheck,
  Shapes,
  ShoppingBagIcon,
  Play,
  User2,
  Lock,
  DownloadCloud,
} from "lucide-react";
import { timestampToReadableDate } from "../../utils/timestampToReadableDate";
import { secondsToDays } from "../../utils/secondsToDays";
import { useAccount } from "wagmi";
import { buyProperty } from "../../modules/buyProperty";
import { rentProperty } from "../../modules/rentProperty";
import MessageModal from "../../components/messageModal/MessageModal";
import { toast, ToastContainer } from "react-toastify";
import {
  getCompletedTaskId,
  saveCompletedTaskId,
} from "../../utils/localstorageContentMap";
import { initDataProtectorSDK } from "../../clients/dataProtectorClient";
import ConsumeStatusModal from "../../components/consumeStatusModal/ConsumeStatusModal";

const Property = () => {
  const { protectedDataAddress } = useParams();
  const [metaData, setMetaData] = useState({});
  const { address, connector } = useAccount();
  const { property, loading, refetch } = useFetchPropertyData({
    protectedDataAddress: protectedDataAddress,
  });

  const [isEditable, setIsEditable] = useState(false);
  const [renter, setRenter] = useState("false");
  const [openModal, setOpenModal] = useState(false);
  const [statusMessages, setStatusMessages] = useState({});
  const [payloadTaskId, setPayloadTaskId] = useState(null);
  const [contentAsObjectURL, setContentAsObjectURL] = useState(null);

  const [tab, setTab] = useState("thumbnail");

  useEffect(() => {
    const PropertyData = property;
    const fetchMetaData = async () => {
      await fetch(PropertyData.metaData)
        .then((response) => response.json())
        .then((data) => setMetaData(data));
    };

    fetchMetaData();
  }, [property, address, loading]);

  useEffect(() => {
    if (!property.isForSale && !property.isRentable) {
      setIsEditable(true);
    }

    const thisOwner = property.rentals?.find(
      (prop) => prop.renter.toLowerCase() === address.toLowerCase()
    );

    if (thisOwner) {
      setRenter(true);
    } else {
      setRenter(false);
    }
  }, [property.isForSale, property.isRentable, property.rentals, address]);

  useEffect(() => {
    const getObjURL = async () => {
      if (connector && protectedDataAddress) {
        const completedTaskId = getCompletedTaskId({
          walletId: address,
          protectedDataAddress,
        });

        const { dataProtectorSharing } = await initDataProtectorSDK({
          connector,
        });

        if (completedTaskId) {
          if (completedTaskId) {
            try {
              const { result } =
                await dataProtectorSharing.getResultFromCompletedTask({
                  taskId: completedTaskId,
                  path: "content",
                });
              const fileAsBlob = new Blob([result]);
              const fileAsObjectURL = URL.createObjectURL(fileAsBlob);
              setContentAsObjectURL(fileAsObjectURL);

              return;
            } catch (err) {
              console.error(
                `Failed to get result from existing completed task: ${completedTaskId}`,
                err
              );
              return;
            }
          }
        }
      }
    };

    getObjURL();
  }, [connector, protectedDataAddress, address]);

  const consumeData = async () => {
    if (connector && protectedDataAddress) {
      const { dataProtectorSharing } = await initDataProtectorSDK({
        connector,
      });

      // --- New consume content
      const { taskId, result } =
        await dataProtectorSharing.consumeProtectedData({
          app: import.meta.env.VITE_PROTECTED_DATA_DELIVERY_DAPP_ADDRESS,
          protectedData: protectedDataAddress,
          path: "content",
          workerpool: import.meta.env.VITE_WORKERPOOL_ADDRESS,
          onStatusUpdate: handleConsumeStatuses,
        });

      setPayloadTaskId(taskId);

      saveCompletedTaskId({
        walletId: address,
        protectedDataAddress,
        completedTaskId: taskId,
      });

      const fileAsBlob = new Blob([result]);
      const fileAsObjectURL = URL.createObjectURL(fileAsBlob);

      setContentAsObjectURL(fileAsObjectURL);

      setStatusMessages(
        Object.keys(statusMessages).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {})
      );
    }
  };

  function handleConsumeStatuses(status) {
    const { title, isDone, payload } = status;

    if (title === "FETCH_WORKERPOOL_ORDERBOOK" && !isDone) {
      setStatusMessages({
        "Check for iExec workers availability": false,
      });
    }
    if (title === "PUSH_ENCRYPTION_KEY" && !isDone) {
      setStatusMessages((currentMessages) => ({
        ...currentMessages,
        "Check for iExec workers availability": true,
        "Push encryption key to iExec Secret Management Service": false,
      }));
    }
    if (title === "CONSUME_ORDER_REQUESTED" && !isDone) {
      setStatusMessages((currentMessages) => ({
        ...currentMessages,
        "Push encryption key to iExec Secret Management Service": true,
        "Request to access this content": false,
      }));
    }
    if (title === "CONSUME_TASK" && !isDone && payload?.taskId) {
      saveCompletedTaskId({
        walletId: address,
        protectedDataAddress,
        completedTaskId: payload.taskId,
      });
      setStatusMessages((currentMessages) => ({
        ...currentMessages,
        "Request to access this content": true,
        "Content now being handled by an iExec worker (1-2min)": false,
      }));
    }
    if (title === "CONSUME_TASK" && isDone) {
      setStatusMessages((currentMessages) => ({
        ...currentMessages,
        "Content now being handled by an iExec worker (1-2min)": true,
        "Download result from IPFS": false,
      }));
    }
    if (title === "CONSUME_RESULT_DOWNLOAD" && isDone) {
      setStatusMessages((currentMessages) => ({
        ...currentMessages,
        "Download result from IPFS": true,
        "Decrypt result": false,
      }));
    }
    if (title === "CONSUME_RESULT_DECRYPT" && isDone) {
      setStatusMessages((currentMessages) => ({
        ...currentMessages,
        "Decrypt result": true,
      }));
    }
  }

  const handleBuy = async (priceInRLC) => {
    try {
      const { txHash } = await toast.promise(
        buyProperty(protectedDataAddress, priceInRLC, connector, address),
        {
          pending: "Buying property...",
          success: "Property bought successfully",
          error: "Error buying property",
        },
        {
          position: "top-center",
        }
      );
      console.log(txHash);
      refetch();
    } catch (error) {
      console.error("Error buying property:", error);
      toast.error("Error buying property", {
        position: "top-center",
      });
    }
  };

  const handleRent = async (rentalParams) => {
    try {
      const { txHash } = await toast.promise(
        rentProperty(protectedDataAddress, rentalParams, connector),
        {
          pending: "Renting property...",
          success: "Property rented successfully",
          error: "Error renting property",
        },
        {
          position: "top-center",
        }
      );
      console.log(txHash);
      refetch();
    } catch (error) {
      console.error("Error renting property:", error);
      toast.error("Error renting property", {
        position: "top-center",
      });
    }
  };

  function downloadFile() {
    if (!contentAsObjectURL) {
      console.error("No content available for download.");
      return;
    }

    const link = document.createElement("a");
    link.href = contentAsObjectURL;
    link.download = `${property.name || "file"}.pdf`;
    link.click();
  }

  if (loading) {
    return (
      <div className={styles.loader}>
        <Loader size={48} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.visuals}>
        {tab === "thumbnail" ? (
          <div
            className={styles.imageCard}
            style={{ backgroundImage: `url(${property.thumbnail})` }}
          ></div>
        ) : (
          <div className={styles.vid}>
            <video
              autoPlay
              muted
              loop
              controls
              type="video/mp4"
              src={property.video}
            />
          </div>
        )}
        <div className={styles.thumbnailCardContainer}>
          <div
            className={styles.thumbnailCard}
            style={{ backgroundImage: `url(${property.thumbnail})` }}
            onClick={() => setTab("thumbnail")}
          ></div>
          <div
            className={styles.thumbnailCard}
            style={{
              backgroundImage: `url(${property.thumbnail})`,
              position: "relative",
            }}
            onClick={() => setTab("video")}
          >
            <div className={styles.videoThumbnail}>
              <Play />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <h2>{metaData.title}</h2>
        <section className={styles.info}>
          <p>
            <CalendarClock size={20} absoluteStrokeWidth />
            {timestampToReadableDate(property.creationTimestamp)}
          </p>
          <p>
            <User2 size={20} absoluteStrokeWidth />
            {property.collection?.owner.id || property.renter}
          </p>
          <p>
            <Lock size={20} absoluteStrokeWidth />
            {metaData.protectedDataAddress}
          </p>
        </section>

        <div className={styles.description}>
          <h2>Description</h2>

          <h3>Bedroom(s)</h3>
          <p>{metaData.bedrooms}-Bedroom</p>

          <h3>Location</h3>
          <p>{metaData.location}</p>

          <h3>Price (RLC)</h3>
          <p>
            {property.isForSale ? (
              Number(property.saleParams.price / 1e9)
            ) : property.isRentable ? (
              Number(property.rentalParams.price / 1e9)
            ) : (
              <div className={styles.edit}>
                Property not for sale or rent
                <Link to={`/manage/${protectedDataAddress}/monetize`}>
                  List Property &rarr;
                </Link>
              </div>
            )}
          </p>

          <h3>Description</h3>
          <p>{metaData.description}</p>

          {renter && contentAsObjectURL && (
            <>
              <h3>Receipt</h3>
              <p onClick={downloadFile} className={styles.download}>
                Receipt available for download
                <DownloadCloud size={20} />
              </p>
            </>
          )}

          {renter && !contentAsObjectURL && (
            <p onClick={consumeData} className={styles.thanks}>
              Thank you for renting this property. You can now Download and view
              the receipt of your rental.
              <span onClick={downloadFile} className={styles.download}>
                Download Receipt
                <DownloadCloud size={20} />
              </span>
            </p>
          )}
        </div>

        {address.toLowerCase() ===
        property.collection?.owner.id.toLowerCase() ? (
          <p>You own this property</p>
        ) : renter ? (
          <p>You have rented this property</p>
        ) : (
          <div className={styles.actions}>
            {property.isRentable && (
              <Button
                label={`Rent Property for ${secondsToDays(
                  property.rentalParams.duration
                )} days`}
                btnClass="primary"
                icon={<Shapes size={20} />}
                handleClick={() => handleRent(property.rentalParams)}
              />
            )}
            {property.isForSale && (
              <Button
                label={`Buy Property`}
                btnClass="primary"
                icon={<ShoppingBagIcon size={20} />}
                handleClick={() => handleBuy(Number(property.saleParams.price))}
              />
            )}
            <Button
              label="Contact Owner"
              btnClass="secondary"
              icon={<MailCheck size={20} />}
              handleClick={() => setOpenModal(true)}
            />
          </div>
        )}
      </div>
      {openModal && (
        <MessageModal
          address={metaData.protectedDataAddress}
          handleClose={() => setOpenModal(false)}
        />
      )}
      <ToastContainer />
      <div className={styles.status}>
        {Object.keys(statusMessages).length > 0 && (
          <ConsumeStatusModal statuses={statusMessages} />
        )}
      </div>
    </div>
  );
};

export default Property;
