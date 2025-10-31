# 👤 Dynamic User Profile - Complete Setup

## ✅ What's Been Implemented

Your user profile now **dynamically updates** based on the logged-in user's information!

### Features:
1. ✅ **Dynamic Avatar** - Shows first letter(s) of user's name
2. ✅ **Dynamic Name Display** - Shows actual logged-in user's name
3. ✅ **Dynamic Email Display** - Shows actual user's email
4. ✅ **Auto-Updates** - Changes when user logs in/out
5. ✅ **Works with Both Auth Methods** - Email/password AND GitHub OAuth

---

## 🎨 What Changed

### Before:
```
Avatar: "U" (hardcoded)
Name: "User Name" (hardcoded)
Email: "user@example.com" (hardcoded)
```

### After:
```
Avatar: Shows first letter(s) from actual user's name
Name: Shows actual user's name from login/signup
Email: Shows actual user's email from login/signup
```

---

## 📂 Files Modified

### 1. **Auth Service** (`src/app/services/Auth.js`)
Added event dispatching to notify components when user data changes:

```javascript
// After storing user data
window.dispatchEvent(new Event('userDataUpdated'));
```

**Updated in 3 methods:**
- ✅ `signup()` - Dispatches event after signup
- ✅ `login()` - Dispatches event after login
- ✅ `handleGitHubCallback()` - Dispatches event after GitHub auth

### 2. **Topbar Component** (`src/app/components/ui/Topbar.tsx`)
Dynamic user data with auto-updates:

```typescript
const [userName, setUserName] = useState('User');
const [userEmail, setUserEmail] = useState('');

useEffect(() => {
  const updateUserData = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUserName(user.name || 'User');
      setUserEmail(user.email || '');
    }
  };

  updateUserData();
  window.addEventListener('userDataUpdated', updateUserData);
  
  return () => {
    window.removeEventListener('userDataUpdated', updateUserData);
  };
}, []);
```

**Changes:**
- ✅ Listens for `userDataUpdated` event
- ✅ Updates name and email automatically
- ✅ Shows actual user data in dropdown

### 3. **Dashboard** (`src/app/dashboard/page.tsx`)
Dynamic user data and Avatar:

```typescript
const [userName, setUserName] = useState('User');
const [userEmail, setUserEmail] = useState('');

// Load user data
useEffect(() => {
  const updateUserData = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUserName(user.name || 'User');
      setUserEmail(user.email || '');
    }
  };

  updateUserData();
  window.addEventListener('userDataUpdated', updateUserData);
  
  return () => {
    window.removeEventListener('userDataUpdated', updateUserData);
  };
}, []);
```

**Changes:**
- ✅ Imported Avatar component
- ✅ Replaced hardcoded "U" with `<Avatar name={userName} />`
- ✅ Replaced hardcoded "User Name" with `{userName}`
- ✅ Replaced hardcoded "user@example.com" with `{userEmail}`
- ✅ Listens for user data updates

### 4. **Avatar Component** (`src/app/components/ui/Avatar.tsx`)
Already perfect! No changes needed.

**How it works:**
```typescript
const initials = name.split(' ').map(n => n[0]).join('')
```

**Examples:**
- "John Doe" → "JD"
- "Alice" → "A"
- "Bob Smith Johnson" → "BSJ"

---

## 🎯 How It Works

### Login/Signup Flow:

```
User logs in or signs up
    ↓
Backend returns user data: { name, email, ... }
    ↓
Auth service stores in localStorage
    ↓
Auth service dispatches 'userDataUpdated' event
    ↓
Components listening to event update their state
    ↓
UI shows actual user name and email
    ↓
Avatar shows user's initials
```

### Example Scenarios:

#### **Email/Password Login:**
```javascript
// User logs in with:
Email: "john.doe@example.com"
Password: "password123"

// Backend responds:
{
  token: "jwt_token",
  user: {
    name: "John Doe",
    email: "john.doe@example.com"
  }
}

// UI Updates:
Avatar: Shows "JD"
Name: "John Doe"
Email: "john.doe@example.com"
```

#### **GitHub OAuth:**
```javascript
// User authenticates with GitHub

// Backend responds:
{
  token: "jwt_token",
  user: {
    name: "Alice Smith",
    email: "alice@github.com",
    githubId: "12345"
  }
}

// UI Updates:
Avatar: Shows "AS"
Name: "Alice Smith"
Email: "alice@github.com"
```

---

## 🔍 Visual Examples

### Dashboard Header (Desktop):

**Before:**
```
┌──────────────────────────────┐
│ Dashboard    🔔  [U ▼]       │
└──────────────────────────────┘
```

**After:**
```
┌──────────────────────────────┐
│ Dashboard    🔔  [JD ▼]      │  ← Shows user's initials
└──────────────────────────────┘
```

### User Dropdown:

