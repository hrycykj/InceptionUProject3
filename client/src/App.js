
import './App.css';
import Button from '@mui/material/Button'
import SignInScreen from './components/SignInScreen'
import MainArea from './components/MainArea';
import NavBar from './components/NavBar';
import SideNavBar from './components/SideNavBar';
import Footer from './components/Footer';
import axios from 'axios'




function App() {

  const pingServer = async () => {
    let res = await fetch('/api/ping')
    let json = await res.json()
    console.log(json)
  }

  return (
    <div className="App">
      <NavBar />
      {/* <SignInScreen /> */}
      <SideNavBar />
      <MainArea />
      <Footer />
    </div>
  );
}

export default App;
