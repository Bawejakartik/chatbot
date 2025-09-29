const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

exports.sendEmail = async ({ to, subject, otp }) => {
  // 1️⃣ Mailgen setup
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Genuine Chatapp",
      link: "http://genuine.com",
    },
  });

  const email = {
    body: {
      name: to.split("@")[0],
      intro: "You requested a password reset.",
      action: {
        instructions:
          "Use this OTP to reset your password. It will expire in 10 minutes.",
        button: {
          color: "#22BC66",
          text: `OTP: ${otp}`,
        },
      },
      outro: "If you did not request this, please ignore this email.",
    },
  };

  const emailBody = mailGenerator.generate(email);

 
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:process.env.USER,
      pass:process.env.PASS,
    },
  });

  
  const info = await transporter.sendMail({
    from: `"Genuine Chatapp" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html: emailBody,
  });

  console.log(`Email sent: ${info.messageId}`);
};
