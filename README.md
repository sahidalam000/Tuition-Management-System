# 🎓 Bright Future Tutoring 

A full-stack MERN based tuition management platform built for managing student enrollments, admin approval, subject dashboards, class resources that student info, fees, study materials, schedules, academic performance and secure authentication.

🌐 **Live Website:**  
https://brightfuturetutoring.vercel.app

---

# 🚀 Live Features

The system supports:

✅ Student Signup & Login Authentication
✅ JWT Authentication  
✅ Course Enrollment Approval System  
✅ Mathematics & Science Courses with Dashboards
✅ Dashboard Sidebar Persistence
✅ Student Info that View Assigned Class Information
✅ Dynamic Fees Management  
✅ Combo Discount System  
✅ Study Materials Upload (PDF)  
✅ Locked Materials with Secret Code  
✅ Students Access Study Materials
✅ Exam Schedule Management  
✅ Performance & Marks Tracking  
✅ Contact Form  
✅ Responsive UI  
✅ Cloudinary Uploads  
✅ MongoDB Database

---

# 📌 Project Purpose

Bright Future was developed to simplify tuition management by allowing teachers/admins to:

- Secure Admin Login
- Manage enrollments
- View Pending Requests
- Update Last paid fees
- Upload notes & papers
- Add/Edit Performance Data
- Handle fee structures
- Schedule exams
- Approve students
- Provide secure learning materials

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- TailwindCSS
- Framer Motion
- React Hot Toast

## Backend

- Node.js
- Express.js
- JWT Authentication
- Multer
- Cloudinary

## Database

- MongoDB Atlas
  

## Deployment

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

Storage → Cloudinary

---



# 📂 Folder Structure

```bash
Frontend/
│
├── src/
│ ├── pages/
│ ├── components/
│ ├── api/
│ ├── assets/
│ └── App.jsx

Backend/
│
├── routes/
├── controllers/
├── middleware/
├── models/
├── config/
└── server.js
```

---

# 🔐 Authentication System

Implemented using:

```txt
JWT Token Authentication
Protected Routes
Role Based Authorization
```

Roles:

```txt
Admin
Student
```

---

# 📚 Course System

Supported courses:

### Mathematics

Classes:

```txt
Class 8
Class 9
Class 10
```

### Science

Classes:

```txt
Class 8
Class 9
Class 10
```

---

# 👨‍🎓 Student Workflow

Student:

```txt
Login
↓
Select Course
↓
Upload Profile Photo
↓
Enter Tuition Code
↓
Enrollment Request
↓
Admin Approval
↓
Access Dashboard
↓
Download Materials
↓
View Fees
↓
Track Performance
```

---

# 👨‍💼 Admin Workflow

Admin can:

### Enrollment Management

- Approve Student
- Reject Student
- Assign Class

### Materials

Upload:

```txt
Exam Papers
Model Papers
Notes
Locked PDFs
```

Delete Materials

---

### Fees Manager

Admin can set:

```txt
Regular Fee
Original Fee
Combo Discount
Features
Fee Images
```

---

### Performance System

Admin can:

```txt
Add Marks
Edit Marks
Track Scores
```

---

### Schedule Manager

Admin can manage:

```txt
Exam Dates
Timings
Chapters
```

---

# 🔒 Study Material Protection

Supports:

```txt
Locked PDF
Secret Access Code
Secure Download
```

Students must enter code before access.

---

# 💰 Combo Discount System

Implemented:

Example:

```txt
Math = ₹700

Science = ₹500

Combo Discount Applied

Final Science Fee = ₹400
```

---

# ☁️ Cloudinary Integration

Used for:

```txt
Study Material Uploads
Fee Images
Student Assets
```

---

# ⚙️ Environment Variables

Backend `.env`

```env
PORT=
MONGO_URI=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# Installation

## Clone repository

```bash
git clone https://github.com/sahidalam000/Tuition-Management-System.git
```

---

## Backend

```bash
cd Backend

npm install

npm run dev
```

---

## Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

# API Examples

Authentication:

```txt
POST /api/auth/signup
POST /api/auth/login
```

Enrollment:

```txt
POST /api/enrollment/request
GET /api/enrollment/my-enrollments
```

Fees:

```txt
POST /api/fees/save
GET /api/fees/all
DELETE /api/fees/delete/:id
```

Materials:

```txt
PUT /api/admin/add-material
DELETE /api/admin/delete-material
```


---

# 👨‍💻 Developed By

**Sahid Alam**

B.Tech (CSE)  
Full Stack Developer 

GitHub:

https://github.com/sahidalam000

---

# ⭐ Support

If you like this project, consider giving it a star ⭐

---

# License

This project is developed for educational and portfolio purposes.
