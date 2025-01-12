import { initDataProtectorSDK } from "../clients/dataProtectorClient";

export async function grantAccess({ connector, protectedData }) {
  const { dataProtectorCore } = await initDataProtectorSDK({ connector });

  return dataProtectorCore.grantAccess({
    protectedData: protectedData,
    authorizedApp: "0x781482C39CcE25546583EaC4957Fb7Bf04C277D2",
    authorizedUser: "0x0000000000000000000000000000000000000000",
    numberOfAccess: 100,
    onStatusUpdate: ({ title, isDone }) => {
      console.log(title, isDone);
    },
  });
}
