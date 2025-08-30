// Sample Student Data for Testing
// This file can be used to populate the database with test data

const sampleStudents = [{
        name: "John Smith",
        rollNumber: 1001,
        email: "john.smith@university.edu",
        department: "Computer Science",
        gpa: 3.8
    },
    {
        name: "Sarah Johnson",
        rollNumber: 1002,
        email: "sarah.johnson@university.edu",
        department: "Electrical Engineering",
        gpa: 3.9
    },
    {
        name: "Michael Brown",
        rollNumber: 1003,
        email: "michael.brown@university.edu",
        department: "Mechanical Engineering",
        gpa: 3.2
    },
    {
        name: "Emily Davis",
        rollNumber: 1004,
        email: "emily.davis@university.edu",
        department: "Computer Science",
        gpa: 3.7
    },
    {
        name: "David Wilson",
        rollNumber: 1005,
        email: "david.wilson@university.edu",
        department: "Business Administration",
        gpa: 3.5
    },
    {
        name: "Lisa Anderson",
        rollNumber: 1006,
        email: "lisa.anderson@university.edu",
        department: "Mathematics",
        gpa: 3.6
    },
    {
        name: "Robert Taylor",
        rollNumber: 1007,
        email: "robert.taylor@university.edu",
        department: "Physics",
        gpa: 3.4
    },
    {
        name: "Jennifer Martinez",
        rollNumber: 1008,
        email: "jennifer.martinez@university.edu",
        department: "Chemistry",
        gpa: 3.1
    },
    {
        name: "Christopher Lee",
        rollNumber: 1009,
        email: "christopher.lee@university.edu",
        department: "Civil Engineering",
        gpa: 3.3
    },
    {
        name: "Amanda Garcia",
        rollNumber: 1010,
        email: "amanda.garcia@university.edu",
        department: "Computer Science",
        gpa: 3.8
    }
];

// Function to populate database (for development/testing purposes)
async function populateDatabase() {
    try {
        const mongoose = require('mongoose');
        const Student = require('./models/Student');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student_management');

        // Clear existing data
        await Student.deleteMany({});

        // Insert sample data
        const result = await Student.insertMany(sampleStudents);

        console.log(`Successfully inserted ${result.length} sample students`);
        console.log('Sample data includes students from various departments with different GPAs');
        console.log('You can now test the search, sort, and CRUD functionality');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error populating database:', error);
    }
}

// Export for use in other files
module.exports = {
    sampleStudents,
    populateDatabase
};

// If this file is run directly, populate the database
if (require.main === module) {
    require('dotenv').config({ path: './config.env' });
    populateDatabase();
