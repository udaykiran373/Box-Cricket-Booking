import React, { useState } from 'react';
import './EditModal.css'; // Import the CSS file for styles

const EditShopModal = ({ shop, onClose }) => {
    // State for form data with all fields
    const [formData, setFormData] = useState({
        shopname: shop.shopname || '',
        owner: shop.owner || '',
        email: shop.email || '',
        address: shop.address || '',
        contact: shop.contact || '',
        password: '', // Keep password empty unless updating
        // Add more fields here if necessary
    });

    // Handler for form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/admin/updateshop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...shop, ...formData }),
            credentials: 'include'
        });

        if (response.ok) {
            alert('Shop details updated successfully');
            onClose(); // Close the modal after submission
        } else {
            alert('Failed to update shop details');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Shop Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="shopname">Shop Name</label>
                        <input
                            type="text"
                            id="shopname"
                            name="shopname"
                            value={formData.shopname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="owner">Owner</label>
                        <input
                            type="text"
                            id="owner"
                            name="owner"
                            value={formData.owner}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact</label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter new password if changing"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Add more fields here as required */}
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditShopModal;
