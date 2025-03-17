import { createContext, useState } from "react";
import TokenModal from "../components/tokenModal/TokenModal";

export const TokenContext = createContext();

export const TokenContextProvider = ({ children }) => {
  const [expiredToken, setExpiredToken] = useState(false);

  return (
    <TokenContext.Provider value={{ setExpiredToken }}>
      {children}
      {expiredToken && (
        <TokenModal closeTokenModal={() => setExpiredToken(false)} />
      )}
    </TokenContext.Provider>
  );
};
