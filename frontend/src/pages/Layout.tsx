import { Outlet } from "react-router-dom";
import "../styles/root.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import { useState } from "react";
import "../styles/login.scss";


const Layout = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  return (
    <div className="layout">
      <Navbar setIsLoginModalOpen={setIsLoginModalOpen} />
      <main className="main-content">
        <Outlet />
      </main>
      {isLoginModalOpen && (
        <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
      )}
      <Footer />
    </div>
  );
};

export default Layout;