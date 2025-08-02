const nodemailer=require('nodemailer')
require('dotenv').config();

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL,
    to: email,
    subject: 'LittleHope OTP Code',
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

module.exports={
  sendOTPEmail
}