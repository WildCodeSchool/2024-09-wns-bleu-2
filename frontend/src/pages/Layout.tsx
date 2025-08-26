import { Outlet } from "react-router-dom";
import "../styles/root.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import { useModal } from "../contexts/ModalContext";
import "../styles/login.scss";

const Layout = () => {
  const { isLoginModalOpen } = useModal();

  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <div className="page-wrapper">
          <Outlet />
        </div>
      </main>
      {isLoginModalOpen && <LoginModal />}
      <Footer />
    </div>
  );
};

export default Layout;
