import { Outlet } from "react-router-dom";
import "../styles/root.scss";

import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <main className="main-content">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
