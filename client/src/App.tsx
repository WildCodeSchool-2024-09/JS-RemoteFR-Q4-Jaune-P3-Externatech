import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

//import des pages

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
