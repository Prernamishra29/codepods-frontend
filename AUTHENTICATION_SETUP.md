# 🔐 Authentication Setup Guide

## ✅ What's Been Configured

### 1. **Auth Service** (`src/app/services/Auth.js`)
- ✓ Signup endpoint: `/api/users/signup`
- ✓ Login endpoint: `/api/users/login`
- ✓ Automatic token storage in localStorage
- ✓ Error handling and logging
- ✓ Backend URL configuration

### 2. **Signup Page** (`src/app/signup/page.tsx`)
- ✓ Form validation
- ✓ Success/error messages
- ✓ Loading states
- ✓ Auto-redirect to dashboard on success
- ✓ Sends data in format: `{ email, password, name }`

### 3. **Login Page** (`src/app/login/page.tsx`)
- ✓ Form validation
- ✓ Success/error messages
- ✓ Loading states
- ✓ Auto-redirect to dashboard on success
- ✓ Sends data in format: `{ email, password }`

## 🚀 Setup Instructions

### Step 1: Update Backend URL

Edit `.env.local` file and replace with your **actual Render backend URL**:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

**Example:**
```env
NEXT_PUBLIC_BACKEND_URL=https://codepods-backend.onrender.com
```

⚠️ **Important:** Do NOT include `/api` at the end - it's already in the code!

### Step 2: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 3: Test Your Integration

1. Go to `http://localhost:3000/signup`
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: mypassword123
3. Click "Sign Up"
4. Check browser console for logs

## 📡 API Endpoints

Your frontend will call these endpoints on your Render backend:

### Signup
- **URL:** `https://your-backend.onrender.com/api/users/signup`
- **Method:** POST
- **Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "mypassword123",
    "name": "Test User"
  }
  ```
- **Expected Response:**
  ```json
  {
    "token": "jwt_token_here",
    "user": { ... }
  }
  ```

### Login
- **URL:** `https://your-backend.onrender.com/api/users/login`
- **Method:** POST
- **Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "mypassword123"
  }
  ```
- **Expected Response:**
  ```json
  {
    "token": "jwt_token_here",
    "user": { ... }
  }
  ```

## 🔍 Debugging

### Check Browser Console

When you submit the form, you'll see:
```
🔗 Backend URL: https://your-backend.onrender.com
Sending signup request to: https://your-backend.onrender.com/api/users/signup
Signup data: { email: "...", password: "...", name: "..." }
✅ Signup successful: { token: "...", user: {...} }
```

### Common Issues

1. **"Cannot connect to server"**
   - Check if your Render backend is running
   - Verify the URL in `.env.local` is correct
   - Make sure you restarted the dev server

2. **CORS errors**
   - Your backend needs to allow requests from `http://localhost:3000`
   - Add CORS headers in your backend

3. **404 errors**
   - Verify endpoints exist on your backend: `/api/users/signup` and `/api/users/login`
   - Check backend logs on Render

## ✨ Success Flow

1. User fills form → clicks submit
2. Button shows loading state ("Signing up..." or "Logging in...")
3. API request sent to Render backend
4. On success:
   - Green success message appears
   - JWT token saved to localStorage
   - Redirects to `/dashboard` after 1 second
5. On error:
   - Red error message appears with specific error
   - User can try again

## 🛠️ Next Steps

After testing signup/login:
- [ ] Add logout functionality to header/sidebar
- [ ] Protect dashboard routes (redirect if not authenticated)
- [ ] Add token refresh logic
- [ ] Store user data in context/state management

## 📝 Environment Variables

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

**Note:** Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

**Ready to test!** 🎉

Just update your Render URL in `.env.local` and restart the server.



