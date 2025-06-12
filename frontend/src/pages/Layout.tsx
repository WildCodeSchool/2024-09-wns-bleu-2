import { Outlet } from "react-router-dom";
import "../styles/root.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import { useState } from "react";
import { useModal } from "../contexts/ModalContext";
import "../styles/login.scss";

const Layout = () => {
  const { isLoginModalOpen, setIsLoginModalOpen } = useModal();

  return (
    <div className="layout">
      <Navbar setIsLoginModalOpen={setIsLoginModalOpen} />
      <main className="main-content">
        <div className="page-wrapper">
          <Outlet />
        </div>
      </main>
      {isLoginModalOpen && (
        <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
      )}
      <Footer />
    </div>
  );
};

export default Layout;
