import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './Home/Home'
import './App.css';
import ShopLogin from './components/ShopLogin';
import ShopRegister from './components/ShopRegister';
import ShopDashboard from './Shop/ShopDashboard';
import Venue2 from './BookPage/Venue2';
import ArticleCard from './Learncard/ArticleCard';
import BookingPage from './Home/Booking/BookingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/shoplogin' element={<ShopLogin />} />
          <Route path='/shopregister' element={<ShopRegister />} />
          <Route path='/shopdashboard' element={<ShopDashboard />} />
          <Route path='/Learn' element={<ArticleCard />} />
          <Route path='/Book' element={<Venue2 />} />
          <Route path='/' element={<Home />} />
          <Route path="/Booking/:name" element={<BookingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
