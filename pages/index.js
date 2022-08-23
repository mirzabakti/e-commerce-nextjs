// import styles from "../styles/Home.module.css";
import Card from "../HOC/Card";
import Layout from "../widget/Layout";

export default function Home() {
  return (
    <Layout>

      <hr />
      <div className="my-20">
        <h1 className="font-bold text-2xl">Semua Produk</h1>
      </div>
      <div className="flex flex-wrap gap-10 justify-center lg:justify-start items-start">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      </div>

    </Layout>
  );
}
