// "use client"
import nodemailer from "nodemailer";

export const SendEmail = async ({ email, emailType, token, code }: any) => {
  try {
    if (emailType === 'Reset') {
      // const token = await generateResetToken(email);
      console.log('emailtype Reset');
    }
    console.log("sender email", email, emailType, token);

    var transport = nodemailer.createTransport({
      // host: "sandbox.smtp.mailtrap.io",
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: emailType === 'Verify' ? 'Welcome to ahex' : 'Reset Password',
      message: emailType === 'Verify' ? 'Hi Its verification mail' : 'Hi Its Forgot Password mail',
      html: `${emailType === 'Verify' ? (`
           
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to ahex</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="font-size: 28px; color: #333; margin-bottom: 10px;">Email Verification</h1>
          </div>
          <div style="margin-bottom: 30px;">
            <p>Hi there,</p>
            <p>We've received a request to verify your email address. Please click the button below to complete the verification process.</p>
            <div style="display:flex;justify-content:center">
            <a href="${process.env.DOMAIN}/verifyEmail?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}" style="display: inline-block; background-color: #1a1a1c; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; width: 120px; transition: background-color 0.3s ease; ">Activate account</a>
            </div>
            <p>If you didn't request this, you can safely ignore this email.</p>
          </div>
          <div style="text-align: center; color: #888; font-size: 14px;">
            <p>Thank you!</p>
          </div>
        </div>
      </body>
      </html>
      `) : (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verification Code Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p style="margin: 0; font-size: 18px; color: #333;">Hi Dear User,</p>
                <br>
                <p style="margin: 0; font-size: 16px; color: #333;">Your Verification code is <span style="font-size: 24px; color: #007bff;">${code}</span> to RESET your password.</p>
                <br>
                <p style="margin: 0; font-size: 16px; color: #333;">Please enter this code in the verification box to reset your password.</p>
                <br>
                <p style="margin: 0; font-size: 18px; color: #333;">Thank you.</p>
            </div>
        </body>
        </html>
        `)
        }`
    }

    const mailResponse = await transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      }
      else {
        console.log('email sent successfully')
      }
    });

  }
  catch (error: any) {
    console.log(error)
  }
}
