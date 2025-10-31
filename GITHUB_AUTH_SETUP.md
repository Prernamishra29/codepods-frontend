# 🔐 GitHub OAuth Authentication Setup Guide

## ✅ What's Been Implemented

Your CodePods app now has **complete GitHub OAuth authentication** integrated!

### Features:
1. ✅ **Login with GitHub** - Users can sign in using their GitHub account
2. ✅ **Signup with GitHub** - New users can create accounts via GitHub
3. ✅ **GitHub Auth for Pods** - Joining/creating pods requires GitHub authentication
4. ✅ **OAuth Callback Handler** - Handles GitHub redirect after authentication
5. ✅ **Seamless Integration** - Works alongside email/password authentication

---

## 🔧 Backend Requirements

Your backend needs to implement the GitHub OAuth flow endpoint:

### Endpoint: `/api/users/auth/github`

**Method:** `POST`

**Request Body:**
```json
{
  "code": "github_oauth_code_from_callback"
}
```

**Expected Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "githubId": "github_user_id",
    "avatar": "github_avatar_url"
  }
}
```

### Backend Implementation Steps:

1. **Receive the OAuth code** from frontend
2. **Exchange code for access token** with GitHub:
   ```
   POST https://github.com/login/oauth/access_token
   {
     "client_id": "your_github_client_id",
     "client_secret": "your_github_client_secret",
     "code": "code_from_frontend"
   }
   ```
3. **Get user data from GitHub**:
   ```
   GET https://api.github.com/user
   Headers: { Authorization: "Bearer github_access_token" }
   ```
4. **Create or update user** in your database
5. **Generate JWT token** for your app
6. **Return token and user data** to frontend

---

## 🚀 Setup Instructions

### Step 1: Create GitHub OAuth App

1. Go to **GitHub Settings** → **Developer Settings** → **OAuth Apps** → **New OAuth App**
   - Or visit: https://github.com/settings/developers

2. Fill in the details:
   ```
   Application name: CodePods
   Homepage URL: http://localhost:3002
   Authorization callback URL: http://localhost:3002/auth/github/callback
   ```

3. Click **Register Application**

4. **Copy your Client ID** (you'll see it immediately)

5. Click **Generate a new client secret** and **copy the secret**

### Step 2: Update Environment Variables

Edit `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=https://codepods-backend.onrender.com
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_actual_github_client_id_here
```

**Replace** `your_actual_github_client_id_here` with the Client ID from Step 1.

### Step 3: Add Client Secret to Backend

Add to your **backend** environment variables:
```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

⚠️ **NEVER** put the client secret in frontend code!

### Step 4: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## 🎯 How It Works

### Login/Signup Flow with GitHub:

```
User clicks "Continue with GitHub"
    ↓
Redirects to: https://github.com/login/oauth/authorize
    ↓
User authorizes on GitHub
    ↓
GitHub redirects to: http://localhost:3002/auth/github/callback?code=...
    ↓
Frontend sends code to backend: POST /api/users/auth/github
    ↓
Backend exchanges code for GitHub access token
    ↓
Backend fetches user data from GitHub API
    ↓
Backend creates/updates user in database
    ↓
Backend returns JWT token + user data
    ↓
Frontend stores token & user data in localStorage
    ↓
Redirects to dashboard
```

### Join/Create Pod with GitHub Auth:

```
User clicks "Join Pod" or "Create Pod"
    ↓
Check: Is user GitHub authenticated?
    ↓
NO → Show prompt: "Authenticate with GitHub?"
    ↓
User clicks "Yes"
    ↓
Redirects to GitHub OAuth (saves current page)
    ↓
After GitHub auth completes
    ↓
Returns to original page
    ↓
User can now join/create pod
```

---

## 📂 Files Created/Modified

### ✅ New Files:

1. **`src/app/auth/github/callback/page.tsx`** - GitHub OAuth callback handler
2. **`src/app/components/ui/CreatePodModal.tsx`** - Pod creation modal with GitHub auth check

### ✅ Modified Files:

1. **`src/app/services/Auth.js`** - Added GitHub OAuth methods
2. **`src/app/login/page.tsx`** - Added "Continue with GitHub" button
3. **`src/app/signup/page.tsx`** - Added "Continue with GitHub" button
4. **`src/app/dashboard/page.tsx`** - Added GitHub auth check for joining pods
5. **`.env.local`** - Added GitHub Client ID

---

## 🎨 UI Changes

### Login Page:
```
┌─────────────────────────────┐
│   Login to CodePods         │
│                             │
│  [🔗 Continue with GitHub]  │  ← NEW!
│                             │
│  ────────── OR ──────────── │
│                             │
│  Email: [_______________]   │
│  Password: [___________]    │
│  [Login]                    │
└─────────────────────────────┘
```

