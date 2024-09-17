import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

function Register() {
    return (
        <div className="background-wrapper">
        <div className="login-container">
            <h2>Register</h2>
            <form>
                <div className="input-group">
                    <span className="icon"><img src="https://img.icons8.com/ios-filled/20/000000/email-open.png" alt="Username"/></span>
                    <input type="text" placeholder="Username" required />
                </div>
                <div className="input-group">
                    <span className="icon"><img src="https://img.icons8.com/ios-filled/20/000000/email-open.png" alt="Email"/></span>
                    <input type="email" placeholder="Email" required />
                </div>
                <div className="input-group">
                    <span className="icon"><img src="https://img.icons8.com/ios-filled/20/000000/lock.png" alt="Password"/></span>
                    <input type="password" placeholder="Password" required />
                </div>
                <div className="input-group">
                    <span className="icon"><img src="https://img.icons8.com/ios-filled/20/000000/lock.png" alt="Confirm Password"/></span>
                    <input type="password" placeholder="Confirm Password" required />
                </div>
                <div className="options">
                    <label><input type="checkbox" /> Remember me</label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit" className="login-btn">Register Now</button>
                <div className="register-link">
                    Already have an account? <Link to="/login">Login Now</Link>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Register;
