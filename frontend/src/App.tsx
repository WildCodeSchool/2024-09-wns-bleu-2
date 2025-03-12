import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import SearchCarpoolByUser from "./components/myCarpools";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/search/:id" element={<SearchCarpoolByUser />} />
        <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
