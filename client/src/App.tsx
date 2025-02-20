import { Outlet } from "react-router-dom";
import NavbarCandidat from "./components/NavBarCandidat/NavBar";
import "./App.css";

function App() {
  return (
    <>
      <NavbarCandidat />
      <Outlet />
    </>
  );
}

export default App;
