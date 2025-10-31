# 🚀 Quick Start - Authentication Testing

## ✅ Your Setup is Complete!

### Backend Configuration
- **Backend URL:** `https://codepods-backend.onrender.com`
- **Signup Endpoint:** `https://codepods-backend.onrender.com/api/users/signup`
- **Login Endpoint:** `https://codepods-backend.onrender.com/api/users/login`

### Frontend Configuration
- **Running on:** Port 3002
- **Signup Page:** `http://localhost:3002/signup`
- **Login Page:** `http://localhost:3002/login`
- **Dashboard:** `http://localhost:3002/dashboard`

---

## 🎯 How to Test

### Step 1: Start Your Dev Server

```bash
npm run dev
```

### Step 2: Test Signup

1. Open browser: `http://localhost:3002/signup`
2. Fill in the form:
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Password:** password123
3. Click **Sign Up**
4. **Expected Result:**
   - ✅ Green success message: "Account created successfully! Redirecting..."
   - ✅ Automatically redirects to `/dashboard` after 1 second
   - ✅ Token & user data saved to localStorage

### Step 3: Test Login

1. Open browser: `http://localhost:3002/login`
2. Use same credentials from signup:
   - **Email:** john@example.com
   - **Password:** password123
3. Click **Login**
4. **Expected Result:**
   - ✅ Green success message: "Login successful! Redirecting..."
   - ✅ Automatically redirects to `/dashboard` after 1 second
   - ✅ Token & user data saved to localStorage

---

## 🔍 Debugging

### Open Browser Console (F12)

You should see:

**On Signup:**
```
🔗 Backend URL: https://codepods-backend.onrender.com
Sending signup request to: https://codepods-backend.onrender.com/api/users/signup
Signup data: {email: "john@example.com", password: "password123", name: "John Doe"}
✅ Token saved to localStorage
✅ User data saved: {id: "...", email: "john@example.com", name: "John Doe"}
✅ Signup successful: {token: "...", user: {...}}
```

**On Login:**
```
🔗 Backend URL: https://codepods-backend.onrender.com
Sending login request to: https://codepods-backend.onrender.com/api/users/login
Login data: {email: "john@example.com"}
✅ Token saved to localStorage
✅ User data saved: {id: "...", email: "john@example.com", name: "John Doe"}
✅ Login successful: {token: "...", user: {...}}
```

### Check localStorage

In browser console, type:
```javascript
localStorage.getItem('token')      // Should show JWT token
localStorage.getItem('user')       // Should show user data JSON
```

---

## 🆕 Enhanced Features

### 1. **Automatic Token Headers**
- All API requests now automatically include `Authorization: Bearer <token>` header
- No need to manually add token to requests

### 2. **User Data Storage**
- User data is saved to localStorage on login/signup
- Access it with: `AuthService.getCurrentUser()`

### 3. **Better Error Handling**
- Network errors: "Cannot connect to server..."
- Server errors: Shows specific backend error message
- Generic errors: "Signup/Login failed. Please try again."

### 4. **Success Feedback**
- Green success message on successful auth
- Auto-redirect to dashboard after 1 second
- Console logs for debugging

---

## 🛠️ Using Auth in Your App

### Check if User is Logged In

```javascript
import AuthService from '@/app/services/Auth';

if (AuthService.isAuthenticated()) {
  console.log('User is logged in!');
  const user = AuthService.getCurrentUser();
  console.log('User:', user);
}
```

### Get Current User

```javascript
const user = AuthService.getCurrentUser();
console.log(user.name);  // "John Doe"
console.log(user.email); // "john@example.com"
```

### Logout

```javascript
AuthService.logout();  // Clears token and user data
```

### Protected Routes (Example)

```javascript
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '@/app/services/Auth';

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      router.push('/login');
    }
  }, []);

  return <div>Protected Content</div>;
}
```

---

## 🚨 Common Issues & Solutions

### Issue: "Cannot connect to server"
**Solution:**
- Check if backend is running on Render
- Verify `.env.local` has correct URL
- Check backend CORS settings (should allow `http://localhost:3002`)

### Issue: "CORS Error"
**Solution:** Your backend needs to allow requests from `http://localhost:3002`

**Backend Fix (Node.js/Express):**
```javascript
app.use(cors({
  origin: ['http://localhost:3002', 'http://localhost:3000'],
  credentials: true
}));
```

### Issue: 404 Error
**Solution:**
- Verify endpoints exist: `/api/users/signup` and `/api/users/login`
- Check backend logs on Render

### Issue: Token not saved
**Solution:**
- Check browser console for errors
- Make sure backend returns `{ token: "...", user: {...} }`

---

## ✅ What's Been Set Up

- ✅ Auth Service with signup/login/logout
- ✅ Automatic token management
- ✅ User data storage
- ✅ Axios interceptor for automatic auth headers
- ✅ Error handling with user-friendly messages
- ✅ Success feedback and auto-redirect
- ✅ Console logging for debugging
- ✅ Connected to Render backend

---

## 🎉 You're Ready!

Just run `npm run dev` and test at:
- Signup: `http://localhost:3002/signup`
- Login: `http://localhost:3002/login`

**Everything is configured and ready to go!** 🚀


