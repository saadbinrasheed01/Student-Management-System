const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { body, validationResult } = require('express-validator');

// Validation middleware
const validateStudent = [
    body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
    body('rollNumber').isInt({ min: 1 }).withMessage('Roll number must be a positive integer'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('department').trim().isLength({ min: 1 }).withMessage('Department is required'),
    body('gpa').isFloat({ min: 0, max: 4 }).withMessage('GPA must be between 0 and 4')
];

// GET /students - List all students with search and sort
router.get('/', async(req, res) => {
    try {
        const { search, sortBy, sortOrder } = req.query;

        let query = {};

        // Search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { department: { $regex: search, $options: 'i' } }
            ];
        }

        // Sort functionality
        let sortOptions = {};
        if (sortBy && (sortBy === 'name' || sortBy === 'gpa')) {
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        } else {
            sortOptions = { createdAt: -1 }; // Default sort by creation date
        }

        const students = await Student.find(query).sort(sortOptions);

        res.render('students', {
            students,
            search: search || '',
            sortBy: sortBy || 'createdAt',
            sortOrder: sortOrder || 'desc'
        });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to fetch students',
            error: error
        });
    }
});

// GET /students/add - Show add student form
router.get('/add', (req, res) => {
    res.render('addStudent', {
        title: 'Add New Student',
        student: {},
        errors: {}
    });
});

// POST /students/add - Create new student
router.post('/add', validateStudent, async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('addStudent', {
                title: 'Add New Student',
                student: req.body,
                errors: errors.mapped()
            });
        }

        const student = new Student(req.body);
        await student.save();

        req.flash = req.flash || {};
        req.flash.success = 'Student added successfully!';

        res.redirect('/students');
    } catch (error) {
        console.error('Error adding student:', error);
        if (error.code === 11000) {
            // Duplicate key error
            const field = Object.keys(error.keyPattern)[0];
            const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
            return res.render('addStudent', {
                title: 'Add New Student',
                student: req.body,
                errors: {
                    [field]: { msg: message } }
            });
        }

        res.render('addStudent', {
            title: 'Add New Student',
            student: req.body,
            errors: { general: { msg: 'Failed to add student. Please try again.' } }
        });
    }
});

// GET /students/:id - Show student details
router.get('/:id', async(req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).render('error', {
                title: 'Student Not Found',
                message: 'The student you are looking for does not exist.',
                error: {}
            });
        }

        res.render('studentDetails', {
            title: 'Student Details',
            student
        });
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to fetch student details',
            error: error
        });
    }
});

// GET /students/edit/:id - Show edit student form
router.get('/edit/:id', async(req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).render('error', {
                title: 'Student Not Found',
                message: 'The student you are looking for does not exist.',
                error: {}
            });
        }

        res.render('editStudent', {
            title: 'Edit Student',
            student,
            errors: {}
        });
    } catch (error) {
        console.error('Error fetching student for edit:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to fetch student for editing',
            error: error
        });
    }
});

// PUT /students/edit/:id - Update student
router.put('/edit/:id', validateStudent, async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const student = await Student.findById(req.params.id);
            return res.render('editStudent', {
                title: 'Edit Student',
                student: {...student.toObject(), ...req.body },
                errors: errors.mapped()
            });
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).render('error', {
                title: 'Student Not Found',
                message: 'The student you are trying to edit does not exist.',
                error: {}
            });
        }

        res.redirect(`/students/${student._id}`);
    } catch (error) {
        console.error('Error updating student:', error);
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
            const student = await Student.findById(req.params.id);
            return res.render('editStudent', {
                title: 'Edit Student',
                student: {...student.toObject(), ...req.body },
                errors: {
                    [field]: { msg: message } }
            });
        }

        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to update student',
            error: error
        });
    }
});

// DELETE /students/delete/:id - Delete student
router.delete('/delete/:id', async(req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.redirect('/students');
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

module.exports = router;