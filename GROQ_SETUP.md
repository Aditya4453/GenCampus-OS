# 🚀 Groq API Setup Guide

## ✅ What Changed

Your application now uses **Groq** instead of OpenAI for AI generation!

### Why Groq?
- ⚡ **Faster**: Up to 18x faster than OpenAI
- 💰 **Free tier**: Generous free usage
- 🎯 **Perfect for**: Text generation (captions, emails, HTML)
- 🔥 **Model**: Using Llama 3.1 70B (very capable!)

---

## 🔑 How to Get Your Groq API Key

### Step 1: Create Groq Account
1. Go to https://console.groq.com
2. Click "Sign Up" or "Sign In"
3. Sign up with Google/GitHub or email

### Step 2: Get API Key
1. After logging in, go to https://console.groq.com/keys
2. Click "Create API Key"
3. Give it a name (e.g., "GenCampus OS")
4. Click "Submit"
5. **Copy the API key** (starts with `gsk_...`)

### Step 3: Add to .env File
1. Open your `.env` file
2. Find this line:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```
3. Replace `your_groq_api_key_here` with your actual key:
   ```
   GROQ_API_KEY=gsk_your_actual_key_here
   ```
4. Save the file

---

## 🎨 What Gets Generated

With Groq, your app will generate:

✅ **Instagram Caption** - Engaging text with emojis and hashtags
✅ **Email Invite** - Professional HTML email
✅ **WhatsApp Message** - Concise broadcast message
✅ **Landing Page** - Complete responsive HTML page
✅ **Poster Placeholder** - Uses a placeholder image service

### About the Poster
Since Groq doesn't generate images, we're using a placeholder service that creates a simple poster with your event name. You can later integrate:
- DALL-E (if you get OpenAI access)
- Stability AI
- Midjourney API
- Or any other image generation service

---

## 🧪 Test It!

1. Make sure your `.env` has:
   - ✅ MongoDB URI (already configured)
   - ✅ Groq API key (add yours)

2. Restart the dev server (if needed):
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

3. Go to http://localhost:3001

4. Register and create a campaign with:
   ```
   Event Name: Tech Fest 2024
   Theme: Innovation and Future Technology
   Audience: Engineering students
   Tone: Energetic and professional
   ```

5. Click "Generate Campaign"

6. Wait 5-10 seconds (Groq is FAST!)

7. View your generated content! 🎉

---

## 📊 Groq Models Available

We're using: **llama-3.1-70b-versatile**
- Best for: General purpose, creative content
- Speed: Very fast
- Quality: Excellent

Other options you can try (change in `app/api/generate/route.ts`):
- `llama-3.1-8b-instant` - Even faster, good quality
- `mixtral-8x7b-32768` - Great for long content
- `gemma2-9b-it` - Good balance

---

## 💰 Pricing

**Free Tier:**
- 14,400 requests per day
- 30 requests per minute
- More than enough for development and testing!

**Paid Plans:**
- Very affordable if you need more
- Check https://console.groq.com/settings/billing

---

## 🔧 Technical Details

### Files Changed:
1. `lib/groq.ts` - New Groq client
2. `app/api/generate/route.ts` - Updated to use Groq
3. `.env` - Changed from OPENAI_API_KEY to GROQ_API_KEY
4. `package.json` - Added groq-sdk dependency

### API Endpoint:
- Still the same: `POST /api/generate`
- Same request/response format
- Just faster and using Groq!

---

## 🎯 Next Steps

1. **Get your Groq API key** from https://console.groq.com/keys
2. **Add it to `.env`** file
3. **Test the generation** - create a campaign!
4. **Enjoy lightning-fast AI generation** ⚡

---

## 🆘 Troubleshooting

### Error: "GROQ_API_KEY is not defined"
- Make sure you added the key to `.env`
- Restart the dev server after adding the key

### Error: "Rate limit exceeded"
- Free tier: 30 requests/minute
- Wait a minute and try again
- Or upgrade to paid plan

### Generation is slow
- Groq is usually very fast (2-5 seconds)
- Check your internet connection
- Try a smaller model like `llama-3.1-8b-instant`

### Content quality issues
- Adjust the `temperature` in `app/api/generate/route.ts`
- Try different models
- Refine the prompt

---

## 🎉 You're All Set!

Your app now uses Groq for blazing-fast AI generation. Just add your API key and start creating amazing campaigns!

**Get your key:** https://console.groq.com/keys
