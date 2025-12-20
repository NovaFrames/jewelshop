# Email Setup Instructions for Order Notifications

## Overview
This application uses **Nodemailer** to send order confirmation emails to the admin when a customer places an order.

## Setup Steps

### 1. Configure Email Credentials

Open `functions/src/index.ts` and update the following lines with your actual email credentials:

```typescript
const transporter = nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
        user: "your-email@gmail.com", // Replace with your email
        pass: "your-app-password", // Replace with your app password
    },
});
```

### 2. For Gmail Users

If you're using Gmail, you need to create an **App Password**:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Under "2-Step Verification", find **App passwords**
5. Generate a new app password for "Mail"
6. Copy the 16-character password
7. Use this password in the `pass` field (without spaces)

### 3. Update Admin Email

In the `sendOrderEmail` function, update the admin email address:

```typescript
const mailOptions = {
    from: "your-email@gmail.com", // Your sender email
    to: "admin@jewelryshop.com", // Replace with actual admin email
    subject: `New Order from ${orderData.userName} - ₹${orderData.totalAmount}`,
    html: emailHTML,
};
```

### 4. Other Email Services

If you're not using Gmail, you can configure other email services:

#### Outlook/Hotmail
```typescript
const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "your-email@outlook.com",
        pass: "your-password",
    },
});
```

#### Custom SMTP
```typescript
const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "your-email@example.com",
        pass: "your-password",
    },
});
```

### 5. Deploy Functions

After configuring the email settings, deploy your Firebase Functions:

```bash
cd functions
npm run build
firebase deploy --only functions
```

## Testing

1. Place a test order through the application
2. Check the Firebase Functions logs:
   ```bash
   firebase functions:log
   ```
3. Verify that the email was sent successfully
4. Check the admin email inbox for the order confirmation

## Email Template

The email includes:
- Order date and status
- Customer information (name, email, phone)
- Delivery address
- List of ordered items with quantities and prices
- Total amount

## Troubleshooting

### Email not sending?
1. Check Firebase Functions logs for errors
2. Verify email credentials are correct
3. Ensure 2-Step Verification and App Password are set up (for Gmail)
4. Check spam/junk folder

### Function not being called?
1. Ensure functions are deployed: `firebase deploy --only functions`
2. Check browser console for errors
3. Verify Firebase Functions are enabled in your project

## Security Notes

⚠️ **IMPORTANT**: Never commit your actual email credentials to version control!

Consider using Firebase Environment Configuration for production:

```bash
firebase functions:config:set email.user="your-email@gmail.com" email.pass="your-app-password"
```

Then access them in your code:
```typescript
const config = functions.config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email.user,
        pass: config.email.pass,
    },
});
```
