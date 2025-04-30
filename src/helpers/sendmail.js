const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");

const emailUser = "info@janimarket.com";
const emailPass = "J@tuM@rket.2022";

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

  const htmlData = await ejs.renderFile(__dirname + "/sendmail.ejs", {
    title: data.title,
    content: data.content,
    products: data.products,
  });

  const mainOptions = {
    from: `"${data.title}" ${emailUser}`,
    to: "janimarketk@gmail.com",
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
