# GenCampus OS - AI Creation Operating System for Colleges

A full-stack SaaS application that generates complete marketing campaigns for college events using AI. Built for hackathons and rapid deployment.

## Features

- **AI-Powered Generation**: Uses GPT-4 and DALL-E to create complete marketing kits
- **Complete Campaign Assets**:
  - Instagram poster (DALL-E generated image)
  - Instagram caption with hashtags
  - Professional email invite
  - WhatsApp broadcast message
  - Responsive landing page HTML
- **User Authentication**: Secure login/register with NextAuth
- **Project Management**: Save and view all your campaigns
- **Modern UI**: Dark theme with glassmorphism effects

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, ShadCN UI
- **Backend**: Next.js API Routes, OpenAI API
- **Database**: MongoDB with Mongoose
- **Auth**: NextAuth.js with credentials provider
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (MongoDB Atlas recommended)
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```env
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Generate NEXTAUTH_SECRET with:
```bash
openssl rand -base64 32
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/app
  /api
    /auth          # Authentication endpoints
    /generate      # AI generation endpoint
    /projects      # Project CRUD endpoints
  /dashboard       # User dashboard
  /create          # Campaign creation page
  /project/[id]    # Campaign view page
  /login           # Auth page
/components
  /ui              # Reusable UI components
/lib               # Utilities (OpenAI, MongoDB, utils)
/models            # Mongoose schemas
/types             # TypeScript definitions
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/[...nextauth]` - NextAuth handler

### Projects
- `GET /api/projects` - Get user's projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get specific project

### Generation
- `POST /api/generate` - Generate complete campaign with AI

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://...
OPENAI_API_KEY=sk-proj-...
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_production_secret
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## Usage

1. **Sign Up**: Create an account
2. **Create Campaign**: Click "New Campaign" and fill in event details
3. **Generate**: AI creates all marketing assets in ~30-60 seconds
4. **Download/Copy**: Use the generated assets for your event

## Features in Detail

### AI Generation
- Uses GPT-4 Turbo for text content
- DALL-E 3 for poster generation
- Structured JSON output for consistency
- Error handling and retry logic

### Security
- Password hashing with bcrypt
- JWT-based sessions
- Protected routes with middleware
- Environment variable validation

### UI/UX
- Dark theme with electric blue (#3B82F6) and neon purple (#A855F7)
- Glassmorphism cards
- Responsive design
- Loading states and error handling
- Toast notifications

## Scalability Notes

Future enhancements for production:
- Add Redis caching for API responses
- Implement rate limiting per user
- Add role-based access control
- Create template marketplace
- Add subscription/payment model
- Convert to microservices architecture
- Add analytics and tracking

## Error Handling

- API rate limiting (429) handling
- Graceful fallbacks for AI failures
- User-friendly error messages
- Retry mechanisms

## License

MIT

## Support

For issues or questions, please open a GitHub issue.
