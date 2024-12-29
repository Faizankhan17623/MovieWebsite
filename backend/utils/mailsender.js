const transporter = require('../config/nodemailer')
const mailSenders = async(from,to,subject,text)=>{
    try {
        const info = await transporter.sendMail({
            from:`${from} <faizankhan901152@gmail.com>`,
            to:to,
            subject: subject, 
            text: text, 
            html: "<b>This is the heading of the sending</b>", 
        })
        console.log("This is the information",info)
    } catch (error) {
        console.log("This is the error code",error)
        console.log(error.message)
    }
}


module.exports = mailSenders