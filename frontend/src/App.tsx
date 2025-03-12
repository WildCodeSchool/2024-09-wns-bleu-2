import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import EmailConfirmation from "./pages/EmailConfirmation";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register /> } />
          <Route path="login" element={<Login /> } />
          <Route path="email-confirmation/:code?" element={<EmailConfirmation /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
