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
import { ProtectedDataContext } from "./context/ProtectedDataContext";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { connector, address: userAddress } = useAccount();
  const [accountFound, setAccountFound] = useState(false);
  const [protectedDataAddress, setProtectedDataAddress] = useState("");
  const [loadingContacts, setLoadingContacts] = useState(true);

  useEffect(() => {
    const getMyContacts = async () => {
      setLoadingContacts(true);
      try {
        if (connector && userAddress) {
          const { web3mail } = await initWeb3mail({ connector });
          const contacts = await web3mail.fetchMyContacts();

          const myAccount = contacts.find(
            (contact) =>
              contact.owner.toLowerCase() === userAddress.toLowerCase()
          );

          if (myAccount) {
            setAccountFound(true);
            setProtectedDataAddress(myAccount.address);
          } else {
            setAccountFound(false);
          }

          setContacts(contacts);
          setLoadingContacts(false);
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
    <ProtectedDataContext.Provider value={{ protectedDataAddress, contacts }}>
      <div className={styles.app}>
        <ToastContainer />
        {!loadingContacts && !accountFound && (
          <InputModal handleProtectAndGrantAccess={protectAndGrantAccess} />
        )}
        <Header protectedDataAddress={protectedDataAddress} />
        <div className={styles.content}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </ProtectedDataContext.Provider>
  );
};

export default App;
