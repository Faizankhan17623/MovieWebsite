const express = require('express')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const users = require('../../models/user')
const bcrypt = require('bcrypt')
exports.LinkSend = async(req,res)=>{
    try {
        const {email} = req.body
        const Finding = await users.findOne({email:email})
        if(!Finding){
            return res.status(400).json({
                message:`This email id${email} is not present please is create it`,
                success:false
            })
        }

        const cryptoToken = crypto.randomBytes(20).toString('hex')

        const updateDetails = await users.findOneAndUpdate(
            {email:email},
            {
                token:cryptoToken,
                resetPasswordExpires:Date.now() + 3*60
            },{new:true})
            console.log("This is the updated details",updateDetails)

            const url = `http://localhost:5173/password-update/${cryptoToken}`
            await nodemailer(email,
                'password reset',
                `your link in the email is ${url} This is the link to change the password`
            )

            res.json({
                success: true,
                message:
                  "Email Sent Successfully, Please Check Your Email to Continue Further",
              })
    } catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Sending the Reset Message`,
          })
    }
}

exports.ResetPassword = async(req,res)=>{
    try {
        const {password,token} = req.body
        const TokenFinding = await users.findOne({token:token})
        if(!TokenFinding){
            return res.status(400).json({
                message:"The token is not presnet or has been expired",
                success:false
            })
        }

        if((!TokenFinding.resetPasswordExpires > Date.now())){
            return res.status(400).json({
                message:"This email is not valid or the token is expird please genereate a new one",
                success:false
            })
        }

        const encryptinPassword = await bcrypt.hash(password,PASSWORD_CHANGING_HASH_ROUNDS)
        const PasswordChanging = await users.findOneAndUpdate({token:token},{password:encryptinPassword,confirmpass:encryptinPassword},{new:true})
        return res.status(200).json({
            message:"The password is been updated",
            success:true
        })
        
    } catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Updating the Password`,
        })        
    }
}







