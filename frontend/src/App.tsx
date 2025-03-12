import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import TripDetails from "./pages/TripDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="trip/:id" element={<TripDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
