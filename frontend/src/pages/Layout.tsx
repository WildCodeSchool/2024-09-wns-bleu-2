import { Outlet } from "react-router-dom";
import "../styles/root.scss";

const Layout = () => {
  return (
    <main className="main-content">
      <Outlet />
    </main>
  );
};

export default Layout;
