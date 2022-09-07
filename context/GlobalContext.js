import Cookies from "js-cookie";
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  // state data
  const [user, setUser] = useState(undefined);
  const [getCheckoutUser, setCheckoutUser] = useState(0);
  const [dataCheckoutUser, setDataCheckoutUser] = useState(null);

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
      setDataCheckoutUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }

  let sumTotal = (param) => {
    let getUnitPrice = param
      .filter((res) => {
        return res, is_transaction === 0;
      })
      .map((res) => {
        return res.unit_price;
      });

    const unitPrice = getUnitPrice.map(Number);
    console.log(unitPrice);

    let res = unitPrice.reduce((e, a) => e + a, 0);
    return formatRupiah(res + "");
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
    dataCheckoutUser,
    setDataCheckoutUser,
  };

  let handleFunction = {
    fetchCheckoutUser,
    formatRupiah,
    sumTotal,
  };

  return <GlobalContext.Provider value={{ state, handleFunction }}>{props.children}</GlobalContext.Provider>;
};
