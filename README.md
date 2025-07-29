# EduNexas - Modern E-Learning Platform

EduNexas is a comprehensive e-learning platform that connects educators with students, providing a seamless learning experience through modern web technologies. The platform supports course creation, video lectures, progress tracking, and more, with robust authentication and payment integration.

---

## 🌟 Features

### For Students
- **Browse Courses:** Explore a catalog of available courses.
- **Course Details:** View detailed information about each course, including curriculum and instructor.
- **Enroll in Courses:** Securely enroll in courses (with payment integration).
- **Watch Video Lectures:** Stream course videos directly within the platform.
- **Track Enrollments:** See all courses you are enrolled in.
- **Progress Tracking:** Monitor your progress through each course.
- **Access Course Content:** View chapters, lectures, and downloadable resources.
- **Course Ratings & Testimonials:** Rate courses and leave feedback/testimonials.

### For Educators
- **Create & Publish Courses:** Build new courses with chapters and video lectures.
- **Upload Video Content:** Upload and manage video lectures and course materials.
- **Manage Course Content:** Edit, update, or remove course content as needed.
- **Track Enrollments:** View which students are enrolled in your courses.
- **Earnings Dashboard:** Monitor total earnings and completed purchases.
- **Performance Metrics:** Analyze course performance, including ratings and student progress.
- **Student Management:** View enrolled students and their progress.

### General Platform Features
- **Authentication:** Secure login and registration using Clerk.
- **Role Management:** Separate dashboards and permissions for students and educators.
- **Responsive UI:** Modern, mobile-friendly interface.
- **Notifications:** Real-time toast notifications for actions and errors.
- **Rich Text Editing:** Use Quill for course descriptions and content.
- **Media Management:** Cloudinary integration for image and video uploads.
- **Payment Integration:** Stripe for secure course purchases.
- **API-Driven:** RESTful backend with clear separation of concerns.

---

## 🛠️ Technologies Used

### Frontend
- **React** - UI library for building user interfaces
- **Vite** - Fast frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Clerk** - Authentication and user management
- **React Toastify** - Toast notifications
- **Quill** - Rich text editor for course content
- **React YouTube** - YouTube video integration
- **RC Progress** - Progress indicators

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for building REST APIs
- **MongoDB** (via **Mongoose**) - NoSQL database for storing users, courses, progress, etc.
- **Cloudinary** - Media storage for images and videos
- **Stripe** - Payment processing
- **Clerk** - Authentication middleware for Express
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management
- **Nodemon** - Development server auto-reloading
- **Svix** - Webhook management

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **TypeScript** (optional, for type safety)

---

## 📁 Project Structure

```
EduNexas/
  client/         # Frontend (React)
    src/
      assets/         # Static assets
      components/     # Reusable UI components
      context/        # React context providers
      pages/          # Page components (student/educator)
      App.jsx         # Main application component
      main.jsx        # Application entry point
  server/         # Backend (Node.js/Express)
    config/           # Configuration (DB, Cloudinary, Multer)
    controllers/      # Route controllers
    middlewares/      # Express middlewares
    models/           # Mongoose models
    routes/           # API route definitions
    server.js         # Express app entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- MongoDB Atlas or local MongoDB instance
- Cloudinary account (for media uploads)
- Stripe account (for payments)
- Clerk account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd EduNexas
   ```

2. **Setup Environment Variables**
   - Copy `.env.example` to `.env` in both `client/` and `server/` directories and fill in your credentials.

3. **Install dependencies**
   ```bash
   cd client
   npm install
   # or
   yarn install

   cd ../server
   npm install
   # or
   yarn install
   ```

4. **Start the development servers**
   - **Frontend:**
     ```bash
     cd client
     npm run dev
     ```
   - **Backend:**
     ```bash
     cd server
     npm run server
     ```

5. **Build for production**
   - **Frontend:**
     ```bash
     npm run build
     ```
   - **Backend:** Deploy to your preferred Node.js hosting.

---

## 🔧 Configuration

- `vite.config.js` - Vite configuration (client)
- `tailwind.config.js` - Tailwind CSS configuration (client)
- `postcss.config.js` - PostCSS configuration (client)
- `eslint.config.js` - ESLint configuration (client/server)
- `.env` - Environment variables (client/server)

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Note:**  
For detailed API documentation, refer to the route files in `server/routes/`.  
For environment variable setup, see `.env.example` in both `client` and `server` folders. 