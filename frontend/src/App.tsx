import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import TripDetails from "./pages/TripDetails";
import Register from "./pages/Register";
import EmailConfirmation from "./pages/EmailConfirmation";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import CarpoolDetails from "./components/CarpoolDetail";
import PublishRoute from "./pages/PublishRoute";
import SearchPage from "./pages/SearchPage";
import MesReservations from "./pages/MyBookings";
import MesGrumpyTrips from "./pages/MyGrumpyTrips";
import SearchPageResult from "./pages/SearchPageResult";
import BookATripPage from "./pages/BookATripPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/root.scss";
import Error404 from "./pages/Error404";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/mytrips/:id"
            element={
              <ProtectedRoute>
                <MesGrumpyTrips />
              </ProtectedRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/myreservations/:id"
            element={
              <ProtectedRoute>
                <MesReservations />
              </ProtectedRoute>
            }
          />
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="email-confirmation" element={<EmailConfirmation />} />
          <Route path="trip/:id" element={<TripDetails />} />
          <Route
            path="carpool/:id"
            element={
              <ProtectedRoute>
                <CarpoolDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="publish-route"
            element={
              <ProtectedRoute>
                <PublishRoute />
              </ProtectedRoute>
            }
          />
          <Route path="search-page" element={<SearchPage />} />
          <Route path="search-page-result" element={<SearchPageResult />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/book/:id" element={<BookATripPage />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
