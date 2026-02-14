# 🔑 ADD YOUR GROQ API KEY HERE

## 📍 Step 1: Get Your Groq API Key

Go to: **https://console.groq.com/keys**

1. Sign up / Login
2. Click "Create API Key"
3. Copy the key (starts with `gsk_...`)

---

## 📝 Step 2: Open the `.env` File

Find this file in your project root: `.env`

---

## ✏️ Step 3: Add Your Key

Find this line in `.env`:
```
GROQ_API_KEY=your_groq_api_key_here
```

Replace `your_groq_api_key_here` with your actual key:
```
GROQ_API_KEY=gsk_your_actual_key_from_groq_console
```

---

## 💾 Step 4: Save the File

Save the `.env` file after adding your key.

---

## 🔄 Step 5: Restart Server (if needed)

If the server doesn't auto-restart:
1. Press `Ctrl+C` to stop
2. Run `npm run dev` to start again

---

## ✅ Step 6: Test It!

1. Go to http://localhost:3000
2. Register a new account
3. Create a campaign
4. Watch Groq generate content in 5-10 seconds! ⚡

---

## 🎯 Example

Your `.env` should look like this:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://adityamodani06_db_user:Ny9JSsuSBRwr0v91@cluster0.f1jvpyy.mongodb.net/gencampus?retryWrites=true&w=majority&appName=Cluster0

# Groq API - YOUR KEY HERE
GROQ_API_KEY=gsk_abc123xyz789example_key_here

# NextAuth
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=supersecretkey123456789012345678901234567890

# App
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

---

## 🆘 Troubleshooting

### Can't find .env file?
- It's in the root of your project
- Same folder as package.json
- If you don't see it, create it

### Key not working?
- Make sure you copied the full key
- No spaces before or after the key
- Key should start with `gsk_`

### Server not restarting?
- Manually stop with Ctrl+C
- Run `npm run dev` again

---

## 🎉 That's It!

Once you add your Groq API key, your app will be fully functional and ready to generate amazing AI-powered campaigns!

**Get your key now:** https://console.groq.com/keys