### Signup Page:
```
┌─────────────────────────────┐
│   Create an Account         │
│                             │
│  [🔗 Continue with GitHub]  │  ← NEW!
│                             │
│  ────────── OR ──────────── │
│                             │
│  Name: [_______________]    │
│  Email: [______________]    │
│  Password: [___________]    │
│  [Sign Up]                  │
└─────────────────────────────┘
```

### Join Pod (Not GitHub Authenticated):
```
User clicks "Join Pod"
    ↓
Alert: "You need to authenticate with 
        GitHub to join pods. 
        Continue with GitHub?"
    ↓
[OK] → Redirects to GitHub OAuth
[Cancel] → Returns to dashboard
```

---

## 🔍 Testing Guide

### Test 1: GitHub Login

1. Go to `http://localhost:3002/login`
2. Click **"Continue with GitHub"**
3. **Expected:** Redirects to GitHub
4. Authorize the app on GitHub
5. **Expected:** Returns to callback page with loading spinner
6. **Expected:** Redirects to dashboard
7. **Check console:** Should see GitHub user data logged
8. **Check localStorage:**
   ```javascript
   localStorage.getItem('githubAuthenticated') // "true"
   localStorage.getItem('token') // JWT token
   localStorage.getItem('user') // User data
   ```

### Test 2: GitHub Signup

1. Go to `http://localhost:3002/signup`
2. Click **"Continue with GitHub"**
3. Same flow as Test 1

### Test 3: Join Pod (Without GitHub Auth)

1. Login with email/password (NOT GitHub)
2. Go to dashboard
3. Try to join a pod
4. **Expected:** Alert asking to authenticate with GitHub
5. Click OK
6. **Expected:** Redirects to GitHub OAuth
7. Complete auth
8. **Expected:** Returns to dashboard
9. Try joining pod again
10. **Expected:** Successfully joins pod

### Test 4: Join Pod (With GitHub Auth)

1. Login with GitHub
2. Go to dashboard
3. Try to join a pod
4. **Expected:** Directly joins pod (no prompt)

---

## 🛠️ Auth Service Methods

### Available Methods:

```javascript
import AuthService from '@/app/services/Auth';

// GitHub OAuth
AuthService.loginWithGitHub()              // Redirect to GitHub OAuth
AuthService.handleGitHubCallback(code)     // Handle OAuth callback
AuthService.isGitHubAuthenticated()        // Check if GitHub auth

// Regular Auth
AuthService.login(credentials)             // Email/password login
AuthService.signup(userData)               // Email/password signup
AuthService.logout()                       // Logout and clear data

// User Data
AuthService.getCurrentUser()               // Get logged-in user
AuthService.getToken()                     // Get JWT token
AuthService.isAuthenticated()              // Check if logged in
```

---

## 🔐 Security Notes

1. **Client Secret:** NEVER expose in frontend code
2. **Token Storage:** Stored in localStorage (consider httpOnly cookies for production)
3. **HTTPS:** Use HTTPS in production for OAuth
4. **Scope:** Currently requests `read:user user:email` from GitHub
5. **Redirect URI:** Must match exactly in GitHub app settings

---

## 🌐 Production Setup

When deploying to production:

1. **Update GitHub OAuth App:**
   - Homepage URL: `https://yourdomain.com`
   - Callback URL: `https://yourdomain.com/auth/github/callback`

2. **Update Environment Variables:**
   ```env
   NEXT_PUBLIC_BACKEND_URL=https://your-backend.com
   NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
   ```

3. **Backend Environment:**
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ALLOWED_ORIGINS=https://yourdomain.com
   ```

---

## 📝 Example: Using Create Pod Modal

```jsx
import CreatePodModal from '@/app/components/ui/CreatePodModal';

function MyComponent() {
  const [showModal, setShowModal] = useState(false);

  const handleCreatePod = (podData) => {
    console.log('Creating pod:', podData);
    // Send to backend API
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Create Pod
      </button>

      <CreatePodModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreatePod={handleCreatePod}
      />
    </>
  );
}
```

---

## 🎉 Summary

Your authentication system now supports:

✅ Email/Password Login & Signup  
✅ GitHub OAuth Login & Signup  
✅ GitHub Auth Requirement for Pods  
✅ Seamless OAuth Callback Handling  
✅ Token & User Data Management  
✅ Logout Functionality  

**Next steps:**
1. Get your GitHub Client ID and update `.env.local`
2. Implement backend GitHub OAuth endpoint
3. Restart dev server
4. Test the flow!

---

**Questions? Issues?** Check the browser console for detailed logs! 🚀


