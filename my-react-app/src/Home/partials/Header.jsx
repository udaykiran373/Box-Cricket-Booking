import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [username, setUsername] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const response = await fetch('http://localhost:5000/user/checksession', {
                credentials: 'include' // Send cookies with the request
            });   

            if (response.ok) {
                const data = await response.json();
                setUsername(data.username); // Set the username if session is valid
            } else {
                setUsername(null); // Clear username if session is not valid
            }
        };

        checkSession();
    }, []); 
    useEffect(() => {
      const checkshopsession = async () => {
          const response = await fetch('http://localhost:5000/shop/checkshopsession', {
              credentials: 'include' // Send cookies with the request
          });

          if (response.ok) {
            navigate('/shopdashboard')  ;
          } 
      };

      checkshopsession();
  }, []);

    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <a href="/"><span className="highlight">B</span>ox<span className="highlight">P</span>lay</a>
                </div>
                <ul className="nav-links1">
                    <li><a href="#">Play</a></li>
                    <li><a href="/Book">Book</a></li>
                    <li><a href="/Learn">Learn</a></li>
                    <li><a href="#">News</a></li>
                </ul>
                <div className="auth">
                    {username ? (
                        <span>{username}</span>
                    ) : (
                        <a href="./login">Login/Sign Up</a>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
