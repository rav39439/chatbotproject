import './App.css';
import { useState, useEffect } from 'react'
import Register from "./Pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Route
  , Routes
 } from 'react-router-dom';
 import History from "./components/History/History";

function App() {
  const [user, setUser] = useState(null)


  useEffect(() => {

    let userdata = JSON.parse(localStorage.getItem('Profile'))
      if (userdata !== null) {

        setUser(userdata)

      }
      else {
        setUser(null)
      }
   // }
  }, [])
  return (
    <div className="App">
      <Navbar  userInfo={user} />
      <Routes>
        <Route exact path="/" element={user !== null ? <Dashboard currentUser={user} /> : <Login />} />
        <Route exact path="/Login" element={<Login  />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/History" element={<History />} />

      </Routes>
    </div>
  );
}

export default App;
