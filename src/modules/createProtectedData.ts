import {
  createArrayBufferFromFile,
  OneProtectDataStatus,
} from "@iexec/dataprotector";
import { getDataProtectorClient } from "../clients/dataProtectorClient";

type CreateProtectedDataStatusUpdateFn = (params: {
  title: string;
  isDone: boolean;
  payload?: Record<string, string>;
}) => void;

export async function createProtectedData({
  file,
  onStatusUpdate,
}: {
  file: File;
  onStatusUpdate: CreateProtectedDataStatusUpdateFn;
}) {
  const { dataProtectorCore } = await getDataProtectorClient();

  const fileAsArrayBuffer = await createArrayBufferFromFile(file);

  onStatusUpdate({
    title: "Create protected data into DataProtector registry smart-contract",
    isDone: false,
  });

  return dataProtectorCore.protectData({
    data: { file: fileAsArrayBuffer },
    name: file.name,
    onStatusUpdate: (status) => {
      keepInterestingStatusUpdates(onStatusUpdate, status);
    },
  });
}

function keepInterestingStatusUpdates(
  onStatusUpdate: CreateProtectedDataStatusUpdateFn,
  status: OneProtectDataStatus
) {
  if (status.title === "DEPLOY_PROTECTED_DATA" && status.isDone === true) {
    onStatusUpdate({
      title: "Create protected data into DataProtector registry smart-contract",
      isDone: true,
      // payload: status.payload,
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
