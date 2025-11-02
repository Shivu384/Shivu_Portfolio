# EmailJS Setup Guide

This guide will help you configure EmailJS for the contact form in your portfolio.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (you can use Google, GitHub, or email)
3. Complete the registration

## Step 2: Create an Email Service

1. After logging in, go to **"Email Services"** in the dashboard
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (Recommended - easiest setup)
   - **Outlook** 
   - **Yahoo**
   - Or any other SMTP service

4. Follow the setup wizard:
   - For Gmail: You'll need to enable "Less secure app access" or use App Password
   - Connect your email account
   - Give your service a name (e.g., "Portfolio Contact Form")

5. **Copy the Service ID** - You'll see it in the format: `service_xxxxxxx`
   - This is your `VITE_APP_EMAILJS_SERVICE_ID`

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. Choose a template or start from scratch

4. **Template Settings:**
   - **Template Name**: Give it a name (e.g., "Portfolio Contact")
   - **Subject**: `New message from {{from_name}}`
   - **Content**: Copy and paste this template:

```
From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

5. Click **"Save"**
6. **Copy the Template ID** - You'll see it in the format: `template_xxxxxxx`
   - This is your `VITE_APP_EMAILJS_TEMPLATE_ID`

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** (or **"API Keys"**)
2. Find your **"Public Key"** 
   - This is your `VITE_APP_EMAILJS_PUBLIC_KEY`
   - Format: `xxxxxxxxxxxxxxxxx`

## Step 5: Create .env File

1. In your project root directory, create a file named `.env`
2. Copy the `.env.example` file content
3. Replace the placeholder values with your actual EmailJS credentials:

```env
VITE_APP_EMAILJS_SERVICE_ID=service_abc123xyz
VITE_APP_EMAILJS_TEMPLATE_ID=template_xyz789abc
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Important:**
- Never commit the `.env` file to GitHub (it's already in .gitignore)
- The `.env` file should be in the root directory (same level as `package.json`)

## Step 6: Restart Development Server

After creating/updating your `.env` file:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 7: Test the Contact Form

1. Open your portfolio in the browser
2. Navigate to the Contact section
3. Fill out the form with test data
4. Submit the form
5. Check your email inbox - you should receive the message!

## Troubleshooting

### Form not sending emails?
1. ✅ Check browser console for errors (F12 → Console)
2. ✅ Verify all three environment variables are set correctly
3. ✅ Make sure `.env` file is in the root directory
4. ✅ Restart the dev server after creating/modifying `.env`
5. ✅ Check EmailJS dashboard → **"Activity"** for error logs

### Environment variables not working?
- Make sure variable names start with `VITE_APP_`
- Vite only exposes variables prefixed with `VITE_`
- Restart the dev server after changes

### Gmail setup issues?
- Use an **App Password** instead of your regular password
- Enable 2-Factor Authentication first
- Generate App Password: Google Account → Security → App Passwords

### Free tier limits?
- EmailJS free tier: 200 emails/month
- Perfect for a portfolio website
- Upgrade if you need more

## For Production Deployment

When deploying to Netlify/Vercel/etc:

1. Go to your deployment platform's settings
2. Find **"Environment Variables"** or **"Env Variables"**
3. Add all three variables:
   - `VITE_APP_EMAILJS_SERVICE_ID`
   - `VITE_APP_EMAILJS_TEMPLATE_ID`
   - `VITE_APP_EMAILJS_PUBLIC_KEY`
4. Redeploy your site

## Security Notes

- ✅ Public Key is safe to expose (it's public by design)
- ✅ Never share your Service ID or Template ID publicly
- ✅ Keep your `.env` file local and private
- ✅ The `.env` file is already in `.gitignore`

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Check EmailJS dashboard for detailed error messages

---

**Quick Checklist:**
- [ ] Created EmailJS account
- [ ] Created email service
- [ ] Created email template
- [ ] Got Public Key
- [ ] Created `.env` file with all three values
- [ ] Restarted dev server
- [ ] Tested the contact form
- [ ] Received test email ✅

