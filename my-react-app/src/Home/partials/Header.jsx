import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();
    const hasCheckedSessions = useRef(false); // Ref to track if sessions have been checked

    useEffect(() => {
        const checkSessions = async () => {
            if (hasCheckedSessions.current) return; // Skip if already checked

            hasCheckedSessions.current = true; // Mark as checked

            try {
                // Check user session
                const userResponse = await fetch('http://localhost:5000/user/checksession', {
                    credentials: 'include'
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUsername(userData.username);
                } else {
                    setUsername(null);
                }

                // Check shop session
                const shopResponse = await fetch('http://localhost:5000/shop/checkshopsession', {
                    credentials: 'include'
                });

                if (shopResponse.ok) {
                    navigate('/shopdashboard');
                }
            } catch (error) {
                console.error('Error checking sessions:', error);
            }
        };

        checkSessions();
    }, [navigate]); // Add 'navigate' to the dependency array

    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <a href="/"><span className="highlight">B</span>ox<span className="highlight">P</span>lay</a>
                </div>
                <ul className="nav-links1">
                    <li><a href="/play">Play</a></li>
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
