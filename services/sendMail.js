const nodemailer = require("nodemailer");
const { emit } = require("..");
const db = require("../config/dbConnect");
const { insertNewUser } = require("./insertIntoDB");

const sendContactConfirm = async (email, name, subject, message) => {
  const mailOptions = {
    from: `Admin <${process.env.MAILER_EMAIL_ID}>`,
    to: email,
    subject: `Contact conformation`,
    html: `<p>Hey <strong>${name}</strong>,</p>
      <p>This mail is to confirm that you have successfully sent an message to the server admins</p>
      <p>Subject is : ${subject}</p>
      <p>Message content is :</p>
      <p>${message}</p>`,
  };

  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.MAILER_EMAIL_ID,
      pass: process.env.MAILER_EMAIL_PASSWORD,
    },
  });

  const sendMail = async (mailOptions) => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error);
          return;
        }
        resolve(info);
      });
    });
  };

  try {
    db.beginTransaction();

    const [insRes, resp] = await Promise.all([
      insertNewUser(email, name, subject, message),
      sendMail(mailOptions),
    ]);

    db.commit();

    return resp;
  } catch (err) {
    db.rollback();
    console.error(err);
    throw new Error("Internal server error");
  }
};

module.exports = { sendContactConfirm };
