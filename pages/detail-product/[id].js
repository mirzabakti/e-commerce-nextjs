import Layout from "../../widget/Layout";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";

const DetailData = () => {
  let router = useRouter();
  let { id } = router.query;
  // console.log(id);

  let { state } = useContext(GlobalContext);
  let { user, setUser } = state;

  const [dataProduct, setDataProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      axios.get(`https://service-example.sanbercloud.com/api/product/${id}`).then((res) => {
        let data = res.data;

        setDataProduct(data);
      });
    }

    if (Cookies.get("token_user") !== undefined) {
      setUser(JSON.parse(Cookies.get("user")));
    }
  }, [id]);

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

  const handleQuantityPlus = () => setQuantity(quantity + 1);
  const handleQuantityMin = () => quantity > 0 && setQuantity(quantity - 1);

  const handleCheckout = () => {
    if (!user) {
      router.push("/user/checkout");
    } else {
      setDisplay(true);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto my-16">
        <div className="text-2xl font-bold">Detail Product</div>
      </div>
      {dataProduct !== null && (
        <div className="">
          <div className="flex w-full overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="relative h-96 w-96 object-cover">
              <Image src={`/api/imageproxy?url=$  {encodeURIComponent(dataProduct.image_url)}`} alt="image" layout="fill" objectFit="cover" quality={80} />
            </div>
            <div className="flex w-2/3 flex-col p-4">
              <h1 className="text-2xl font-bold text-gray-900">{dataProduct.product_name}</h1>
              <p className="mt-2 grow text-sm text-gray-600">{dataProduct.description}</p>
              <div className="item-center mt-2 flex">
                <p className="mt-2 text-sm text-gray-600">Stock : {dataProduct.stock}</p>
              </div>
              <div className="item-center mt-2 flex">
                <svg className="h-5 w-5 fill-current text-gray-700" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
                </svg>
                <svg className="h-5 w-5 fill-current text-gray-700" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
                </svg>
                <svg className="h-5 w-5 fill-current text-gray-700" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
                </svg>
                <svg className="h-5 w-5 fill-current text-gray-500" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
                </svg>
                <svg className="h-5 w-5 fill-current text-gray-500" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
                </svg>
              </div>
              <div className="item-center mt-3 flex flex-wrap justify-between">
                <h1 className="text-xl font-bold text-gray-700">Rp {formatRupiah(dataProduct.price)}</h1>
                <div>
                  {user && (
                    <>
                      <div className="mt-4 flex items-center justify-between border">
                        <button onClick={handleQuantityMin} className="h-full bg-gray-200 px-2 text-black">
                          -
                        </button>
                        <input value={quantity} className="inline-block h-full w-full text-center focus:outline-none" placeholder="1" />
                        <button onClick={handleQuantityPlus} className="h-full bg-gray-200 px-2 text-black">
                          +
                        </button>
                      </div>
                    </>
                  )}
                  {!display && (
                    <button onClick={handleCheckout} className="mt-2 w-full rounded bg-gray-800 px-3 py-2 text-xs font-bold uppercase text-white">
                      Add to Card
                    </button>
                  )}
                  {display && (
                    <button onClick={handleCheckout} className="mt-2 w-full rounded bg-gray-400 px-3 py-2 text-xs font-bold uppercase text-white">
                      <div role="status">
                        <svg className="mr-2 inline h-5 w-5 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DetailData;