**Before:**
```
┌──────────────┐
│ User Name    │  ← Hardcoded
│ user@ex.com  │  ← Hardcoded
├──────────────┤
│ 🚪 Logout    │
└──────────────┘
```

**After:**
```
┌──────────────────┐
│ John Doe         │  ← From user data
│ john@example.com │  ← From user data
├──────────────────┤
│ 🚪 Logout        │
└──────────────────┘
```

### Topbar Dropdown:

**Before:**
```
┌──────────────┐
│ User         │  ← Generic
│ No email     │
├──────────────┤
│ 🚪 Logout    │
└──────────────┘
```

**After:**
```
┌──────────────────┐
│ Alice Smith      │  ← GitHub user
│ alice@github.com │  ← GitHub email
├──────────────────┤
│ 🚪 Logout        │
└──────────────────┘
```

---

## 🧪 Testing Guide

### Test 1: Email/Password Signup
1. Go to `/signup`
2. Fill in:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "test123"
3. Click "Sign Up"
4. **Check Dashboard:**
   - Avatar should show: "TU"
   - Dropdown should show: "Test User"
   - Email should show: "test@example.com"

### Test 2: Email/Password Login
1. Go to `/login`
2. Enter credentials
3. Click "Login"
4. **Check Dashboard:**
   - Avatar shows your initials
   - Name shows correctly
   - Email shows correctly

### Test 3: GitHub OAuth
1. Go to `/login`
2. Click "Continue with GitHub"
3. Authorize on GitHub
4. **Check Dashboard:**
   - Avatar shows GitHub name initials
   - Name shows GitHub username
   - Email shows GitHub email

### Test 4: User Data Persistence
1. Login
2. Refresh page
3. **Expected:** User data still shows (from localStorage)
4. Logout
5. **Expected:** Data clears, returns to homepage

---

## 💾 Data Storage

User data is stored in `localStorage`:

```javascript
// Stored after login/signup:
localStorage.setItem('user', JSON.stringify({
  name: "John Doe",
  email: "john@example.com",
  id: "user_id",
  // ... other user fields
}));

// Retrieved by components:
const user = AuthService.getCurrentUser();
console.log(user.name);  // "John Doe"
console.log(user.email); // "john@example.com"
```

---

## 🎨 Avatar Color

The avatar uses Tailwind's `bg-indigo-500`:

```typescript
<div className="rounded-full bg-indigo-500 text-white ...">
  {initials}
</div>
```

**To customize color:**
```typescript
// In Avatar.tsx, change:
bg-indigo-500  // Current (Purple/Blue)

// To:
bg-blue-500    // Blue
bg-green-500   // Green
bg-purple-500  // Purple
bg-pink-500    // Pink
bg-red-500     // Red
```

---

## 🔄 Event System

### Custom Event: `userDataUpdated`

**When it fires:**
- After successful signup
- After successful login
- After GitHub OAuth callback

**Who listens:**
- Topbar component
- Dashboard component
- Any component that calls `AuthService.getCurrentUser()`

**How to use in other components:**

```typescript
useEffect(() => {
  const updateUserData = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUserName(user.name);
      setUserEmail(user.email);
    }
  };

  updateUserData(); // Initial load
  window.addEventListener('userDataUpdated', updateUserData);

  return () => {
    window.removeEventListener('userDataUpdated', updateUserData);
  };
}, []);
```

---

## 🛠️ Troubleshooting

### Issue: Avatar still shows "U"
**Solution:** Make sure user has a `name` field in backend response

### Issue: Name shows "User"
**Solution:** Check localStorage: `localStorage.getItem('user')`
- Should contain user data
- Check backend is returning `user.name`

### Issue: Email shows "No email"
**Solution:** Backend should return `user.email` field

### Issue: Data doesn't update after login
**Solution:** 
- Check browser console for `userDataUpdated` event
- Verify Auth service is dispatching the event
- Restart dev server

---

## 📋 Backend Requirements

Your backend should return this structure:

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "User Name",        // Required for avatar & display
    "email": "user@example.com", // Required for display
    "githubId": "optional",
    "avatar": "optional_url"
  }
}
```

**Required fields:**
- ✅ `name` - Used for avatar initials and display
- ✅ `email` - Used for email display

---

## ✨ Summary

| Feature | Before | After |
|---------|--------|-------|
| Avatar | Hardcoded "U" | Dynamic initials |
| Name in Topbar | "User" | Actual name |
| Name in Dashboard | "User Name" | Actual name |
| Email in Topbar | Empty/hardcoded | Actual email |
| Email in Dashboard | "user@example.com" | Actual email |
| Updates on login | ❌ No | ✅ Yes |
| Updates on signup | ❌ No | ✅ Yes |
| Updates on GitHub | ❌ No | ✅ Yes |
| Persists on refresh | ❌ No | ✅ Yes |

---

**Your user profile is now fully dynamic and updates automatically!** 🎉

Just make sure your backend returns `name` and `email` in the user object, and everything will work perfectly!


