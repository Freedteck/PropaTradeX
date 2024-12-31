import type { Connector } from "wagmi";
import { create } from "zustand";

type UserState = {
  connector: Connector | undefined;
  setConnector: (param: Connector | undefined) => void;
  isInitialized: boolean;
  setInitialized: (param: boolean) => void;
  isConnected: boolean;
  setConnected: (param: boolean) => void;
  address: any | undefined;
  setAddress: (param: any | undefined) => void;
};

export const useUserStore = create<UserState>((set) => ({
  connector: undefined,
  setConnector: (connector: Connector | undefined) => set({ connector }),
  isInitialized: false,
  setInitialized: (isInitialized: boolean) => set({ isInitialized }),
  isConnected: false,
  setConnected: (isConnected: boolean) => set({ isConnected }),
  address: undefined,
  setAddress: (address: any | undefined) => {
    set({ address: address?.toLowerCase() as any });
  },
}));
