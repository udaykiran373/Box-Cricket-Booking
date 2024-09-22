// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop', // Reference to the Shop model
        required: true
    },
    sport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shopsport', // Reference to the Shopsport model
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        start: {
            type: String, // E.g., '08:00 AM'
            required: true
        },
        end: {
            type: String, // E.g., '10:00 AM'
            required: true
        }
    },
    amountPaid: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Confirmed', 'Cancelled'],
        default: 'Pending'
    },
    paymentDate: {
        type: Date
    },
    transactionId: {
        type: String // Store transaction ID for reference
    },
    cancellationReason: {
        type: String, // Reason for cancellation, if applicable
    },
    cancellationDate: {
        type: Date // Date of cancellation
    },
    refundAmount: {
        type: Number, 
    },checkInTime: {
        type: Date // Time the user checked in
    },
    checkOutTime: {
        type: Date // Time the user checked out
    },
    feedback: {
        rating: {
            type: Number, // E.g., 1 to 5 stars
            min: 1,
            max: 5
        },
        comment: {
            type: String // User's feedback about the venue or service
        },
        feedbackDate: {
            type: Date,
            default: Date.now
        }
    }
        
    
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
