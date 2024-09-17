import React from 'react';
import './Header.css'; // You can style it using CSS in a separate file

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <a href="#"><span class="highlight">B</span>ox<span class="highlight">P</span>lay</a>
        </div>
        <ul className="nav-links">
          <li><a href="#">Play</a></li>
          <li><a href="#">Book</a></li>
          <li><a href="#">Learn</a></li>
          <li><a href="#">News</a></li>
        </ul>
        <div className="auth">
          <a href="./login">Login/Sign Up</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
