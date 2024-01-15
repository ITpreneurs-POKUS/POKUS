import { createContext } from "react";

export const CredentialsContext = createContext({storedValues: {}, setStoredValues: () => {}})