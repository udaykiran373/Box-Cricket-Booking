import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
    const [username, setUsername] = useState(null);
    const [users, setUsers] = useState([]);
    const [shops, setShops] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const response = await fetch('http://localhost:5000/admin/checksession', {
                credentials: 'include' // Send cookies with the request
            });

            if (response.ok) {
                const data = await response.json();
                setUsername(data.username); // Set the username if session is valid
                setUsers(data.details.users); // Set the users if session is valid
                setShops(data.details.shops); // Set the shops if session is valid
            } else {
                navigate('/login');
                setUsername(null); // Clear username if session is not valid
            }
        };

        checkSession();
    }, []);

    if (!username) {
        return <div className="login-message">You must be logged in as an admin to view this page.</div>;
    }

    return (
        <div className="admin-dashboard">
            <h1>Welcome, {username}</h1>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.username} - {user.email}</li>
                ))}
            </ul>
            <h2>Shops</h2>
            <ul>
                {shops.map(shop => (
                    <li key={shop._id}>{shop.shopname} - {shop.owner} - {shop.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
