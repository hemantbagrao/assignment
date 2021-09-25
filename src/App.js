import './App.css';
import Home from './components/home';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Home />
      </header>
    </div>
    </Router>
  );
}

export default App;
