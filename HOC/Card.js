import Link from "next/link";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Cookies from "js-cookie";
import { Router, useRouter } from "next/router";

const Card = ({ data }) => {
  // console.log(data);

  let router = useRouter();
  let { state } = useContext(GlobalContext);
  let { user, setUser, fetchStatus, setFetchStatus } = state;

  const [quantity, setQuantity] = useState(1);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (Cookies.get("token_user") !== undefined) {
      setUser(JSON.parse(Cookies.get("user")));
    }
  }, []);

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

  const handleText = (param) => {
    if (param === null) {
      return "";
    } else {
      return param.slice(0, 25) + "...";
    }
  };

  const handleQuantityPlus = () => setQuantity(quantity + 1);
  const handleQuantityMin = () => quantity > 0 && setQuantity(quantity - 1);

  const handleCheckout = (e) => {
    if (!user) {
      router.push("/user/checkout");
    } else {
      // console.log(e.target.value)
      let idProduct = e.target.value
      let postCheckout = async () => {
        try {
          setDisplay(true);
          let result = await axios.post(`https://service-example.sanbercloud.com/api/checkout/${id.user}/${idProduct}`, {quantity},
          {
            headers : { "Authorization" : "Bearer" + Cookies.get("token_user")}
          })
          setDisplay(false);
          setFetchStatus(true)
          console.log(result)
        } catch (error) {
          console.log(error)
        }
      } 
      postCheckout()
    }
  };

  const handleChange = () => {}

  return (
    <div className="relative border border-gray-100 " style={{ width: "300px" }}>
      <div className="relative h-56 w-full object-cover">
        <Image src={`/api/imageproxy?url=${encodeURIComponent(data.image_url)}`} alt="image" layout="fill" objectFit="cover" quality={80} />
      </div>
      <div className="p-6">
        <small>
          <span className="mr-2 rounded-r-lg bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-200 dark:text-green-900">{data.category.category_name}</span>
        </small>
        <h5 className="mt-4 ">{handleText(data.product_name)}</h5>
        <ul className="mt-5 text-sm font-thin text-gray-500 ">
          <li>Stock : {data.stock}</li>
          <li className="text-lg font-bold">Harga : Rp {formatRupiah(data.price + "")}</li>
        </ul>

        {user && (
          <>
            <div className="mt-4 flex items-center justify-between border">
              <button onClick={handleQuantityMin} className="h-full bg-gray-200 px-2 text-black">
                -
              </button>
              <input onChange={handleChange} value={quantity} className="inline-block h-full w-full text-center focus:outline-none" placeholder="1" />
              <button onClick={handleQuantityPlus} className="h-full bg-gray-200 px-2 text-black">
                +
              </button>
            </div>
          </>
        )}

        {!display && (
          <button value={data.id} onClick={handleCheckout} className="mt-5 block w-full rounded-sm border bg-blue-500 p-4 text-sm font-medium text-white" type="button">
            Add to Cart
          </button>
        )}

        {display && (
          <button onClick={handleCheckout} className="relative mt-5 flex w-full items-center justify-center rounded-sm border bg-blue-200 p-4 p-6 text-sm font-medium text-white" type="button">
            <div role="status" className="absolute">
              <svg aria-hidden="true" className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        <Link href={`/detail-product/${data.id}`}>
          <a className="mt-2 block w-full rounded-sm border border-blue-500 bg-white p-4 text-center text-sm font-medium text-blue-500" type="button">
            Detail Product
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Card;
