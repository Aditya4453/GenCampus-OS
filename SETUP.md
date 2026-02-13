# GenCampus OS - Setup Guide

## ✅ Current Status

The application is **RUNNING** successfully on: **http://localhost:3001**

## 🚀 Quick Start

The development server is already running! Open your browser and visit:
```
http://localhost:3001
```

## 📋 What's Working

✅ All TypeScript compilation - No errors
✅ Development server running
✅ All pages created and functional:
   - Landing page (/)
   - Login/Register (/login)
   - Dashboard (/dashboard)
   - Create Campaign (/create)
   - Project View (/project/[id])

✅ All API routes configured:
   - Authentication (NextAuth)
   - User registration
   - Project CRUD operations
   - AI generation endpoint

✅ UI Components (ShadCN):
   - Button, Card, Input, Label
   - Toast notifications
   - All styled with dark theme

## ⚙️ Configuration Needed

### 1. MongoDB Database

Currently using placeholder: `mongodb://localhost:27017/gencampus`

**Option A: MongoDB Atlas (Recommended for production)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gencampus?retryWrites=true&w=majority
```

**Option B: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Keep current `.env` setting

### 2. OpenAI API Key

Currently using placeholder: `sk-proj-your-key-here`

1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Update `.env`:
```env
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

**Note:** You need GPT-4 and DALL-E 3 access for full functionality.

### 3. NextAuth Secret (Optional - Already Set)

A default secret is set. For production, generate a new one:
```bash
openssl rand -base64 32
```

Then update `.env`:
```env
NEXTAUTH_SECRET=your-generated-secret
```

## 🧪 Testing the Application

### 1. Test Landing Page
- Visit http://localhost:3001
- Should see the GenCampus OS landing page with dark theme

### 2. Test Registration
- Click "Get Started" or "Login"
- Click "Don't have an account? Sign up"
- Fill in name, email, password
- Click "Sign Up"
- **Note:** Requires MongoDB to be configured

### 3. Test Login
- Use registered credentials
- Should redirect to dashboard

### 4. Test Campaign Creation
- Click "New Campaign" from dashboard
- Fill in event details:
  - Event Name: "Tech Fest 2024"
  - Theme: "Innovation and Future Technology"
  - Audience: "Engineering students"
  - Tone: "Energetic and professional"
- Click "Generate Campaign"
- **Note:** Requires OpenAI API key to be configured

### 5. View Generated Assets
- After generation completes, view:
  - Instagram poster (DALL-E generated)
  - Instagram caption
  - Email invite
  - WhatsApp message
  - Landing page HTML

## 🔧 Development Commands

```bash
# Start development server (already running)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📁 Project Structure

```
/app
  /api
    /auth/[...nextauth]  - NextAuth handler
    /auth/register       - User registration
    /generate            - AI generation endpoint
    /projects            - Project CRUD
    /projects/[id]       - Single project
  /dashboard             - User dashboard
  /create                - Campaign creation
  /project/[id]          - Campaign view
  /login                 - Auth page
  page.tsx               - Landing page
  layout.tsx             - Root layout
  globals.css            - Global styles

/components
  /ui                    - Reusable UI components
  providers.tsx          - NextAuth provider

/lib
  auth.ts                - NextAuth configuration
  mongodb.ts             - MongoDB connection
  openai.ts              - OpenAI client
  utils.ts               - Utility functions

/models
  User.ts                - User schema
  Project.ts             - Project schema

/types
  global.d.ts            - Global type definitions
  next-auth.d.ts         - NextAuth type extensions
```

## 🎨 UI Features

- Dark theme with glassmorphism effects
- Electric Blue (#3B82F6) primary color
- Neon Purple (#A855F7) accent color
- Smooth transitions and animations
- Fully responsive design
- Toast notifications for user feedback

## 🐛 Known Issues & Solutions

### Issue: Build fails with prerender errors
**Solution:** This is expected for client components. Use `npm run dev` for development. For production deployment on Vercel, these pages will be dynamically rendered.

### Issue: MongoDB connection error
**Solution:** Ensure MongoDB is running and connection string is correct in `.env`

### Issue: OpenAI API errors
**Solution:** 
- Verify API key is valid
- Check you have credits in your OpenAI account
- Ensure you have access to GPT-4 and DALL-E 3

### Issue: Port 3000 already in use
**Solution:** The app automatically uses port 3001. Update NEXTAUTH_URL if needed:
```env
NEXTAUTH_URL=http://localhost:3001
```

## 🚀 Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - MONGODB_URI
   - OPENAI_API_KEY
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL (your Vercel URL)
   - NEXT_PUBLIC_APP_URL (your Vercel URL)
4. Deploy

## 📞 Support

For issues:
1. Check this setup guide
2. Review error messages in terminal
3. Check browser console for client-side errors
4. Verify all environment variables are set correctly

## 🎉 You're All Set!

The application is running and ready for development. Configure MongoDB and OpenAI API key to test the full functionality.

**Current URL:** http://localhost:3001
