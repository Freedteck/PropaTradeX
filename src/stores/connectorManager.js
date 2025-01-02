let connector = null;

export const setConnector = (newConnector) => {
  connector = newConnector;
};

export const getConnector = () => {
  // if (!connector) {
  //   throw new Error(
  //     "Connector is not initialized. Please connect your wallet."
  //   );
  // }
  return connector;
};

export const getProvider = async () => {
  if (!connector) {
    throw new Error(
      "Connector is not initialized. Please connect your wallet."
    );
  }
  return await connector.getProvider();
};

export const getWalletAddress = async () => {
  if (!connector) {
    throw new Error(
      "Connector is not initialized. Please connect your wallet."
    );
  }
  const accounts = await connector.getAccounts();
  if (!accounts || accounts.length === 0) {
    throw new Error("No wallet address found. Please connect your wallet.");
  }
  console.log("Wallet address", accounts[0]);

  return accounts[0]; // Return the first account
};
