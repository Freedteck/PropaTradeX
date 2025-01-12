import { createContext } from "react";

export const ProtectedDataContext = createContext({
  protectedDataAddress: "",
  contacts: [],
});
