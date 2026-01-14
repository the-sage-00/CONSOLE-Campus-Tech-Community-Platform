# Coding Leaderboard Admin Panel Setup

This guide will help you set up the complete admin panel for your coding leaderboard platform with login system and email functionality.

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Create/Update your `.env` file:**
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_gmail_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

4. **Create an admin user:**
   ```bash
   node scripts/createAdmin.js
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the admin panel:**
   - Open your browser and go to: `http://localhost:3000`
   - Login with the credentials:
     - Email: `admin@leaderboard.com`
     - Password: `admin123`

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password in your `.env` file

### Email Templates
The system includes three email templates:
- **Submission Confirmation**: Sent when users register
- **Approval Notification**: Sent when admin approves a user (shows after 24 hours as requested)
- **Rejection Notification**: Sent when admin rejects a user with reason

## 🔧 Features Implemented

### Admin Dashboard
- **Login System**: Secure JWT-based authentication
- **Dashboard Statistics**: Overview of users, pending requests, approvals
- **User Management**: View all users with pagination and filtering
- **Pending Requests**: Review and approve/reject user applications
- **Email Notifications**: Automatic emails for all user status changes

### User Workflow
1. User registers with platform handles
2. System sends confirmation email
3. Admin reviews the request
4. Admin approves/rejects with email notification
5. Approved users appear on the platform after 24 hours (as per your requirement)

### Security Features
- Password hashing with bcrypt
- JWT tokens for session management
- Protected routes
- Input validation
- XSS protection

## 📱 Admin Panel Pages

### 1. Login Page (`/login`)
- Secure authentication
- Password visibility toggle
- Form validation
- Responsive design

### 2. Dashboard (`/dashboard`)
- User statistics overview
- Platform distribution charts
- Quick action buttons
- System health status

### 3. Pending Requests (`/pending`)
- Review user applications
- Bulk approve functionality
- Individual approve/reject with reasons
- Search and filter capabilities

### 4. User Management (`/users`)
- View all users with pagination
- Filter by status (pending, approved, rejected)
- Search functionality
- User details and platform information

## 🎨 UI/UX Features

- **Responsive Design**: Works on all devices
- **Modern Interface**: Clean, professional design
- **Loading States**: Smooth loading indicators
- **Toast Notifications**: User feedback for all actions
- **Dark/Light Theme**: Professional color scheme
- **Icons**: Lucide React icons throughout

## 🔧 Technical Stack

### Frontend
- **React 18** with Hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **Date-fns** for date formatting

### Backend
- **Node.js & Express**
- **MongoDB with Mongoose**
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Nodemailer** for emails
- **CORS** enabled

## 📊 Email Functionality

The system automatically sends emails at these stages:

1. **User Registration**: Confirmation email with 24-hour notice
2. **Admin Approval**: Welcome email with access confirmation
3. **Admin Rejection**: Rejection email with reason and reapplication instructions

### Email Features:
- Professional HTML templates
- Responsive email design
- Branded appearance
- Clear call-to-actions
- Automatic sending with error handling

## 🛠️ Customization

### Changing Admin Credentials
1. Modify `backend/scripts/createAdmin.js`
2. Update email and password
3. Run the script again

### Email Templates
Email templates are in `backend/services/emailService.js` and can be customized:
- Change branding colors
- Modify text content
- Add company logos
- Update styling

### Frontend Theming
Colors and styling can be modified in:
- `frontend/tailwind.config.js` - Theme colors
- `frontend/src/index.css` - Global styles

## 🚨 Important Security Notes

1. **Change default admin password** after first login
2. **Use strong JWT secrets** in production
3. **Enable HTTPS** in production
4. **Use environment variables** for all secrets
5. **Regularly update dependencies**

## 📝 API Endpoints

### Admin Routes (`/api/admin/`)
- `POST /login` - Admin login
- `GET /dashboard/stats` - Dashboard statistics
- `GET /users/pending` - Get pending requests
- `GET /users` - Get all users (with pagination)
- `PUT /users/:id/approve` - Approve user
- `PUT /users/:id/reject` - Reject user
- `POST /users/bulk-approve` - Bulk approve users

## 🎯 Next Steps

1. **Production Deployment**:
   - Set up proper environment variables
   - Configure email service (Gmail/SendGrid)
   - Set up MongoDB Atlas or your preferred database
   - Deploy frontend and backend

2. **Additional Features** (if needed):
   - Admin user management
   - Role-based permissions
   - Audit logs
   - Export functionality
   - Advanced filtering

## 💡 Tips

- The admin panel is fully responsive and works on mobile devices
- All user actions trigger email notifications automatically
- The 24-hour delay for user visibility can be customized in the backend logic
- Search and filtering work in real-time for better user experience

## 🐛 Troubleshooting

### Common Issues:

1. **Email not sending**: Check Gmail app password and 2FA settings
2. **Database connection**: Verify MongoDB URI in `.env`
3. **JWT errors**: Ensure JWT_SECRET is set in `.env`
4. **CORS issues**: Backend already configured for frontend access

### Support
If you encounter any issues, check the browser console and backend logs for detailed error messages.

---

Your complete admin panel is now ready with all the features you requested! 🎉
