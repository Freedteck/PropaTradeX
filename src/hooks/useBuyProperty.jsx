import { useAccount } from "wagmi";
import { initDataProtectorSDK } from "../clients/dataProtectorClient";

const useBuyProperty = ({ protectedDataAddress, priceInRLC }) => {
  const { connector } = useAccount();

  const onSubmitBuy = async () => {
    console.log("Buy property", priceInRLC);

    const { dataProtectorSharing } = await initDataProtectorSDK({ connector });
    return dataProtectorSharing.buyProtectedData({
      protectedData: protectedDataAddress,
      price: priceInRLC,
    });
  };

  return { onSubmitBuy };
};

export default useBuyProperty;
