import sgMail from '@sendgrid/mail';

/**
 * Email Service using SendGrid
 * 
 * IMPORTANT SETUP REQUIREMENTS:
 * 1. SENDGRID_API_KEY must be set in environment variables
 * 2. FROM_EMAIL must be verified in SendGrid account (Single Sender Verification)
 *    - Go to SendGrid Dashboard > Settings > Sender Authentication
 *    - Verify the email address that matches FROM_EMAIL env variable
 * 3. API Key must have "Mail Send" permissions
 */
class EmailService {
  constructor() {
    this.initialized = false;
    this.mockMode = false;
  }

  // Lazy initialization
  async initializeTransporter() {
    if (this.initialized) return;

    const apiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || 'no-reply@yourdomain.com';
    
    if (!apiKey || apiKey === 'your-sendgrid-api-key') {
      console.log('⚠️  Using mock email service for testing. Set SENDGRID_API_KEY for real emails.');
      this.mockMode = true;
    } else {
      sgMail.setApiKey(apiKey);
      console.log('✅ SendGrid email service initialized');
      console.log(`📧 FROM_EMAIL configured: ${fromEmail}`);
      console.log('⚠️  Make sure this email is verified in SendGrid: Settings > Sender Authentication');
    }

    this.initialized = true;
  }

  async sendEmail(mailOptions) {
    await this.initializeTransporter();

    if (this.mockMode) {
      console.log('📧 Mock Email Sent:', {
        to: mailOptions.to,
        subject: mailOptions.subject,
        htmlPreview: mailOptions.html.substring(0, 100) + '...',
      });
      return { messageId: 'mock-message-id' };
    }

    try {
      const fromEmail = process.env.FROM_EMAIL || 'no-reply@yourdomain.com';
      const msg = {
        from: fromEmail,
        ...mailOptions,
      };
      
      console.log(`📧 Attempting to send email to ${mailOptions.to} from ${fromEmail}`);
      const result = await sgMail.send(msg);
      console.log(`✅ Email sent successfully to ${mailOptions.to} | Subject: ${mailOptions.subject}`);
      return result;
    } catch (error) {
      // Log detailed SendGrid error information
      console.error('❌ Error sending email via SendGrid:');
      console.error('Error message:', error.message);
      
      if (error.response) {
        console.error('SendGrid Response Status:', error.response.status);
        console.error('SendGrid Response Body:', JSON.stringify(error.response.body, null, 2));
        console.error('SendGrid Response Headers:', error.response.headers);
        
        // Common SendGrid errors:
        if (error.response.body && error.response.body.errors) {
          error.response.body.errors.forEach((err, index) => {
            console.error(`  Error ${index + 1}: ${err.message} (Field: ${err.field || 'N/A'})`);
            if (err.help) {
              console.error(`    Help: ${err.help}`);
            }
          });
        }
      }
      
      // If it's a sender verification error, provide helpful message
      if (error.response?.body?.errors) {
        const senderError = error.response.body.errors.find(
          err => err.message && err.message.toLowerCase().includes('sender')
        );
        if (senderError) {
          console.error('⚠️  IMPORTANT: The sender email address needs to be verified in SendGrid!');
          console.error(`   Current FROM_EMAIL: ${process.env.FROM_EMAIL || 'not set'}`);
          console.error('   Please verify this email in your SendGrid account: Settings > Sender Authentication');
        }
      }
      
      throw error;
    }
  }

  // Send OTP email
  async sendOTPEmail(userEmail, userName, otp) {
    const mailOptions = {
      to: userEmail,
      subject: '🔐 Verify Your Email - Console',
      html: `<div style="font-family: Arial, sans-serif; max-width:600px; padding:20px;">
        <h2>Hi ${userName}! 👋</h2>
        <p>Your verification code is:</p>
        <div style="font-size: 24px; font-weight:bold; letter-spacing: 5px;">${otp}</div>
        <p>This code will expire in 5 minutes.</p>
      </div>`,
    };
    return this.sendEmail(mailOptions);
  }

  // Send verification email with link
  async sendVerificationEmail(userEmail, userName, verificationToken) {
    const verificationUrl = `http://localhost:5000/api/auth/verify-email/${verificationToken}`;
    const mailOptions = {
      to: userEmail,
      subject: '🔐 Verify Your Email - Console',
      html: `<div style="font-family: Arial, sans-serif; max-width:600px; padding:20px;">
        <h2>Hi ${userName}! 👋</h2>
        <p>Click the button below to verify your email:</p>
        <a href="${verificationUrl}" style="background:#667eea;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">Verify Email</a>
        <p>This link expires in 24 hours.</p>
      </div>`,
    };
    return this.sendEmail(mailOptions);
  }

  // Send password reset email with OTP
  async sendPasswordResetEmail(userEmail, userName, otp) {
    const mailOptions = {
      to: userEmail,
      subject: '🔑 Password Reset Code - Console',
      html: `<div style="font-family: Arial, sans-serif; max-width:600px; padding:20px;">
        <h2>Hi ${userName}! 👋</h2>
        <p>Your password reset code is:</p>
        <div style="font-size: 24px; font-weight:bold; letter-spacing:5px;">${otp}</div>
        <p>This code will expire in 15 minutes.</p>
      </div>`,
    };
    return this.sendEmail(mailOptions);
  }
}

export default new EmailService();
