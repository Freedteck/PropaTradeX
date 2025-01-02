import { createArrayBufferFromFile } from "@iexec/dataprotector";
import { initDataProtectorSDK } from "../clients/dataProtectorClient";

export async function createProtectedData({
  connector,
  propertyDoc,
  receipt,
  onStatusUpdate,
}) {
  const { dataProtectorCore } = await initDataProtectorSDK({ connector });

  const propertyDocAsArrayBuffer = await createArrayBufferFromFile(propertyDoc);
  const receiptAsArrayBuffer = await createArrayBufferFromFile(receipt);

  const reduceArray = (array) =>
    array.reduce((accumulator, current, i) => {
      accumulator[i] = current;
      return accumulator;
    }, {});

  const filesArray = [propertyDocAsArrayBuffer, receiptAsArrayBuffer];

  onStatusUpdate({
    title: "Create protected data into DataProtector registry smart-contract",
    isDone: false,
  });

  return dataProtectorCore.protectData({
    data: { files: reduceArray(filesArray) },
    name: receipt.name,
    onStatusUpdate: (status) => {
      keepInterestingStatusUpdates(onStatusUpdate, status);
    },
  });
}

function keepInterestingStatusUpdates(onStatusUpdate, status) {
  if (status.title === "DEPLOY_PROTECTED_DATA" && status.isDone === true) {
    onStatusUpdate({
      title: "Create protected data into DataProtector registry smart-contract",
      isDone: true,
    });

    onStatusUpdate({
      title: "Push protected data encryption key to iExec SMS",
      isDone: false,
    });
  }

  if (status.title === "PUSH_SECRET_TO_SMS" && status.isDone === true) {
    onStatusUpdate({
      title: "Push protected data encryption key to iExec SMS",
      isDone: true,
    });
  }
}
