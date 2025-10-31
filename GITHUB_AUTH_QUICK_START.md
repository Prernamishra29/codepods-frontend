# 🚀 GitHub OAuth - Quick Start

## ⚡ Setup in 3 Steps

### 1. Create GitHub OAuth App
Go to: https://github.com/settings/developers

Click **"New OAuth App"** and enter:
```
Application name: CodePods
Homepage URL: http://localhost:3002
Callback URL: http://localhost:3002/auth/github/callback
```

Copy your **Client ID**

### 2. Update `.env.local`
```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=paste_your_client_id_here
```

### 3. Restart Server
```bash
npm run dev
```

---

## 🎯 What Works Now

### ✅ Login Page
- **"Continue with GitHub"** button at top
- Redirects to GitHub OAuth
- Returns to dashboard after auth

### ✅ Signup Page
- **"Continue with GitHub"** button at top
- Same flow as login

### ✅ Join Pod
- Requires GitHub authentication
- Prompts user to authenticate if not already
- Saves current page and returns after auth

### ✅ Create Pod
- Use `<CreatePodModal />` component
- Shows GitHub auth requirement if not authenticated
- Allows creation after GitHub auth

---

## 📋 Backend Endpoint Needed

### `POST /api/users/auth/github`

**Receives:**
```json
{
  "code": "github_oauth_code"
}
```

**Returns:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "githubId": "github_user_id"
  }
}
```

**Backend should:**
1. Exchange code for GitHub access token
2. Fetch user data from GitHub API
3. Create/update user in database
4. Return JWT token

---

## 🔍 Test It

1. **Login:** `http://localhost:3002/login` → Click GitHub button
2. **Check console:** See OAuth logs
3. **Check localStorage:** `localStorage.getItem('githubAuthenticated')`
4. **Join pod:** Try joining a pod (should work without prompt)

---

## 📚 Full Documentation

See **`GITHUB_AUTH_SETUP.md`** for:
- Detailed backend implementation
- Security considerations
- Production deployment
- Troubleshooting

---

**That's it! Your GitHub OAuth is ready to test!** 🎉


