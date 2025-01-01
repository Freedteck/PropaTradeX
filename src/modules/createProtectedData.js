import { createArrayBufferFromFile } from "@iexec/dataprotector";
import { getDataProtectorClient } from "../clients/dataProtectorClient";

export async function createProtectedData({
  thumbnail,
  video,
  propertyDoc,
  receipt,
  details,
  onStatusUpdate,
}) {
  const { dataProtectorCore } = await getDataProtectorClient();

  const thumbnailAsArrayBuffer = await createArrayBufferFromFile(thumbnail);
  const videoAsArrayBuffer = await createArrayBufferFromFile(video);
  const propertyDocAsArrayBuffer = await createArrayBufferFromFile(propertyDoc);
  const receiptAsArrayBuffer = await createArrayBufferFromFile(receipt);

  const reduceArray = (array) =>
    array.reduce((accumulator, current, i) => {
      accumulator[i] = current;
      return accumulator;
    }, {});

  const filesArray = [
    thumbnailAsArrayBuffer,
    videoAsArrayBuffer,
    propertyDocAsArrayBuffer,
    receiptAsArrayBuffer,
  ];

  onStatusUpdate({
    title: "Create protected data into DataProtector registry smart-contract",
    isDone: false,
  });

  return dataProtectorCore.protectData({
    data: { files: reduceArray(filesArray), dataDetails: details },
    name: details.title,
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
