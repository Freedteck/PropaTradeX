import { create } from "zustand";

export const useUserStore = create((set) => ({
  connector: undefined,
  setConnector: (connector) => set({ connector }),
  isInitialized: false,
  setInitialized: (isInitialized) => set({ isInitialized }),
  isConnected: false,
  setConnected: (isConnected) => set({ isConnected }),
  address: undefined,
  setAddress: (address) => {
    set({ address: address?.toLowerCase() });
  },
}));
