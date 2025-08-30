# Student Management System

## CS 311 - Web Programming Assignment No. 3

A comprehensive Student Management System built with Express.js, MongoDB, and EJS templating engine. This system provides complete CRUD operations for managing student records with search, sort, and validation capabilities.

## Features

### Core Functionalities (CRUD)
- ✅ **Create**: Add new students with form validation
- ✅ **Read**: View all students, individual student details
- ✅ **Update**: Edit existing student records
- ✅ **Delete**: Remove students with confirmation

### Advanced Features
- 🔍 **Search**: Search students by name or department
- 📊 **Sort**: Sort by GPA, Name, or creation date
- ✅ **Validation**: Input validation with error handling
- 📱 **Responsive**: Mobile and desktop friendly design
- 📝 **Logging**: Request logging with timestamps
- 🗄️ **Database**: MongoDB integration with Mongoose

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating, Bootstrap 5
- **Validation**: Express-validator
- **Styling**: Custom CSS with responsive design

## Project Structure

```
student-management-system/
├── app.js                 # Main application file
├── package.json          # Dependencies and scripts
├── config.env            # Environment configuration
├── models/
│   └── Student.js       # Student database schema
├── routes/
│   └── students.js      # Student CRUD routes
├── views/
│   ├── partials/
│   │   ├── header.ejs   # Navigation header
│   │   └── footer.ejs   # Footer component
│   ├── index.ejs        # Homepage
│   ├── students.ejs     # Student list with search/sort
│   ├── addStudent.ejs   # Add student form
│   ├── editStudent.ejs  # Edit student form
│   ├── studentDetails.ejs # Student details view
│   └── error.ejs        # Error handling page
├── public/
│   └── css/
│       └── style.css    # Custom styles
└── README.md            # Project documentation
```

## Database Schema

The Student model includes the following fields:

- **name** (String, required): Student's full name
- **rollNumber** (Number, unique, required): Unique roll number
- **email** (String, required, unique): Student's email address
- **department** (String, required): Academic department
- **gpa** (Number, min: 0, max: 4): Grade Point Average
- **createdAt** (Date): Record creation timestamp

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd student-management-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `config.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/student_management
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_management
```

### 4. Start the Application
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Student Routes
- `GET /students` - List all students with search/sort
- `GET /students/add` - Show add student form
- `POST /students/add` - Create new student
- `GET /students/:id` - View student details
- `GET /students/edit/:id` - Show edit form
- `PUT /students/edit/:id` - Update student
- `DELETE /students/delete/:id` - Delete student

### Query Parameters
- `search`: Search by name or department
- `sortBy`: Sort field (name, gpa, createdAt)
- `sortOrder`: Sort direction (asc, desc)

## Features in Detail

### Search Functionality
- Search students by name or department
- Case-insensitive search using regex
- Real-time filtering of results

### Sorting Capabilities
- Sort by GPA (0-4 scale)
- Sort by name (alphabetical)
- Sort by creation date (newest/oldest)
- Ascending and descending order

### Form Validation
- Required field validation
- Email format validation
- GPA range validation (0-4)
- Unique roll number and email
- Client and server-side validation

### Responsive Design
- Bootstrap 5 framework
- Mobile-first approach
- Responsive tables and forms
- Touch-friendly interface

### Error Handling
- Comprehensive error pages
- Form validation errors
- Database error handling
- User-friendly error messages

## Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Environment Variables for Production
```env
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=production
PORT=3000
```

## Testing the Application

1. **Add Students**: Navigate to `/students/add` and create test records
2. **View Students**: Check `/students` for the complete list
3. **Search & Sort**: Use the search bar and sort options
4. **Edit Records**: Click edit buttons to modify student information
5. **Delete Records**: Test deletion with confirmation modals

## Screenshots

The application includes:
- Homepage with feature overview
- Student list with search and sort
- Add/Edit forms with validation
- Student details view
- Responsive mobile design
- Error handling pages

## Contributing

This is an academic assignment project. For educational purposes only.

## License

ISC License

## Author

Student - CS 311 Web Programming Course

## Assignment Requirements Met

- ✅ Express.js project setup
- ✅ MongoDB + Mongoose integration
- ✅ Complete CRUD operations
- ✅ Search and sort functionality
- ✅ Input validation
- ✅ Request logging middleware
- ✅ EJS templates for all views
- ✅ Responsive design with Bootstrap
- ✅ Error handling
- ✅ Proper project structure
- ✅ Environment configuration
- ✅ Ready for Vercel deployment
