import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './Home/Home'
import './App.css';
import ShopLogin from './components/ShopLogin';
import ShopRegister from './components/ShopRegister';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/shoplogin' element={<ShopLogin />} />
          <Route path='/shopregister' element={<ShopRegister />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
