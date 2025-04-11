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
import MesReservations from "./pages/MyBookings";
import MesGrumpyTrips from "./pages/MyGrumpyTrips";
import SearchPageResult from "./pages/SearchPageResult";
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="login" element={<Login />} />
          <Route
            path="email-confirmation/:code?"
            element={<EmailConfirmation />}
          />
          <Route path="trip/:id" element={<TripDetails tripIndex={0} />} />
          <Route path="carpool/:id" element={<CarpoolDetails />} />
          <Route path="/search" element={<SearchCarpool />} />{" "}
          {/* A enlever ? */}
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
        </Route>
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
