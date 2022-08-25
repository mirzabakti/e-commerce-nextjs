// import styles from "../styles/Home.module.css";
import Card from "../HOC/Card";
import Layout from "../widget/Layout";
import React, { useState, useEffect } from "react";

export async function getServerSideProps() {
  let res = await fetch("http://service-example.sanbercloud.com/api/product");
  let Product = await res.json();

  return {
    props: {
      Product,
    },
  };
}

export default function Home({ Product }) {
  // console.log(Product);

  const [dataProduct, setDataProduct] = useState(Product);
  const [limit, setLimit] = useState(5);

  // indikator
  const [displaySpinner, setDisplaySpinner] = useState(false);

  const handleCounterFilter = () => {
    setDisplaySpinner(true);

    setTimeout(() => {
      setLimit(limit + 5);
      setDisplaySpinner(false);
    }, 1000);
  };

  return (
    <Layout home>
      <hr />
      <div className="my-20">
        <h1 className="text-2xl font-bold">Semua Produk</h1>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-10 lg:justify-start">
        {dataProduct.length !== 0 &&
          dataProduct
            .filter((res, i) => {
              return res.available === 1 && i < limit;
            })
            .map((res) => {
              return <Card key={res.id} data={res} />;
            })}
      </div>
      {!displaySpinner && (
        <div className="container mx-auto mt-20 flex w-full items-center justify-center">
          <button
            onClick={handleCounterFilter}
            type="button"
            className="mr-2 mb-2 flex items-center justify-center rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Lihat lebih banyak..
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
            </svg>
          </button>
        </div>
      )}
      {displaySpinner && (
        <div role="status" className="container mx-auto mt-20 flex w-full items-center justify-center">
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
      )}
    </Layout>
  );
}
