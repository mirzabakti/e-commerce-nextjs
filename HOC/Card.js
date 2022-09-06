import Link from "next/link";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Cookies from "js-cookie";

const Card = ({ data }) => {
  // console.log(data);
  let { state } = useContext(GlobalContext);
  let { user, setUser } = state;

  const [quantity, setQuantity] = useState(1);

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
              <input value={quantity} className="inline-block h-full w-full text-center focus:outline-none" placeholder="1" />
              <button onClick={handleQuantityPlus} className="h-full bg-gray-200 px-2 text-black">
                +
              </button>
            </div>
            <button className="mt-5 block w-full rounded-sm border bg-blue-500 p-4 text-sm font-medium text-white" type="button">
              Add to Cart
            </button>
          </>
        )}

        {!user && (
          <button className="mt-5 block w-full rounded-sm border bg-blue-500 p-4 text-sm font-medium text-white" type="button">
            Add to Cart
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
