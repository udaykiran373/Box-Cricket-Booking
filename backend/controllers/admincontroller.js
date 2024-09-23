const express = require('express');
const User = require('../models/User');
const Shop = require('../models/Shop');

const displaydetails = async () => {
    let users = [];
    let shops = [];
    try {
        users = await User.find();
        shops = await Shop.find();
        return { users, shops }; // Return the data
    } catch (err) {
        console.error(err);
        throw new Error("Error retrieving data");
    }
};

exports.checksession = async (req, res) => {
    if (req.session.user && req.session.user.role === "admin") {
        try {
            // Call displaydetails directly
            const details = await displaydetails();
            res.status(200).json({
                message: "Session Exists",
                username:req.session.user.username,
                details // Include the details in the response
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error retrieving details" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};


