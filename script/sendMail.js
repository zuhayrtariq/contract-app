const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    host: "10.159.96.20",
    port: 25,
    secure: false, 
    debug: true, 
  });

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(subject,emailHTML,sendMailTo) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'ict.governance@prime-pakistan.com', // sender address
    to: sendMailTo, // list of receivers
    cc: 'salman.siddiqui@prime-pakistan.com,zuhayr.tariq@prime-pakistan.com',
    subject: subject, // Subject line
   
    html:emailHTML, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = sendMail;