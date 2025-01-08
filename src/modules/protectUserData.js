import { initDataProtectorSDK } from "../clients/dataProtectorClient";

export async function protectUserData({ connector, email, name }) {
  const { dataProtectorCore } = await initDataProtectorSDK({ connector });

  return dataProtectorCore.protectData({
    name: name,
    data: { email: email },
  });
}
