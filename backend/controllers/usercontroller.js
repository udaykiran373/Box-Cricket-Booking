const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Signup Controller
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    try {
        let user = await User.findOne({ email }).exec();
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(200).json({ msg: 'Signup Successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userfound = await User.findOne({ email }).exec();
        if (!userfound) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, userfound.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        req.session.user = userfound; // Storing user in the session
        console.log('Session created:', req.session.user);

        // Set the session cookie (remove secure: true for development)
        res.cookie('sessionId', req.session.id, { httpOnly: true, secure: false, sameSite: 'None' });
        res.status(200).json({ msg: 'Login Successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Check Session Controller
exports.checksession = (req, res) => {
    console.log('Session object:', req.session); // Debugging session object
    if (req.session.user) {
        console.log('Session exists');
        res.json({ username: req.session.user.username });
    } else {
        console.log('No session found');
        res.status(400).json({ msg: "Session does not exist" });
    }
};
