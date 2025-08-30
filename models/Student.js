const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    rollNumber: {
        type: Number,
        required: [true, 'Roll number is required'],
        unique: true,
        min: [1, 'Roll number must be positive']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
    },
    gpa: {
        type: Number,
        required: [true, 'GPA is required'],
        min: [0, 'GPA cannot be less than 0'],
        max: [4, 'GPA cannot be greater than 4']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to validate data
studentSchema.pre('save', function(next) {
    if (this.gpa < 0 || this.gpa > 4) {
        return next(new Error('GPA must be between 0 and 4'));
    }
    next();
});

module.exports = mongoose.model('Student', studentSchema);