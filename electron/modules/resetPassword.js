const {ipcMain} = require('electron');
//Node Emailer variables
const nodemailer = require('nodemailer');
const datastore = require('../datastore');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'horus.sustaingineering@gmail.com',
    pass: 'horus4ever!'
  }
});

//Verification Code

const emailTemplate = {
  from: 'horus.sustaingineering@gmail.com',
  subject: 'Reset your Password Verification Code',
};

//Verify email
<<<<<<< HEAD
var generatePasswordToken = exports.generatePasswordToken = (msg) => {
  return new Promise( async (resolve, reject) => {
=======
ipcMain.on('generate-password-token', async (e, msg) => {
>>>>>>> First commit
    try {
      // Check email existance
      let emailExists = await datastore.findUser(msg.email);
      if (!emailExists) {
<<<<<<< HEAD
        return resolve({error:"Email does not exist"});
=======
        e.sender.send('email-exists', {error:"Email does not exist"});
        return;
>>>>>>> First commit
      }
      let userEmail = msg.email;
      //Generate random code to recover password
      let randomCode = Math.random().toString(36).substring(7);
      //Populate email template
      emailTemplate.to = userEmail;
      emailTemplate.html =
      `
      <p>
      Hi,
        This is your temporary verification code: ` + randomCode + `
      </p>
      `
      //Create Password token on Database
      await datastore.storePasswordToken(randomCode, userEmail)
      //Send email to user
<<<<<<< HEAD
      await transporter.sendMail(emailTemplate, function (error, info) {
=======
      await transporter.sendMail(mailOptions, function (error, info) {
>>>>>>> First commit
        if(error) {
          console.log(error);
        } else {
          console.log(info);
        }
      });
<<<<<<< HEAD
      return resolve({success:"Verification Email sent"});
    } catch(error) {
      console.log(error)
      return reject(error) 
    }
  })
}


  //VerifyCode

var verifyAndUpdatePassword = exports.verifyAndUpdatePassword = function(msg) {
  return new Promise(async (resolve, reject) => {
    try {
      let isTokenValid = await datastore.checkPasswordToken(msg.token, msg.email);
      if(!isTokenValid) {
        return resolve({error: 'Wrong Verification Code entered'});
      }
      //Reset passoword
      await datastore.newPassword({email: msg.email, password: msg.password});
      await datastore.clearPasswordTokens(msg.email);
      return resolve({success:"Password changed!"});
    } catch(error) {
      return reject({error: error});  
    }
  })
}
 
=======
      e.sender.send('email-exists', "Email exists!");
    } catch(error) {
      e.sender.send('email-exists', {error: error}); 
    }
  })

  //VerifyCode
ipcMain.on('verify-and-update-password', async (e, msg) => {
  try {
    let isTokenValid = await datastore.checkPasswordToken(msg.token, msg.email);
    if(!isTokenValid) {
      e.sender.send('verify-code', {error: 'Wrong Verification Code entered'});
      return;
    }
    //Reset passoword
    await datastore.newPassword({email: msg.email, password: msg.password});
    await datastore.clearPasswordTokens(msg.email);
    e.sender.send('reset-password', "Password changed!");
  } catch(error) {
    e.sender.send('verify-code', {error: error});
  }
}) 
>>>>>>> First commit
