import { useAccount } from "wagmi";
import { initDataProtectorSDK } from "../clients/dataProtectorClient";

const useSetToRent = ({ protectedDataAddress, priceInRLC, durationInDays }) => {
  const { connector } = useAccount();

  const onSubmitRent = async () => {
    const { dataProtectorSharing } = await initDataProtectorSDK({ connector });
    return dataProtectorSharing.setProtectedDataToRenting({
      protectedData: protectedDataAddress,
      price: priceInRLC * 10 ** 9,
      duration: 60 * 60 * 24 * durationInDays,
    });
  };

  return { onSubmitRent };
};

export default useSetToRent;
