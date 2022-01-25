import "./App.css";
import Button from "@mui/material/Button";
import SignInScreen from "./components/SignInScreen";
import MainArea from "./components/MainArea";
import NavBar from "./components/NavBar";
import SideNavBar from "./components/SideNavBar";
import Footer from "./components/Footer";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";

function App() {
  const pingServer = async () => {
    let res = await fetch("/api/ping");
    let json = await res.json();
    console.log(json);
  };

  return (
    <div className="App">
      <NavBar />
      {/* <SignInScreen /> */}
      {/* <SideNavBar /> */}

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <MainArea /> <Footer />{" "}
            </div>
          }
        ></Route>
        <Route path="/about" element={<div><About /> <Footer /> </div>}></Route>
        <Route path="/login" element={<div><SignInScreen /> <Footer /> </div>}>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
