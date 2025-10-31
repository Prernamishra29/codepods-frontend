# 🚪 Logout Functionality - Complete Setup

## ✅ What's Been Added

### 1. **Sidebar Logout Button** (`src/app/components/ui/Sidebar.tsx`)
- ✅ Red logout button at the bottom of sidebar
- ✅ Icon: Sign out icon
- ✅ Clears token and user data
- ✅ Redirects to homepage (`/`)

### 2. **Topbar User Dropdown** (`src/app/components/ui/Topbar.tsx`)
- ✅ Click on avatar to open dropdown menu
- ✅ Shows user name and email
- ✅ Logout option in dropdown
- ✅ Click outside to close dropdown
- ✅ Redirects to homepage after logout

### 3. **Auth Service Enhanced**
- ✅ `logout()` - Clears token and user data
- ✅ Console log on logout: "🚪 User logged out"

---

## 🎯 How It Works

### Logout Flow:

1. **User clicks logout** (from Sidebar or Topbar dropdown)
2. **Auth service clears data:**
   - Removes JWT token from localStorage
   - Removes user data from localStorage
   - Logs "🚪 User logged out" to console
3. **Redirect to homepage:**
   - User is sent to `/` (landing page)
   - Landing page shows Login/Signup options

---

## 📍 Logout Locations

### Sidebar (Desktop)
```
┌─────────────────┐
│   CodePods      │
│                 │
│ 📊 Dashboard    │
│ 👥 My Pods      │
│ ➕ Create Pod   │
│ 🏆 Rewards      │
│ 👤 Profile      │
│                 │
│                 │
│ [🚪 Logout]     │ ← Red button at bottom
└─────────────────┘
```

### Topbar Dropdown (All screens)
```
┌──────────────────────────────┐
│ Dashboard    🔔  [Avatar] ▼  │
└──────────────────────────────┘
                      │
        ┌─────────────▼──────────┐
        │  John Doe              │
        │  john@example.com      │
        ├────────────────────────┤
        │  🚪 Logout             │
        └────────────────────────┘
```

---

## 💻 Code Examples

### How Logout is Implemented:

```javascript
const handleLogout = () => {
  AuthService.logout();     // Clear localStorage
  router.push('/');         // Redirect to homepage
};
```

### Use Logout Anywhere in Your App:

```javascript
'use client';

import { useRouter } from 'next/navigation';
import AuthService from '@/app/services/Auth';

function MyComponent() {
  const router = useRouter();

  const handleLogout = () => {
    AuthService.logout();
    router.push('/');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
```

---

## 🎨 UI Features

### Sidebar Logout Button:
- **Color:** Red with transparency
- **Hover:** Solid red background
- **Position:** Bottom of sidebar
- **Border:** Red border
- **Icon:** Sign out icon

### Topbar Dropdown:
- **Trigger:** Click on avatar
- **Shows:** User name and email
- **Close:** Click outside or click logout
- **Hover:** Subtle red highlight on logout option

---

## 🔍 What Happens After Logout

1. **localStorage cleared:**
   ```javascript
   localStorage.getItem('token')  // null
   localStorage.getItem('user')   // null
   ```

2. **User lands on homepage** (`/`)
   - Can see Login and Sign Up buttons
   - Can browse featured pods
   - Can't access protected routes

3. **Protected routes redirect to login:**
   - If user tries to access `/dashboard` without token
   - Should redirect to `/login` (if you add route protection)

---

## 🛡️ Next Steps - Route Protection (Optional)

To protect routes after logout, you can add this to protected pages:

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
  }, [router]);

  return (
    <div>
      {/* Your protected content */}
    </div>
  );
}
```

---

## ✨ Features Summary

| Feature | Sidebar | Topbar |
|---------|---------|--------|
| Logout Button | ✅ Bottom | ✅ Dropdown |
| Shows User Name | ❌ | ✅ |
| Shows User Email | ❌ | ✅ |
| Click Outside to Close | N/A | ✅ |
| Visual Feedback | Red button | Red text |
| Redirect to Homepage | ✅ | ✅ |

---

## 🎉 Ready to Test!

1. **Login to your account**
2. **Go to dashboard** - You'll see both logout options
3. **Click logout** from either:
   - Sidebar bottom button
   - Topbar avatar dropdown
4. **Verify:**
   - You're redirected to homepage
   - Console shows "🚪 User logged out"
   - localStorage is cleared

---

## 🔧 Customization

### Change Redirect URL:

In `Sidebar.tsx` or `Topbar.tsx`, change:
```javascript
router.push('/');  // Change '/' to any route
```

### Add Confirmation Dialog:

```javascript
const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    AuthService.logout();
    router.push('/');
  }
};
```

### Add Loading State:

```javascript
const [isLoggingOut, setIsLoggingOut] = useState(false);

const handleLogout = async () => {
  setIsLoggingOut(true);
  await new Promise(resolve => setTimeout(resolve, 500)); // Optional delay
  AuthService.logout();
  router.push('/');
};
```

---

**Your logout functionality is complete and ready to use!** 🎉


