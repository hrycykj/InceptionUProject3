import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button'
function App() {

  const pingServer = async () => {
    let res = await fetch('/api/ping')
    let json = await res.json()
    console.log(json)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <Button variant="contained" onClick={() => pingServer()} >Text</Button>
      </header>
    </div>
  );
}

export default App;
