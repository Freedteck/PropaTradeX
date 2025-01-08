import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import styles from "./App.module.css";
import { initWeb3mail } from "./clients/web3mailClient";
import { useAccount } from "wagmi";
import InputModal from "./components/inputModal/InputModal";
import { ToastContainer } from "react-toastify";
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

  const handleProtectData = async (email, name) => {
    if (connector) {
      const { address } = await protectUserData({ connector, email, name });
      setProtectedDataAddress(address);
    }
  };

  const handleGrantAccess = async () => {
    console.log("Protected Data Address", protectedDataAddress);

    if (connector) {
      const { dataset } = await grantAccess({
        connector,
        protectedData: protectedDataAddress,
      });
      console.log("Dataset", dataset);
      setAccountFound(true);
    }
  };

  return (
    <div className={styles.app}>
      <ToastContainer />
      {/* Only show modal when contacts have been fetched and account is not found */}
      {!loadingContacts && !accountFound && (
        <InputModal
          handleProtectData={handleProtectData}
          handleGrantAccess={handleGrantAccess}
        />
      )}
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
