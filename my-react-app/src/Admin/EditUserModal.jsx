import React, { useState } from 'react';
import './EditModal.css'; // Import the CSS file for styles

const EditUserModal = ({ user, onClose }) => {
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        contact: user.contact,
        // Add more fields as needed
    });

    // Handler for form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/admin/updateuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...user, ...formData }),
            credentials: 'include'
        });

        if (response.ok) {
            alert('User details updated successfully');
            onClose(); // Close the modal after submission
        } else {
            alert('Failed to update user details');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit User Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
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
                        <label htmlFor="contact">Contact</label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            value={formData.contact}
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

export default EditUserModal;
