import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import MesReservations from "./pages/MesReservations";
import MesGrumpyTrips from "./pages/myCarpools";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/mytrips/:id" element={<MesGrumpyTrips />} />
        <Route path="/myreservations/:id" element={<MesReservations />} />
        <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
