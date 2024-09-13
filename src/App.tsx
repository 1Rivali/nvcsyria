import { Route, Routes } from "react-router-dom";

import AdminNavbar from "./components/AdminNavbar";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminHome from "./pages/AdminHome";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import PickFilter from "./pages/PickFilter";
import StoriesList from "./pages/StoriesList";
import StoryDetails from "./pages/StoryDetails";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/salam" element={<PickFilter />} />
                <Route path="/stories" element={<StoriesList />} />

                <Route path="/stories/:storyId" element={<StoryDetails />} />
              </Routes>{" "}
            </>
          }
        />

        <Route
          path="/admin/*"
          element={
            <>
              <AdminNavbar />
              <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/home" element={<AdminHome />} />
              </Routes>
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
