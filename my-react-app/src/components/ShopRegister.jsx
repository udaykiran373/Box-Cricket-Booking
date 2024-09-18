import React from 'react';
import { Link } from 'react-router-dom';
import './ShopRegister.css'; // Updated path

const ShopRegister = () => {
  return (
    <div className="background-wrapper">
      <div className="shoplink">
        <a href="/login" className="underline">
          <h1>Shop</h1>
        </a>
      </div>
      <div className="register-container">
        <h2 className="center">Shop Register</h2>
        <form>
          <div className="input-group">
            <span className="icon">
              <img src="https://img.icons8.com/ios-filled/20/000000/user.png" alt="Name" />
            </span>
            <input type="text" placeholder="Name" required />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Ground Name" required />
          </div>
          <div className="input-group">
            <span className="icon">
              <img src="https://img.icons8.com/ios-filled/20/000000/email-open.png" alt="Email" />
            </span>
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <span className="icon">
              <img src="https://img.icons8.com/ios-filled/20/000000/lock.png" alt="Password" />
            </span>
            <input type="password" placeholder="Password" required />
          </div>
          <div className="input-group">
            <span className="icon">
              <img src="https://img.icons8.com/ios-filled/20/000000/lock.png" alt="Confirm Password" />
            </span>
            <input type="password" placeholder="Confirm Password" required />
          </div>
          <button type="submit" className="login-btn">Register Now</button>
          <div className="register-link">
            Already have an account? <Link to="/shoplogin">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopRegister;
