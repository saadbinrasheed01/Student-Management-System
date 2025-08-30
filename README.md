# 🎓 Student Management System

**CS 311 Assignment 3 - Web Programming Summer 2025**

A full-stack web application built with Express.js, MongoDB, and EJS for managing student records with complete CRUD operations.

## 🌟 Features

### ✨ Core Functionality
- **Create**: Add new students with validation
- **Read**: View all students and individual details
- **Update**: Edit existing student records
- **Delete**: Remove students with confirmation
- **Search**: Find students by name or department
- **Sort**: Order by GPA, name, or creation date

### 🎨 User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Beautiful gradient design with glass morphism
- **Interactive Elements**: Hover effects and smooth animations
- **Bootstrap 5**: Professional styling framework

### 🔧 Technical Features
- **Input Validation**: Server-side form validation
- **Request Logging**: Middleware for tracking all requests
- **Error Handling**: Comprehensive error management
- **Database Integration**: MongoDB Atlas cloud database

## 🛠️ Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: Object Data Modeling (ODM)

### Frontend
- **EJS**: Embedded JavaScript templating
- **Bootstrap 5**: CSS framework
- **Custom CSS**: Modern design with animations
- **Responsive Layout**: Mobile-first approach

### Development Tools
- **Nodemon**: Auto-restart development server
- **Git**: Version control
- **Vercel**: Deployment platform

## 📁 Project Structure

```
student-management-system/
├── app.js                 # Main application file
├── package.json          # Dependencies and scripts
├── vercel.json          # Vercel deployment config
├── config.env           # Environment variables
├── .vercelignore        # Vercel ignore file
├── models/
│   └── Student.js       # Student data model
├── routes/
│   └── students.js      # API routes
├── views/
│   ├── index.ejs        # Homepage
│   ├── students.ejs     # Student list
│   ├── addStudent.ejs   # Add student form
│   ├── editStudent.ejs  # Edit student form
│   ├── studentDetails.ejs # Student details
│   ├── error.ejs        # Error page
│   └── partials/
│       ├── header.ejs   # Navigation header
│       └── footer.ejs   # Page footer
├── public/
│   └── css/
│       └── style.css    # Custom styles
└── sample-data.js       # Sample data script
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/saadbinrasheed01/Student-Management-System.git
   cd Student-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `config.env.example` to `config.env`
   - Update `MONGODB_URI` with your MongoDB Atlas connection string

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - Navigate to `http://localhost:3000`

### MongoDB Atlas Setup

1. **Create MongoDB Atlas account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Sign up for free tier

2. **Create cluster**
   - Choose free tier (M0)
   - Select cloud provider and region

3. **Database Access**
   - Create database user with read/write permissions
   - Note username and password

4. **Network Access**
   - Add IP address: `0.0.0.0/0` (allows access from anywhere)

5. **Connection String**
   - Get connection string from cluster
   - Replace `<username>`, `<password>`, and `<dbname>`

## 🌐 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import repository: `Student-Management-System`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `NODE_ENV`: `production`
   - Click Deploy

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (optional) | `3000` |

## 📖 API Endpoints

### Student Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Homepage |
| `GET` | `/students` | List all students |
| `GET` | `/students/add` | Add student form |
| `POST` | `/students/add` | Create new student |
| `GET` | `/students/:id` | View student details |
| `GET` | `/students/edit/:id` | Edit student form |
| `PUT` | `/students/edit/:id` | Update student |
| `DELETE` | `/students/delete/:id` | Delete student |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `search` | Search by name/department | `?search=computer` |
| `sort` | Sort by field | `?sort=gpa` |
| `order` | Sort order (asc/desc) | `?order=desc` |

## 🎯 Usage Examples

### Adding a Student
1. Navigate to `/students/add`
2. Fill in student details:
   - Name (required)
   - Roll Number (required, unique)
   - Email (required, unique)
   - Department (required)
   - GPA (0-4 range)
3. Click "Add Student"

### Searching Students
1. Go to `/students`
2. Use search bar to find by name or department
3. Use sort buttons to order by GPA, name, or date

### Editing a Student
1. Click "Edit" button on student card
2. Modify required fields
3. Click "Update Student"

## 🔒 Data Validation

### Student Model Validation
- **Name**: Required string
- **Roll Number**: Required, unique number
- **Email**: Required, unique, valid email format
- **Department**: Required string
- **GPA**: Number between 0 and 4
- **Created At**: Auto-generated timestamp

### Form Validation
- Server-side validation using express-validator
- Client-side HTML5 validation
- Error messages for invalid inputs

## 🎨 Customization

### Styling
- Modify `public/css/style.css` for design changes
- Update Bootstrap classes in EJS templates
- Custom animations and transitions

### Functionality
- Add new fields to `models/Student.js`
- Create new routes in `routes/students.js`
- Extend validation rules

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check connection string format
   - Verify IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

2. **Port Already in Use**
   - Change PORT in config.env
   - Kill existing process using the port

3. **Module Not Found**
   - Run `npm install` to install dependencies
   - Check package.json for missing packages

4. **Vercel Deployment Issues**
   - Verify vercel.json format
   - Check environment variables
   - Ensure all files are committed to GitHub

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in config.env

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

### Features
- Mobile-first approach
- Touch-friendly buttons
- Optimized layouts for all screen sizes
- Flexible grid system

## 🚀 Performance

### Optimization
- Efficient database queries
- Minimal DOM manipulation
- Optimized CSS animations
- Responsive image handling

### Monitoring
- Request logging middleware
- Error tracking
- Performance metrics

## 📄 License

This project is created for educational purposes as part of CS 311 Web Programming course.

## 👨‍💻 Author

**Student** - CS 311 Web Programming Summer 2025

## 🙏 Acknowledgments

- Express.js team for the web framework
- MongoDB team for the database
- Bootstrap team for the CSS framework
- Vercel for the deployment platform

## 📞 Support

For technical support or questions:
1. Check the troubleshooting section
2. Review error logs in the console
3. Verify environment configuration
4. Check MongoDB Atlas status

---

**🎓 Happy Learning with Your Student Management System!**
