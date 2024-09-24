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


// Admin verify route
exports.adminverify= async (req, res) => {
    const { shopId, availablesports } = req.body;

    try {
        // Find the shop by ID
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        // Update the shop's availablesports verification status
        shop.availablesports = availablesports;

        // Save the updated shop
        const updatedShop = await shop.save();

        // Return the updated shop
        return res.json(updatedShop);
    } catch (error) {
        console.error("Error during shop verification:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.admindeleteground = async (req, res) => {
    const { shopId, groundName } = req.body;
    try {
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        // Find the index of the ground to be deleted
        const groundIndex = shop.availablesports.findIndex(sport => sport.groundname === groundName);
        if (groundIndex === -1) {
            return res.status(404).json({ message: 'Ground not found' });
        }

        // Remove the ground from the availablesports array
        shop.availablesports.splice(groundIndex, 1);
        
        // Save the updated shop document
        await shop.save();

        return res.status(200).json({ message: 'Ground deleted successfully', shop });
    } catch (error) {
        console.error("Error during shop deletion:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.admindeleteuser=async (req,res)=>{
    const {userId}=req.body;
    try{
        await User.findByIdAndDelete(userId);
    res.status(200).json({message:'Deleted Succesfully'});
    }
        catch(error){
            console.log(error);
        }

}





