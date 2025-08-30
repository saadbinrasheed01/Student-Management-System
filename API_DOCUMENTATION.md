# 📖 API Documentation

**Student Management System - CS 311 Assignment 3**

## 🌐 Base URL

- **Local Development**: `http://localhost:3000`
- **Production**: `https://your-vercel-app.vercel.app`

## 🔐 Authentication

Currently, this application does not require authentication. All endpoints are publicly accessible.

## 📋 API Endpoints

### 1. Homepage

**GET** `/`

Returns the main homepage with navigation and feature overview.

**Response**: HTML page (index.ejs)

---

### 2. Student Management

#### 2.1 Get All Students

**GET** `/students`

Retrieves a list of all students with optional search and sort parameters.

**Query Parameters:**
- `search` (optional): Search by name or department
- `sort` (optional): Sort field (`name`, `gpa`, `createdAt`)
- `order` (optional): Sort order (`asc`, `desc`)

**Example Request:**
```
GET /students?search=computer&sort=gpa&order=desc
```

**Response**: HTML page (students.ejs) with filtered and sorted results

---

#### 2.2 Add Student Form

**GET** `/students/add`

Displays the form to add a new student.

**Response**: HTML page (addStudent.ejs)

---

#### 2.3 Create New Student

**POST** `/students/add`

Creates a new student record.

**Request Body:**
```json
{
  "name": "John Doe",
  "rollNumber": 12345,
  "email": "john.doe@example.com",
  "department": "Computer Science",
  "gpa": 3.8
}
```

**Validation Rules:**
- `name`: Required, string
- `rollNumber`: Required, number, unique
- `email`: Required, valid email format, unique
- `department`: Required, string
- `gpa`: Number between 0 and 4

**Response**: 
- **Success**: Redirect to `/students` with success message
- **Error**: Return to form with validation errors

---

#### 2.4 View Student Details

**GET** `/students/:id`

Displays detailed information about a specific student.

**Path Parameters:**
- `id`: Student's MongoDB ObjectId

**Example Request:**
```
GET /students/64f8a1b2c3d4e5f6a7b8c9d0
```

**Response**: HTML page (studentDetails.ejs) with student information

---

#### 2.5 Edit Student Form

**GET** `/students/edit/:id`

Displays the form to edit an existing student.

**Path Parameters:**
- `id`: Student's MongoDB ObjectId

**Response**: HTML page (editStudent.ejs) with pre-filled form

---

#### 2.6 Update Student

**PUT** `/students/edit/:id`

Updates an existing student record.

**Path Parameters:**
- `id`: Student's MongoDB ObjectId

**Request Body:**
```json
{
  "name": "John Smith",
  "rollNumber": 12345,
  "email": "john.smith@example.com",
  "department": "Computer Science",
  "gpa": 3.9
}
```

**Response**: 
- **Success**: Redirect to `/students` with success message
- **Error**: Return to form with validation errors

---

#### 2.7 Delete Student

**DELETE** `/students/delete/:id`

Removes a student record from the database.

**Path Parameters:**
- `id`: Student's MongoDB ObjectId

**Response**: 
- **Success**: Redirect to `/students` with success message
- **Error**: Error page or redirect with error message

---

## 🔍 Search and Filter

### Search Parameters

The search functionality supports the following query parameters:

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Search term for name or department | `?search=computer` |
| `sort` | string | Field to sort by | `?sort=gpa` |
| `order` | string | Sort direction | `?order=desc` |

### Search Examples

```bash
# Search for students in Computer Science department
GET /students?search=computer

# Sort students by GPA in descending order
GET /students?sort=gpa&order=desc

# Search and sort combined
GET /students?search=engineering&sort=name&order=asc
```

---

## 📊 Data Models

### Student Schema

```javascript
{
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  rollNumber: {
    type: Number,
    required: [true, 'Roll number is required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  gpa: {
    type: Number,
    min: [0, 'GPA cannot be less than 0'],
    max: [4, 'GPA cannot be more than 4']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

---

## 🚨 Error Handling

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 400 | Bad Request - Validation error |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

### Error Response Format

```json
{
  "error": "Error message",
  "details": "Additional error details",
  "timestamp": "2025-08-30T16:30:00.000Z"
}
```

---

## 📝 Request/Response Examples

### Create Student

**Request:**
```bash
POST /students/add
Content-Type: application/x-www-form-urlencoded

name=John%20Doe&rollNumber=12345&email=john.doe%40example.com&department=Computer%20Science&gpa=3.8
```

**Success Response:**
- Redirect to `/students` with success message
- New student appears in the list

**Error Response:**
- Return to form with validation errors
- Error messages displayed above form fields

---

### Update Student

**Request:**
```bash
PUT /students/edit/64f8a1b2c3d4e5f6a7b8c9d0
Content-Type: application/x-www-form-urlencoded

name=John%20Smith&rollNumber=12345&email=john.smith%40example.com&department=Computer%20Science&gpa=3.9
```

**Success Response:**
- Redirect to `/students` with success message
- Updated information reflected in the list

---

## 🔧 Middleware

### Request Logging

All requests are logged with timestamp and route information:

```javascript
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});
```

### Body Parsing

Request body parsing for form data and JSON:

```javascript
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
```

### Method Override

Support for PUT and DELETE methods in forms:

```javascript
app.use(methodOverride('_method'));
```

---

## 📱 Response Formats

### HTML Responses

Most endpoints return HTML pages rendered with EJS templates:

- **Content-Type**: `text/html`
- **Template Engine**: EJS (Embedded JavaScript)
- **Styling**: Bootstrap 5 + Custom CSS

### Redirect Responses

After successful operations:

- **Status**: 302 Found
- **Location**: Redirect URL
- **Flash Messages**: Success/error messages

---

## 🚀 Performance Considerations

### Database Queries

- Efficient MongoDB queries with proper indexing
- Pagination support for large datasets
- Optimized search queries

### Caching

- Static assets served with appropriate headers
- Template caching in production
- Database connection pooling

---

## 🔒 Security Features

### Input Validation

- Server-side validation using express-validator
- Client-side HTML5 validation
- SQL injection prevention (MongoDB)
- XSS protection through EJS templating

### Data Sanitization

- Input trimming and cleaning
- Email format validation
- Number range validation
- Unique constraint enforcement

---

## 📞 Support and Troubleshooting

### Common Issues

1. **MongoDB Connection Errors**
   - Check connection string format
   - Verify network access settings
   - Ensure database user permissions

2. **Validation Errors**
   - Check required field values
   - Verify email format
   - Ensure GPA is within 0-4 range

3. **Deployment Issues**
   - Verify environment variables
   - Check vercel.json configuration
   - Ensure all dependencies are installed

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your environment variables.

---

## 📚 Additional Resources

- **Express.js Documentation**: [expressjs.com](https://expressjs.com/)
- **MongoDB Documentation**: [docs.mongodb.com](https://docs.mongodb.com/)
- **EJS Documentation**: [ejs.co](https://ejs.co/)
- **Bootstrap Documentation**: [getbootstrap.com](https://getbootstrap.com/)

---

**🎓 This API documentation covers all endpoints and functionality of your Student Management System!**
