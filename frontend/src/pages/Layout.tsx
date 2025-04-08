import { Outlet } from "react-router-dom";
import "../styles/root.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Layout = () => {
  return (
    <main className="main-content">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
