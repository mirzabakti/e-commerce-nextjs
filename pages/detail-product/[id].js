import Layout from "../../widget/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const DetailData = () => {
  let router = useRouter();

  let { id } = router.query;
  // console.log(id);

  const [dataProduct, setDataProduct] = useState(null);

  useEffect(() => {
    if (id !== undefined) {
      axios.get(`https://service-example.sanbercloud.com/api/product/${id}`).then((res) => {
        let data = res.data;

        setDataProduct(data);
      });
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

  return (
    <Layout>
      <div className="container mx-auto my-16">
        <div className="text-2xl font-bold">Detail Product</div>
      </div>
      {dataProduct !== null && (
        <div className="">
          <div className="flex w-full overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="relative h-96 w-96 object-cover">
              <Image src={`/api/imageproxy?url=${encodeURIComponent(dataProduct.image_url)}`} alt="image" layout="fill" objectFit="cover" quality={80} />
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
                <h1 className="text-xl font-bold text-gray-700">{formatRupiah(dataProduct.price)}</h1>
                <div className="mt-4 flex items-center justify-between border">
                  <button className="h-full bg-gray-200 px-2 text-black">-</button>
                  <input className="inline-block h-full w-full text-center focus:outline-none" placeholder="1" />
                  <button className="h-full bg-gray-200 px-2 text-black">+</button>
                </div>
                <button className="rounded bg-gray-800 px-3 py-2 text-xs font-bold uppercase text-white">Add to Card</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DetailData;
