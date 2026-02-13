# Sample Data for Testing GenCampus OS

## Test User Credentials

After setting up MongoDB, you can register with these sample credentials:

```
Name: John Doe
Email: john@college.edu
Password: Test123456
```

## Sample Campaign Data

### Campaign 1: Tech Fest
```
Event Name: Tech Fest 2024
Theme: Innovation and Future Technology
Audience: Engineering students and tech enthusiasts
Tone: Energetic and professional
```

### Campaign 2: Cultural Night
```
Event Name: Cultural Extravaganza
Theme: Celebrating Diversity and Unity
Audience: All college students
Tone: Vibrant and inclusive
```

### Campaign 3: Hackathon
```
Event Name: Code Sprint 48
Theme: Build the Future in 48 Hours
Audience: Computer science students and developers
Tone: Competitive and exciting
```

### Campaign 4: Sports Meet
```
Event Name: Annual Sports Championship
Theme: Strength, Speed, and Spirit
Audience: Athletes and sports enthusiasts
Tone: Motivational and energetic
```

### Campaign 5: Workshop
```
Event Name: AI & Machine Learning Workshop
Theme: Hands-on Learning with Industry Experts
Audience: Students interested in AI/ML
Tone: Educational and inspiring
```

## Expected AI Output Format

When you create a campaign, the AI will generate:

### 1. Poster Prompt (for DALL-E)
Example:
```
Create a vibrant, modern Instagram poster for Tech Fest 2024. 
Use electric blue and neon purple gradient background. 
Include futuristic tech elements like circuit boards, holograms, and digital interfaces.
Bold typography for "TECH FEST 2024" at the center.
Add date, time, and venue at the bottom.
Style: Modern, energetic, tech-focused.
```

### 2. Instagram Caption
Example:
```
🚀 TECH FEST 2024 is HERE! 🚀

Get ready for the most innovative tech event of the year! 
Join us for:
✨ Cutting-edge tech demos
💡 Industry expert talks
🎮 Gaming tournaments
🏆 Amazing prizes

📅 March 15-17, 2024
📍 Main Auditorium
🎟️ Register now!

#TechFest2024 #Innovation #Technology #CollegeEvent #TechLovers #FutureTech
```

### 3. Email Invite
Example:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .header { background: linear-gradient(135deg, #3B82F6, #A855F7); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .cta { background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>You're Invited to Tech Fest 2024!</h1>
    </div>
    <div class="content">
        <p>Dear Student,</p>
        <p>We're excited to invite you to Tech Fest 2024 - the biggest technology event of the year!</p>
        <p><strong>Event Details:</strong></p>
        <ul>
            <li>Date: March 15-17, 2024</li>
            <li>Time: 9:00 AM - 6:00 PM</li>
            <li>Venue: Main Auditorium</li>
        </ul>
        <p>Experience cutting-edge technology, network with industry leaders, and compete for amazing prizes!</p>
        <a href="#" class="cta">Register Now</a>
        <p>See you there!</p>
        <p>Best regards,<br>Event Organizing Committee</p>
    </div>
</body>
</html>
```

### 4. WhatsApp Message
Example:
```
🚀 *TECH FEST 2024* 🚀

Hey! Don't miss the biggest tech event of the year!

📅 March 15-17, 2024
📍 Main Auditorium
⏰ 9 AM - 6 PM

✨ Tech demos | 💡 Expert talks | 🎮 Gaming | 🏆 Prizes

Register now: [link]

See you there! 🎉
```

### 5. Landing Page HTML
Example structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Fest 2024</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; }
        .hero { 
            background: linear-gradient(135deg, #3B82F6, #A855F7);
            color: white;
            padding: 100px 20px;
            text-align: center;
        }
        .hero h1 { font-size: 3rem; margin-bottom: 20px; }
        .cta-button {
            background: white;
            color: #3B82F6;
            padding: 15px 40px;
            border: none;
            border-radius: 30px;
            font-size: 1.2rem;
            cursor: pointer;
            margin-top: 30px;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            padding: 60px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .feature {
            text-align: center;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="hero">
        <h1>TECH FEST 2024</h1>
        <p>Innovation and Future Technology</p>
        <button class="cta-button">Register Now</button>
    </div>
    <div class="features">
        <div class="feature">
            <h3>🚀 Tech Demos</h3>
            <p>Experience cutting-edge technology</p>
        </div>
        <div class="feature">
            <h3>💡 Expert Talks</h3>
            <p>Learn from industry leaders</p>
        </div>
        <div class="feature">
            <h3>🏆 Competitions</h3>
            <p>Win amazing prizes</p>
        </div>
    </div>
</body>
</html>
```

## Testing Workflow

1. **Start the server** (already running on port 3001)
2. **Register** with sample user credentials
3. **Login** with the same credentials
4. **Create a campaign** using one of the sample data sets above
5. **Wait for generation** (30-60 seconds)
6. **View the results** - all 5 assets should be generated
7. **Test features**:
   - Copy caption to clipboard
   - Copy WhatsApp message
   - Copy email HTML
   - Download poster image
   - Download landing page HTML
   - Preview landing page in iframe

## API Testing with cURL

### Register User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@college.edu",
    "password": "Test123456"
  }'
```

### Generate Campaign (requires authentication)
```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "eventName": "Tech Fest 2024",
    "theme": "Innovation and Future Technology",
    "audience": "Engineering students",
    "tone": "Energetic and professional"
  }'
```

## Environment Variables for Testing

```env
# MongoDB - Use MongoDB Atlas for cloud or local MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gencampus

# OpenAI - Get from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-your-actual-key-here

# NextAuth - Already configured
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=supersecretkey123456789012345678901234567890

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## Troubleshooting

### If generation fails:
1. Check OpenAI API key is valid
2. Verify you have credits in OpenAI account
3. Check console for error messages
4. Try with simpler event details

### If database operations fail:
1. Verify MongoDB is running
2. Check connection string format
3. Ensure network access is allowed (for Atlas)
4. Check MongoDB logs

### If images don't load:
1. DALL-E 3 requires paid OpenAI account
2. Check image URL is valid
3. Verify CORS settings
4. Try refreshing the page

## Success Indicators

✅ User can register and login
✅ Dashboard shows empty state
✅ Campaign creation form works
✅ AI generation completes without errors
✅ All 5 assets are generated
✅ Poster image displays correctly
✅ Copy buttons work
✅ Download buttons work
✅ Landing page preview renders

## Next Steps After Testing

1. Customize the AI prompts in `/app/api/generate/route.ts`
2. Add more fields to campaign creation
3. Implement campaign editing
4. Add campaign deletion
5. Add user profile page
6. Implement campaign sharing
7. Add analytics dashboard
8. Deploy to production
