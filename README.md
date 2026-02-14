# 🎨 GenCampus OS

> AI-powered marketing campaign generator for college events. Create complete marketing kits in seconds.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![Groq](https://img.shields.io/badge/Groq-AI-orange?style=flat-square)

## ✨ What It Does

GenCampus OS generates complete marketing campaigns for college events using AI. Input your event details, and get:

- 📸 Instagram poster
- ✍️ Instagram caption with hashtags
- 📧 Professional email invite
- 💬 WhatsApp broadcast message
- 🌐 Complete landing page HTML

All generated in **5-10 seconds** using advanced AI.

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd gencampus-os
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file:

```env
# MongoDB (Get from MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gencampus

# Groq API (Get from https://console.groq.com)
GROQ_API_KEY=gsk_...

# NextAuth (Generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | TailwindCSS + ShadCN UI |
| **Database** | MongoDB + Mongoose |
| **Authentication** | NextAuth.js |
| **AI** | Groq (Llama 3.3 70B) |
| **Deployment** | Vercel |

## 📁 Project Structure

```
gencampus-os/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication
│   │   ├── generate/     # AI generation
│   │   └── projects/     # Project CRUD
│   ├── dashboard/        # User dashboard
│   ├── create/           # Create campaign
│   ├── project/[id]/     # View campaign
│   └── login/            # Auth page
├── components/
│   └── ui/               # Reusable components
├── lib/
│   ├── groq.ts          # Groq AI client
│   ├── mongodb.ts       # Database connection
│   └── auth.ts          # Auth configuration
├── models/
│   ├── User.ts          # User schema
│   └── Project.ts       # Project schema
└── types/               # TypeScript types
```

## 🎯 How to Use

1. **Sign Up** - Create your account
2. **New Campaign** - Click "New Campaign" button
3. **Fill Details** - Enter event name, theme, audience, tone
4. **Generate** - AI creates all assets in seconds
5. **Download/Copy** - Use your marketing materials

## 🔑 Getting API Keys

### MongoDB Atlas (Free)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Replace `<password>` with your database password

### Groq API (Free)
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up for free account
3. Generate API key
4. Copy to `.env` file

## 🚢 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables (same as `.env`)
4. Deploy!

**Important**: Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to your Vercel domain.

## 🎨 Features

### AI-Powered Generation
- Uses Groq's Llama 3.3 70B model
- Optimized prompts for marketing content
- JSON-structured output
- Fast generation (5-10 seconds)

### Clean, Modern UI
- Minimal aesthetic design
- Poppins font family
- Subtle grain texture
- Glass morphism effects
- Smooth animations
- 3D Spline background

### Secure Authentication
- Password hashing with bcrypt
- JWT-based sessions
- Protected routes
- Secure API endpoints

### Project Management
- Save all campaigns
- View generation history
- Status tracking
- Easy asset access

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user |
| POST | `/api/auth/[...nextauth]` | NextAuth handler |
| GET | `/api/projects` | Get user's projects |
| GET | `/api/projects/[id]` | Get specific project |
| POST | `/api/generate` | Generate campaign |

## 🔧 Development

### Install Dependencies
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check connection string format
- Ensure IP whitelist includes your IP (or use 0.0.0.0/0 for all)
- Verify database user password

### Groq API Errors
- Verify API key is correct
- Check rate limits (free tier has limits)
- Ensure `GROQ_API_KEY` is in `.env`

### NextAuth Errors
- Generate new `NEXTAUTH_SECRET` with `openssl rand -base64 32`
- Ensure `NEXTAUTH_URL` matches your domain

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for your hackathons and events!

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Groq](https://groq.com/)
- UI components from [ShadCN UI](https://ui.shadcn.com/)
- 3D elements from [Spline](https://spline.design/)

---

Made with ❤️ for college event organizers
