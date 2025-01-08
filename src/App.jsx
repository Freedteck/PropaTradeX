import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import styles from "./App.module.css";
import { initWeb3mail } from "./clients/web3mailClient";
import { useAccount } from "wagmi";
import InputModal from "./components/inputModal/InputModal";
import { toast, ToastContainer } from "react-toastify";
import { protectUserData } from "./modules/protectUserData";
import { grantAccess } from "./modules/grantAccess";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { connector, address: userAddress } = useAccount();
  const [accountFound, setAccountFound] = useState(false);
  const [protectedDataAddress, setProtectedDataAddress] = useState("");
  const [loadingContacts, setLoadingContacts] = useState(true); // Add loading state

  useEffect(() => {
    const getMyContacts = async () => {
      setLoadingContacts(true); // Start loading
      try {
        if (connector && userAddress) {
          const { web3mail } = await initWeb3mail({ connector });
          const contacts = await web3mail.fetchMyContacts();

          const myAccount = contacts.find(
            (contact) =>
              contact.owner.toLowerCase() === userAddress.toLowerCase()
          );

          if (myAccount) {
            console.log("My Account", myAccount);
            setAccountFound(true);
            setProtectedDataAddress(myAccount.address);
          } else {
            console.log("Account not found");
            setAccountFound(false);
          }

          setContacts(contacts);
          console.log("Contacts", contacts);
          setLoadingContacts(false); // Stop loading
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    getMyContacts();
  }, [connector, userAddress]);

  const protectAndGrantAccess = async (email, name) => {
    if (!connector) {
      toast.error("No connector found. Please connect your wallet.");
      return;
    }

    try {
      const { address } = await toast.promise(
        protectUserData({ connector, email, name }),
        {
          pending: "Protecting data...",
          success: "Data protected successfully!",
          error: "Failed to protect data.",
        },
        {
          position: "top-center",
        }
      );

      setProtectedDataAddress(address);

      await toast.promise(
        grantAccess({ connector, protectedData: address }),
        {
          pending: "Granting access...",
          success: "Access granted successfully!",
          error: "Failed to grant access.",
        },
        {
          position: "top-center",
        }
      );

      setAccountFound(true);
      return address;
    } catch (error) {
      console.error("Error during protect and grant access:", error);
    }
  };

  return (
    <div className={styles.app}>
      <ToastContainer />
      {!loadingContacts && !accountFound && (
        <InputModal handleProtectAndGrantAccess={protectAndGrantAccess} />
      )}
      <Header protectedDataAddress={protectedDataAddress} />
      <div className={styles.content}>
        <Outlet context={{ protectedDataAddress }} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
