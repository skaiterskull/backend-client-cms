import nodemailer from "nodemailer";

const send = async (mailInfo) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail(mailInfo);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export const sendEmailVerificationLink = ({ email, otp }) => {
  const link = `${process.env.CLIENT_ROOT_URL}/verification?otp=${otp}&email=${email}`;
  const mailObj = {
    from: `E-shop 👻 <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: "User Email Verification", // Subject line
    text: `Hi there Please follow the link to verify your email ${link}`, // plain text body
    html: `
          Hello there,
          <br/>
          <p>Thank you for register with us. Please verify your email</p>
          <p><a href=${link}>${link}</a></p>
          <br/>
          <p>Kind regards</p>
          <br/>
          <p>--Some company info</p>
      `, // html body
  };

  send(mailObj);
};

export const sendEmailVerificationSuccess = (email) => {
  const mailObj = {
    from: `E-shop 👻 <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Verification Completed", // Subject line
    text: `Congratulation, your account is now active.`, // plain text body
    html: `
          Hello there,
          <br/>
          <p>Congratulation, your account is now active.</p>
          <br/>
          <p>Kind regards</p>
          <br/>
          <p>--Some company info</p>
      `, // html body
  };

  send(mailObj);
};

export const sendEmailUpdatePassSuccess = (email) => {
  const mailObj = {
    from: `E-shop 👻 <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Verification Completed", // Subject line
    text: `Congratulation, your password has been updated.`, // plain text body
    html: `
          Hello there,
          <br/>
          <p>Congratulation, your password has been updated.</p>
          <br/>
          <p>Kind regards</p>
          <br/>
          <p>--Some company info</p>
      `, // html body
  };

  send(mailObj);
};

export const sendEmailResetPassLink = ({ email, otp }) => {
  const link = `${process.env.CLIENT_ROOT_URL}/update-password?otp=${otp}&email=${email}`;
  const mailObj = {
    from: `E-shop 👻 <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Reset Password", // Subject line
    text: `Hi there Please follow the link to reset your password ${link}`, // plain text body
    html: `
          Hello there,
          <br/>
          <p>Please use the link below to reset your password.</p>
          <p><a href=${link}>${link}</a></p>
          <br/>
          <p>Kind regards</p>
          <br/>
          <p>--Some company info</p>
      `, // html body
  };

  send(mailObj);
};
