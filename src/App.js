// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth } from "./pages/auth/index";
import { DecoGame } from './pages/deco-game/index';
import { SignUp } from './pages/sign-up/index';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/deco-game" element={<DecoGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
