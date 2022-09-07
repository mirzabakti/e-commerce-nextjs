import Cookies from "js-cookie";
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  // state data
  const [user, setUser] = useState(undefined);
  const [getCheckoutUser, setCheckoutUser] = useState(0);

  //indikator
  const [fetchStatus, setFetchStatus] = useState(false);
  const [fetchCheckoutStatus, setFetchCheckoutStatus] = useState(true);

  let fetchCheckoutUser = async () => {
    try {
      let result = await axios.get(`https://service-example.sanbercloud.com/api/checkout-product-user/${user.id}`, {
        headers: { Authorization: "Bearer" + Cookies.get("token_user") },
      });
      console.log(result.data);
      setCheckoutUser(result.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  let state = {
    user,
    setUser,
    fetchStatus,
    setFetchStatus,
    fetchCheckoutStatus,
    setFetchCheckoutStatus,
    getCheckoutUser,
    setCheckoutUser,
  };

  let handleFunction = {
    fetchCheckoutUser,
  };

  return <GlobalContext.Provider value={{ state, handleFunction }}>{props.children}</GlobalContext.Provider>;
};
