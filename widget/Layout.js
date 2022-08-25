import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const Layout = ({ home, children }) => {
  return (
    <>
      <Navigation />
      {home && <Banner />}
      <div className="container mx-auto p-5">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
