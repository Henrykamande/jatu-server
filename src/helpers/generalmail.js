const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");

const emailUser = "info@softcloudtech.co.ke";
const emailPass = "Exit.1963!";

export async function SendEmail(data) {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const htmlData = await ejs.renderFile(__dirname + "/contactmail.ejs", {
    title: data.title,
    content: data.content,
  });

  const mainOptions = {
    from: `"${data.title}" ${emailUser}`,
    to: "jubilantafrofarms@gmail.com",
    subject: data.subject,
    html: htmlData,
  };
  //  console.log('html data ======================>', mainOptions.html)
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
}
