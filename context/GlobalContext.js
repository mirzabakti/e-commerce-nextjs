import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = props => {

  const [user, setUser] = useState(undefined);

  let state = {
    user,
    setUser
  }

  return (
    <GlobalContext.Provider value={{state}}>
      {props.children}
    </GlobalContext.Provider>
  )
}