import { initWeb3mail } from "../clients/web3mailClient";

export async function sendEmail({
  connector,
  protectedData,
  emailSubject,
  emailContent,
  senderName,
}) {
  const { web3mail } = await initWeb3mail({ connector });

  return web3mail.sendEmail({
    emailSubject: emailSubject,
    emailContent: emailContent,
    protectedData: protectedData,
    contentType: "text/plain",
    senderName: senderName,
    workerpoolAddressOrEns: "prod-v8-learn.main.pools.iexec.eth",
  });
}
