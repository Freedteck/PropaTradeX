import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_PINATA_JWT}`,
  pinataGateway: `${import.meta.env.VITE_GATEWAY_URL}`,
});

export const pinataMessage = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_PINATA_MESSAGE_JWT}`,
  pinataGateway: `${import.meta.env.VITE_MESSAGE_GATEWAY_URL}`,
});

