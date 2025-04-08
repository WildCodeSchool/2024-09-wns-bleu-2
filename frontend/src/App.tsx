import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import TripDetails from "./pages/TripDetails";
import Register from "./pages/Register";
import EmailConfirmation from "./pages/EmailConfirmation";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import CarpoolDetails from "./components/CarpoolDetail";
import SearchCarpool from "./components/searchCarpool";
import PublishRoute from "./pages/PublishRoute";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="email-confirmation/:code?"
            element={<EmailConfirmation />}
          />
          <Route path="trip/:id" element={<TripDetails tripIndex={0} />} />
          <Route path="carpool/:id" element={<CarpoolDetails />} />
          <Route path="/search" element={<SearchCarpool />} />{" "}
          {/* A enlever ? */}
          <Route path="publish-route" element={<PublishRoute />} />
          <Route path="search-page" element={<SearchPage />} />
        </Route>
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
