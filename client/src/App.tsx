import { Outlet, useLocation } from "react-router-dom";
import CompanyNavbar from "./components/CompanyNavbar/CompanyNavbar";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/footer/Footer";

import "./App.css";

//import des pages

function App() {
  const location = useLocation();

  const isCompanyPage = location.pathname.includes("/companies");

  return (
    <>
      {isCompanyPage ? <CompanyNavbar /> : <NavBar />}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
