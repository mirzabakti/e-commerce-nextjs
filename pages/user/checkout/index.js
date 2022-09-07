import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import CardCheckout from "../../../HOC/CardCheckout";
import Layout from "../../../widget/Layout";

const Checkout = () => {

  let { state, handleFunction } = useContext(GlobalContext);
  let { user, setUser, fetchStatus, setFetchStatus ,fetchCheckoutStatus, setFetchCheckoutStatus, getCheckoutUser, setCheckoutUser, dataCheckoutUser, setDataCheckoutUser } = state;
  let { fetchCheckoutUser, sumTotal } = handleFunction;

  console.log(dataCheckoutUser)

  useEffect(() => {
    if (Cookies.get("token_user") !== undefined) {
      if (user === undefined) {
        setUser(JSON.parse(Cookies.get("user")));
      }
    }

    if (user !== undefined) {
      if (fetchCheckoutStatus) {
        fetchCheckoutUser();
        setFetchCheckoutStatus(false);
      }
    }
  }, [user, setUser, fetchCheckoutStatus, setFetchCheckoutStatus, fetchCheckoutUser]);

  return (
    <Layout>
      <div className="container mx-auto my-16">
        <div className="text-2xl font-bold">Detail Product</div>
        <p>Di bawah ini merupakan checkout produk yang anda pilih, silakan selesaikan transaksi</p>
      </div>
      <div className="mt-10">
        <div className="border">
          <div className="flex w-full flex-row flex-wrap overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="flex flex-col w-2/3 p-4 mt-16 grow lg:mt-0">
            {
              dataCheckoutUser !== null &&
              dataCheckoutUser.map((res) => {
                return <CardCheckout key={res.id} data={res}/>
              })
            }
              <div className="flex flex-col justify-between mt-16 items-center lg:flex-row">
                <div>
                  <p>Anda melakukan {dataCheckoutUser !== null && dataCheckoutUser.length} Produk Checkout</p>
                  <h1 className="text-xl font-bold text-gray-700">
                    Total : Rp {dataCheckoutUser !== null && sumTotal(dataCheckoutUser)}
                  </h1>
                </div>
                <div className="mt-16 lg:mt-0">
                  <button className="w-full px-3 py-2 mt-2 text-xs font-bold text-white uppercase bg-gray-800 rounded">
                    Transaction
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
