import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const [fetchStatus, setFetchStatus] = useState(false);

  let state = {
    user,
    setUser,
    fetchStatus,
    setFetchStatus,
  };

  return <GlobalContext.Provider value={{ state }}>{props.children}</GlobalContext.Provider>;
};
