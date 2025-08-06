# User Registration and Authentication Setup

## 🎯 Complete Authentication System

Your login system now includes both **Login** and **Signup** functionality with automatic database integration!

## 📋 Features Added:

### ✅ Signup Page (`signup.html`)

- **User Registration**: New users can create accounts
- **Automatic Database Storage**: Credentials stored in "users" table
- **Database-specific Signup**: Each subdomain registers users to its respective database
- **Form Validation**: Email format, password strength, password confirmation
- **Terms & Conditions**: Required checkbox for signup

### ✅ Enhanced Login System

- **Dual Authentication**:
  - Primary: Supabase Auth (recommended)
  - Fallback: Custom "users" table lookup
- **Cross-database Security**: Users can only login to their designated database

## 🗄️ Database Requirements

Make sure both your Supabase projects have a `users` table with these columns:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔄 User Flow

### Registration:

1. User visits `signup.html` on either subdomain
2. Fills out registration form (email, password, confirm password)
3. System creates account in Supabase Auth
4. System also stores credentials in custom "users" table
5. User redirected to login page

### Login:

1. User visits `index.html` (login page)
2. System tries Supabase Auth first
3. If Supabase Auth fails, tries custom "users" table
4. Successful login redirects to dashboard

## 🌐 Subdomain Behavior

- **`1.upscalingmedia.live`**:

  - Signup → Creates user in database-1
  - Login → Authenticates against database-1 only

- **`2.upscalingmedia.live`**:
  - Signup → Creates user in database-2
  - Login → Authenticates against database-2 only

## 🔒 Security Features

- ✅ **Password Requirements**: Minimum 6 characters
- ✅ **Email Validation**: Proper email format required
- ✅ **Password Confirmation**: Must match during signup
- ✅ **Database Isolation**: No cross-database authentication
- ✅ **Terms Acceptance**: Required for registration

## 📁 New Files Added

- `signup.html` - Registration page
- `signup.js` - Registration functionality
- Updated `index.html` - Link to signup page
- Updated `script.js` - Enhanced login with fallback authentication

## 🚀 Ready to Use

Your authentication system is now complete! Users can:

1. **Register** new accounts via signup page
2. **Login** with existing credentials
3. Access **subdomain-specific databases**
4. View their info on the **dashboard**

Deploy to Vercel and test on your subdomains! 🎉
