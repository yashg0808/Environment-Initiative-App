import Mailgen from "mailgen";
import nodemailer from "nodemailer";


const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "EnvInitiativeApp",
        link: "http://localhost:3000/",
      },
    });
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    const emailHtml = mailGenerator.generate(options.mailgenContent);
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });
    const mail = {
      from: "rishabhxchoudhary@demomailtrap.com", // Anything
      to: options.email, // receiver's mail
      subject: options.subject, // mail subject
      text: emailTextual, // mailgen content textual variant
      html: emailHtml, // mailgen content html variant
    };
  
    try {
      await transporter.sendMail(mail);
      console.log("Email sent successfully");
    } catch (error) {
      console.log(
        "Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file"
      );
      console.log("Error: ", error);
    }
  };

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our app! We're very excited to have you on board.",
            action: {
                instructions:
                    "To verify your email please click on the following button:",
                button: {
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verificationUrl,
                },
            },
            outro:
                "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset the password of our account",
            action: {
                instructions:
                    "To reset your password click on the following button or link:",
                button: {
                    color: "#22BC66", // Optional action button color
                    text: "Reset password",
                    link: passwordResetUrl,
                },
            },
            outro:
                "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};
export {
    sendEmail,
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent
}