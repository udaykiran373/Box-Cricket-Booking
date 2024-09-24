import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [username, setUsername] = useState(null);
    const [users, setUsers] = useState([]);
    const [shops, setShops] = useState([]);
    const [verifyShops, setVerifyShops] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedShop, setSelectedShop] = useState(null);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isShopModalOpen, setIsShopModalOpen] = useState(false);
    const [isVerifyShopModalOpen, setIsVerifyShopModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const response = await fetch('http://localhost:5000/admin/checksession', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                setUsers(data.details.users);
                setShops(data.details.shops);

                const filteredVerifyShops = data.details.shops.filter(shop =>
                    shop.availablesports.some(sport => sport.appliedforverification && !sport.verify)
                );
                setVerifyShops(filteredVerifyShops);
            } else {
                navigate('/login');
                setUsername(null);
            }
        };

        checkSession();
    }, [navigate]);

    const openUserModal = (user) => {
        setSelectedUser(user);
        setIsUserModalOpen(true);
    };

    const closeUserModal = () => {
        setIsUserModalOpen(false);
        setSelectedUser(null);
    };

    const openShopModal = (shop) => {
        setSelectedShop(shop);
        setIsShopModalOpen(true);
    };

    const closeShopModal = () => {
        setIsShopModalOpen(false);
        setSelectedShop(null);
    };

    const openVerifyShopModal = (shop) => {
        setSelectedShop(shop);
        setIsVerifyShopModalOpen(true);
    };

    const closeVerifyShopModal = () => {
        setIsVerifyShopModalOpen(false);
        setSelectedShop(null);
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
    };

    const handleShopChange = (e, index) => {
        const updatedSports = selectedShop.availablesports.map((sport, i) => {
            if (i === index) {
                return { ...sport, verify: e.target.checked };
            }
            return sport;
        });
        setSelectedShop({ ...selectedShop, availablesports: updatedSports });
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        console.log("Updated User:", selectedUser);
        // Perform user update API call here
        closeUserModal();
    };

    const handleShopSubmit = async (e) => {
        e.preventDefault();
        console.log("Updated Shop:", selectedShop);
        // Perform shop update API call here
        closeShopModal();
    };

    const adminVerify = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/admin/adminverify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    shopId: selectedShop._id,
                    availablesports: selectedShop.availablesports
                }),
                credentials: 'include'
            });
            console.log(selectedShop.availablesports)
            if (response.ok) {
                const updatedShopFromDB = await response.json();
                console.log("Updated Shop:", updatedShopFromDB);
                closeVerifyShopModal();

                setShops(prevShops =>
                    prevShops.map(shop => shop._id === updatedShopFromDB._id ? updatedShopFromDB : shop)
                );
                window.location.reload();
            } else {
                console.error("Failed to update shop.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const deleteground = async (e,shopid, groundName) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/admin/deleteground`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    shopId: shopid,
                    groundName: groundName
                }),
                credentials: 'include'
            });
            console.log(groundName)
            if (response.ok) {
                window.location.reload();

            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const deleteuser = async (e,userid) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/admin/deleteuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userid
                }),
                credentials: 'include'
            });
            if (response.ok) {
                window.location.reload();

            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (!username) {
        return <div className="login-message">You must be logged in as an admin to view this page.</div>;
    }

    return (
        <div className="admin-dashboard">
            <h1 id="ad-dashboard-title">Welcome, {username}</h1>

            <h2 id="ad-users-title">Users</h2>
            <ul id="ad-users-list">
                {users.map(user => (
                    <li key={user._id} id={`ad-user-${user._id}`} onClick={() => openUserModal(user)}>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                    </li>
                ))}
            </ul>

            <h2 id="ad-verify-shops-title">Shops Applied for Verification</h2>
            <ul id="ad-verify-shops-list">
                {verifyShops.map(shop => (
                    <li key={shop._id} id={`ad-shop-${shop._id}`} onClick={() => openVerifyShopModal(shop)}>
                        <p>Shop Name: {shop.shopname}</p>
                        <p>Shop Owner: {shop.owner}</p>
                        <p>Shop Email: {shop.email}</p>
                    </li>
                ))}
            </ul>

            {isVerifyShopModalOpen && selectedShop && (
                <div id="shop-modal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeVerifyShopModal}>&times;</span>
                        <h2>Verify Shop Grounds</h2>
                        <form onSubmit={adminVerify}>
                            <div className="shop-details">
                                <p><strong>Shop Name:</strong> {selectedShop.shopname}</p>
                                <p><strong>Shop Owner:</strong> {selectedShop.owner}</p>
                                <p><strong>Shop Email:</strong> {selectedShop.email}</p>
                                <p><strong>Address:</strong> {selectedShop.address}</p>
                                <p><strong>Contact:</strong> {selectedShop.contact}</p>
                            </div>
                            <h2>Grounds Awaiting Verification</h2>
                            {selectedShop.availablesports.map((sport, index) => (
                                sport.appliedforverification ? (
                                    <div key={index} className="sport-verification-section">
                                        <p><strong>Ground Name:</strong> {sport.groundname}</p>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={sport.verify}
                                                onChange={(e) => handleShopChange(e, index)}
                                            />
                                            Verify
                                        </label>
                                    </div>
                                ) : null
                            ))}
                            <div className="form-actions">
                                <button type="submit" className="submit-button">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <h2 id="ad-shops-title">All Shops</h2>
            <ul id="ad-shops-list">
                {shops.map(shop => (
                    <li key={shop._id} id={`ad-shop-${shop._id}`} onClick={() => openShopModal(shop)}>
                        <p>Shop Name: {shop.shopname}</p>
                        <p>Shop Owner: {shop.owner}</p>
                        <p>Shop Email: {shop.email}</p>
                    </li>
                ))}
            </ul>
            {isUserModalOpen && selectedUser && (
                <div id="user-modal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeUserModal}>&times;</span>
                        <h2>Edit User Details</h2>
                            <div className="user-details">
                           <p><strong>User Name:</strong>{selectedUser.user}</p>
                           <p><strong>User Email:</strong>{selectedUser.email}</p>
                           <p><strong>User Contact:</strong>{selectedUser.contact}</p>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-button" onClick={(e) => deleteuser(e,selectedUser._id)}>Delete User</button>
                            </div>
                    </div>
                </div>
            )}

            {isShopModalOpen && selectedShop && (
                <div id="shop-modal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeShopModal}>&times;</span>
                        <h2>Edit Shop Details</h2>
                        <div className="shop-details">
                            <p><strong>Shop Name:</strong> {selectedShop.shopname}</p>
                            <p><strong>Shop Owner:</strong> {selectedShop.owner}</p>
                            <p><strong>Shop Email:</strong> {selectedShop.email}</p>
                            <p><strong>Address:</strong> {selectedShop.address}</p>
                            <p><strong>Contact:</strong> {selectedShop.contact}</p>
                        </div>
                        {selectedShop.availablesports.map((sport, index) => (
    <div key={index} className="sport-verification-section">
        <p><strong>Ground Name:</strong> {sport.groundname}</p>
        <p><strong>Price Per Hour:</strong> {sport.priceperhour}</p>
        <p><strong>Max Players:</strong> {sport.maxplayers.join(", ")}</p>
        <p><strong>Ground Dimensions:</strong> {sport.grounddimensions.length}m x {sport.grounddimensions.width}m</p>
        <p><strong>Surface Type:</strong> {sport.surfacetype}</p>
        <p><strong>Status:</strong> {sport.status}</p>
        <p><strong>Verified:</strong> {sport.verify ? "Yes" : "No"}</p>
        <p><strong>Applied for Verification:</strong> {sport.appliedforverification ? "Yes" : "No"}</p>
        <h3>Facilities:</h3>
        <ul>
            {sport.facilities.map((facility, i) => (
                <li key={i}>{facility}</li>
            ))}
        </ul>
        <h3>Availability:</h3>
        <ul>
            {sport.availability.map((avail, i) => (
                <li key={i}>
                    {avail.day}: {avail.times.map(time => `${time.start} - ${time.end}`).join(", ")}
                </li>
            ))}
        </ul>
        <h3>Reviews:</h3>
        <ul>
            {sport.reviews.map((review, i) => (
                <li key={i}>
                    <p><strong>User:</strong> {review.user}</p>
                    <p><strong>Rating:</strong> {review.rating}</p>
                    <p><strong>Comment:</strong> {review.comment}</p>
                    <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
                </li>
            ))}
        </ul>

<button type="submit" className="submit-button" onClick={(e) => deleteground(e,selectedShop._id, sport.groundname)}>Delte Ground</button>


    </div>
))}

                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
