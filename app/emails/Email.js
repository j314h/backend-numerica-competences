const nodeMailer = require('nodemailer');
const fs = require('fs'); //for check api mail server in api key
const pug = require('pug');
const path = require('path');

class Email {
  constructor() {
    //url for real domaine mail
    this.from = '"Numerica Competences" <no-replay@numericabfc.com>';
    //if product or develop
    //option object will be defined with the info of an MTA server
    if (process.env.NODE_ENV === 'production') {
      this.TransportEmail = nodeMailer.createTransport({
        //options server MTA
      });
    } else {
      //option object for mailtrap for develop environnement
      this.TransportEmail = nodeMailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'caf1584dd4b5f1',
          pass: 'd778f6dbb5f0cc',
        },
      });
    }
  }

  //prepare email for send
  async sendEmailVerificationAccount(options) {
    try {
      await this.TransportEmail.sendMail({
        from: this.from, // sender address
        to: options.to, // list of receivers
        subject: options.subject, // Subject line
        html: pug.renderFile(path.join(__dirname, 'viewsEmail/verify.email.pug'), options.data), //html of email and data in email
      });
      console.log('send Email OK');
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = new Email();
