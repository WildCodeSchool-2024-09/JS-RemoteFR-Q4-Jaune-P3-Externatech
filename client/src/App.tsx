import { Outlet, useLocation } from "react-router-dom";
import Company_NavBar from "./components/Company_NavBar/Company_NavBar";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/footer/Footer";

import "./App.css";

//import des pages

function App() {
  const location = useLocation();

  const isCompanyPage = location.pathname.includes("/companies");

  return (
    <>
      {isCompanyPage ? <Company_NavBar /> : <NavBar />}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
