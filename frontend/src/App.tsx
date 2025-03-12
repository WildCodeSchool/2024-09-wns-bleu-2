import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import CarpoolDetails from "./components/CarpoolDetail";

function App() {
	return (
		<>
			<Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="carpool/:id" element={<CarpoolDetails />} />
        </Route>
      </Routes>
      </>
	);
}

export default App;