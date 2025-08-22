import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import BirdDetailPage from "./pages/BirdDetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="birds/:id" element={<BirdDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App;
