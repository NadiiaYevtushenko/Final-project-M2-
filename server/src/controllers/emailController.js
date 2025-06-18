const transporter = require('../utils/mailer');

exports.sendTestEmail = async (req, res) => {
  try {
    await transporter.sendMail({
      from: `"Trust App 👻" <${process.env.EMAIL_USER}>`,
      to: 'client@example.com',
      subject: 'Test Email',
      html: `<h2>Test message</h2><p>This is a test email from your Node.js app.</p>`
    });

    res.status(200).send('📧 Email sent successfully');
  } catch (err) {
    console.error('❌ Email error:', err);
    res.status(500).send('Email sending failed');
  }
};