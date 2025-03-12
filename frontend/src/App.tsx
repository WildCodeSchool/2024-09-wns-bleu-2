import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import PublishRoute from "./pages/PublishRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="publish-route" element={<PublishRoute />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
