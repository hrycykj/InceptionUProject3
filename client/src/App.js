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
import Contact from "./pages/Contact";
import Download from "./pages/Download";
import Faq from "./pages/Faq";
import PartnerWithUs from "./pages/PartnerWithUs";
import Player from "./pages/Player";
import SignUp from "./pages/SignUp";
import CreateYourQuest from "./pages/CreateYourQuest";
import HostHunt from "./pages/HostHunt";
import JoinHunt from "./pages/JoinHunt";

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
              <MainArea /> <Footer />
            </div>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <div>
              <About /> <Footer />{" "}
            </div>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <div>
              <SignInScreen /> <Footer />{" "}
            </div>
          }
        ></Route>
        <Route
          path="/contact"
          element={
            <div>
              <Contact /> <Footer />
            </div>
          }
        ></Route>
         <Route
          path="/download"
          element={
            <div>
              <Download /> <Footer />
            </div>
          }
        ></Route>
         <Route
          path="/faq"
          element={
            <div>
              <Faq /> <Footer />
            </div>
          }
        ></Route>
         <Route
          path="/partner"
          element={
            <div>
              <PartnerWithUs /> <Footer />
            </div>
          }
        ></Route>
         <Route
          path="/player"
          element={
            <div>
              <Player /> <Footer />
            </div>
          }
        ></Route>
         <Route
          path="/sign-up"
          element={
            <div>
              <SignUp /> <Footer />
            </div>
          }
        ></Route>
        <Route
          path="/create-your-quest"
          element={
            <div>
              <CreateYourQuest /> <Footer />
            </div>
          }
        ></Route>
        <Route
          path="/host-a-hunt"
          element={
            <div>
              <HostHunt /> <Footer />
            </div>
          }
        ></Route>
        <Route
          path="/join-a-hunt"
          element={
            <div>
              <JoinHunt /> <Footer />
            </div>
          }
        ></Route>
        <Route
          path="*"
          element={
            <div>
              <MainArea /> <Footer />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
