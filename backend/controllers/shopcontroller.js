const Shop = require('../models/Shop'); // Import the Shop model
const bcrypt = require('bcryptjs'); // For hashing passwords
const fs = require('fs');
const path = require('path');
const Booking = require('../models/Booking');
// Controller for registering a new shop
exports.registershop = async (req, res) => {
  const { owner,email, password } = req.body;

  try {
    // Check if the shop email already exists
    const existingShop = await Shop.findOne({ email });
    if (existingShop) {
      return res.status(400).json({ message: 'Shop with this email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new shop instance
    const newShop = new Shop({
      owner,
      email,
      password: hashedPassword
    });

    // Save the new shop in the database
    await newShop.save();

    res.status(201).json({ message: 'Shop registered successfully', shop: newShop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
exports.loginshop = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Email and password are required' });
    }

    try {
        // Find the shop by email
        const shop = await Shop.findOne({ email }).exec();
        if (!shop) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, shop.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Store shop details in the session
        req.session.shop = shop;
        console.log('Session created:', req.session.shop);

        // Set the session cookie (remove secure: true for development)
        res.cookie('sessionId', req.session.id, { httpOnly: true, secure: false, sameSite: 'None' });
        res.status(200).json({ msg: 'Login Successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
exports.checkshopsession = (req, res) => {
    console.log('Session object:', req.session); // Debugging session object
    if (req.session.shop) {
        console.log('Session exists');
        res.status(200).json({ msg: 'Shop Session exist ',shop:req.session.shop });
    } else {
        console.log('No session found');
        res.status(400).json({ msg: "Session does not exist" });
    }
};
exports.updateshop = async (req, res) => {
    if (!req.session.shop) {
        return res.status(401).json({ msg: 'No shop logged in' });
    }

    const shopId = req.session.shop._id;
    const { shopname, address } = req.body;

    try {
        const updatedShop = await Shop.findByIdAndUpdate(shopId, { shopname, address }, { new: true });

        if (!updatedShop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }

        req.session.shop = updatedShop; // Optionally update session data
        res.status(200).json({ msg: 'Shop details updated successfully', updatedShop });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};


exports.addground = async (req, res) => {
    const { groundname, priceperhour, maxplayers, groundLength, groundwidth, facilities, surfaceType, availability } = req.body;
    const image = req.file; // Multer stores the uploaded file in req.file

    // Parse the availability from the request
    let parsedAvailability;
    console.log(req.body);
    console.log(availability);

    try {
        // Check if availability is a string and parse it
        if (typeof availability === 'string') {
            parsedAvailability = JSON.parse(availability);
        } else {
            parsedAvailability = availability;
        }
    } catch (error) {
        return res.status(400).json({ msg: 'Invalid availability data' });
    }

    // Validate the required fields
    if (!groundname || !priceperhour || !maxplayers || !groundLength || !groundwidth || !facilities || !surfaceType) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        // Find the shop by user session or ID (you may want to adapt this)
        const shopId = req.session.shop._id; // Assuming you store shop ID in session
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }

        // Determine the file extension from the mimetype
        let fileExtension = '';
        if (image) {
            // Map mimetype to file extension
            const mimeToExt = {
                'image/jpeg': 'jpg',
                'image/png': 'png',
                'image/gif': 'gif',
                'image/webp': 'webp'
            };

            fileExtension = mimeToExt[image.mimetype] || ''; // Default to empty if unknown mimetype
        }

        // Construct the image path if image exists
        const imagePath = image ? `/public/images/${shopId}_${groundname}.${fileExtension}` : null;

        // Create a new ground object
        const newGround = {
            groundname,
            priceperhour,
            maxplayers,
            grounddimensions: {
                length: groundLength,
                width: groundwidth,
            },
            facilities: facilities.split(',').map(facility => facility.trim()), // Convert to array
            surfacetype: surfaceType,
            availability: parsedAvailability, // Use parsed availability
            image: imagePath, // Save the image path if it exists
            status: 'Active', // Default status
            verify: false,    // Default verification
            appliedforverification: false // Default verification application
        };

        // Push the new ground to the shop's availablesports array
        shop.availablesports.push(newGround);
        await shop.save();

        res.status(201).json({ msg: 'Ground added successfully!', shop });
    } catch (error) {
        console.error('Error adding ground:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};


 // Adjust the path to your Shop model

exports.loadVenues = async (req, res) => {
  try {
    // Fetch all shops with at least one verified sport ground
    console.log('hi');
    const shopsWithVenues = await Shop.find({ 'availablesports.verify': true }).exec();

    // Create a response format for venues
    const venueData = shopsWithVenues.map(shop => {
      // Filter only verified sports grounds
      const verifiedSports = shop.availablesports.filter(sport => sport.verify);

      // Return only if there are verified sports grounds
      return verifiedSports.map(sport => {
        // Construct the image path
        const imagePath = path.join(__dirname, '..', sport.image); // Adjust path as needed
        let imageBase64 = '';
        // Read the image file and convert to base64
        try {
          const imageBuffer = fs.readFileSync(imagePath);
          imageBase64 = imageBuffer.toString('base64');
        } catch (imageError) {
          console.error(`Error reading image for ${sport.groundname}:`, imageError);
          imageBase64 = ''; // Default to an empty string if image not found
        }

        // Return venue data including ground dimensions, availability, and facilities
        return {
          name: shop.shopname,
          address: shop.address,
          image: `data:image/jpeg;base64,${imageBase64}`, // Include base64 encoded image
          groundname: sport.groundname,
          priceperhour: sport.priceperhour,
          maxplayers: sport.maxplayers,
          surfacetype: sport.surfacetype,
          status: sport.status,
          grounddimensions: sport.grounddimensions,
          availability: sport.availability,
          facilities: sport.facilities
        };
      });
    }).flat(); // Flatten the array of arrays into a single array

    // Check if any verified venues were found
    if (venueData.length === 0) {
      return res.status(404).json({ message: 'No verified venues found' });
    }

    // Send the venues data in response
    res.status(200).json(venueData);
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.loadGround = async (req, res) => {
    try {
      const { name } = req.body;
      const shopname=name.slice()
      // Find the ground(s) that match the venue name
      const grounds = await ShopSport.find({ groundname: name })
        .populate('sport') // Populate to get details of the sport
        .exec();
  
      if (!grounds || grounds.length === 0) {
        return res.status(404).json({ message: 'No grounds found for the specified venue.' });
      }
  
      res.status(200).json(grounds);
    } catch (error) {
      console.error('Error loading ground:', error);
      res.status(500).json({ message: 'An error occurred while loading the ground.' });
    }
  };


// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { shop,date, timeSlot, amountPaid } = req.body;
        const user=req.session.user;

        // Create a new booking object
        const newBooking = new Booking({
            user,
            shop,
            sport,
            date,
            timeSlot,
            amountPaid
        });

        // Save booking to database
        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully!', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// Fetch all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'username email') // Populate user details
            .populate('shop', 'shopname address') // Populate shop details
            .populate('sport', 'groundname'); // Populate sport details
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

// Fetch bookings by user
exports.getBookingsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await Booking.find({ user: userId })
            .populate('shop', 'shopname address')
            .populate('sport', 'groundname');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings for user', error: error.message });
    }
};

// Update a booking
exports.updateBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const updates = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updates, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { cancellationReason } = req.body;

        const cancelledBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { status: 'Cancelled', cancellationReason, cancellationDate: new Date() },
            { new: true }
        );

        if (!cancelledBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking cancelled successfully', booking: cancelledBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error: error.message });
    }
};

// Add feedback for a booking
exports.addFeedback = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { rating, comment } = req.body;

        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { feedback: { rating, comment, feedbackDate: new Date() } },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Feedback added successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error adding feedback', error: error.message });
    }
};

