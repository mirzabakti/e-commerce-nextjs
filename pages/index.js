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
  return (
    <Layout>
      <hr />
      <div className="my-20">
        <h1 className="font-bold text-2xl">Semua Produk</h1>
      </div>
      <div className="flex flex-wrap gap-10 justify-center lg:justify-start items-start">
        {dataProduct.length !== 0 &&
          dataProduct.map((res) => {
            return <Card key={res.id} data={res} />;
          })}
      </div>
    </Layout>
  );
}
