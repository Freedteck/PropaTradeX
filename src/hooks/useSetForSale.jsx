import { useAccount } from "wagmi";
import { initDataProtectorSDK } from "../clients/dataProtectorClient";

const useSetForSale = ({ protectedDataAddress, priceInRLC }) => {
  const { connector } = useAccount();

  const onSubmitSale = async () => {
    const { dataProtectorSharing } = await initDataProtectorSDK({ connector });
    return dataProtectorSharing.setProtectedDataForSale({
      protectedData: protectedDataAddress,
      price: priceInRLC * 10 ** 9,
    });
  };

  return { onSubmitSale };
};

export default useSetForSale;
