import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar name={"Notebook"} />
          <Alert/>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/account' element={<Account />} />
            <Route exact path='/login' element={<Login  />} />
            <Route exact path='/signup' element={<Signup />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
