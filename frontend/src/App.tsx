import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import CarpoolDetails from "./components/CarpoolDetail";
import SearchCarpool from "./components/searchCarpool";
import PublishRoute from "./pages/PublishRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="carpool/:id" element={<CarpoolDetails />} />
          <Route path="/search" element={<SearchCarpool />} />
          <Route path="publish-route" element={<PublishRoute />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
