require('dotenv').config()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
const cookie = require('cookie-parser')

const OTP = require('../models/otp')
const USER = require('../models/user')

exports.Createuser = async(req,res)=>{
    try {
        // console.log("This is the https",http) please keep This line in the code base it is important like an extra requirement 
        const {userName,password,confirmpass,email,usertype="Viewer",number,otp} = req.body
        if(!userName || !password || !email || !number || !otp){
            return res.status(400).json({
                message:"The input Fields are required",
                success:false
            })
        }
        const Findingemail = await USER.findOne({
            email:email
        })

        if(Findingemail && Findingemail.number !== number){
            return res.status(409).json({
                message: "The email is already taken and linked to a different number.",
                success: false,
                data: `email: ${email}, linked number: ${Findingemail.number}`
            });
        }


        const numberRecord = await USER.findOne({number})

        if(numberRecord && numberRecord.email !== email){
            return res.status(409).json({
                message: "The number is already taken and linked to a different email.",
                success: false,
                data: `number: ${number}, linked email: ${numberRecord.email}`
            });
        }

        const otpCreation = await OTP.findOne({email}).sort({createdAt:-1}).limit(1)
        if(!otpCreation){
            return res.status(404).json({
                message:"The otp is not beeen found or is been expired create a new one",
                success:false
            })
        }
        console.log("This is thee otpcrations from th createduser code",otpCreation)
        if(otpCreation.otp !== otp){
            return res.status(400).json({
                message:"the otp is not created or is beeen expired",
                success:false
            })
        }
        // now we will hash the password 
        const hasing =  await bcrypt.hash(password,10)

        const nameChnages = userName.split(' ')
        console.log("This is the name",nameChnages) 
        console.log("This is the hashed password that is been created",hasing)
        const Creation = await USER.create({
            userName:userName,
            email:email,
            password:hasing,
            confirmpass:hasing,
            number:number,
            usertype:usertype,
            otp:otpCreation,
            image:`https://ui-avatars.com/api/?name=${nameChnages[0]}+${nameChnages[1]}&background=random`
        }) 
        nameChnages.join()
        console.log("This is the user that is been created",Creation)
        return res.status(200).json({
            message:"The data is been created please log in",
            success:true,
            data:Creation
        })
    } catch (error) {
        console.log(error)
        console.log("This is the error message",error.message)
        return res.status(500).json({
            message:"there is an error in the user creation",
            success:false
        })
    }
}
exports.CreateOtp = async(req,res)=>{
    try {
        const {email} = req.body
        
        if(!email){
            return res.status(400).json({
                message:"the input Fields are required",
                success:false
            })
        }

        const Finding = await USER.findOne({email})
        if(Finding){
            return res.status(409).json({
                message:"This email is already present please log in",
                success:false,
                data:email
            })
        }
        // now we will generate the otp 

        const generate = otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            digits:true,
            upperCaseAlphabets:false,
            specialChars:false
        })

        console.log("This is the generated otp",generate)

        const saving = await OTP.create({otp:generate,email})
        console.log("The otp is been saved in the databse",saving)

        return res.status(200).json({
            message:`The otp is been send on the email address ${email}`,
            success:true,
            data:generate
        })

    } catch (error) {
        console.log(error)
        console.log("This is the error message",error.message)
        return res.status(500).json({
            message:"there is an error in the otp sending code",
            success:false
        })
    }
}


exports.login = async(req,res)=>{
    try {
        const {email,password} = req.body
        const Finding = await USER.findOne({email})
        if(!Finding){
            return res.status(404).json({
                message:"This email is not present please create an account",
                success:false
            })
        }
        
        const compare =  await bcrypt.compare(password,Finding.confirmpass)
        const {_id} = Finding
        if(compare === true){
            // now we will create jwt token here 
            const VerifyUpdate = await USER.findByIdAndUpdate(_id,{verified:true},{new:true})
            console.log("This is the verifies update",VerifyUpdate)
            const jwtCreation = jwt.sign({email:Finding.email,password:Finding.password,userName:Finding.userName,number:Finding.number,_id:Finding._id,usertype:Finding.usertype,verified:Finding.verified},process.env.JWT_PRIVATE_KEY,{expiresIn:'24h'}, { algorithm: 'HS256' })
            console.log("This is the created jwt",jwtCreation)
            USER.token = jwtCreation
            USER.id = Finding._id
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure:true
            }

            // This is thee headeer that is ben used to set it up
            // res.setHeader('Authorization', `Bearer ${jwtCreation}`);
            
            res.cookie('token',jwtCreation,options).status(200).json({
                message:"the user is been logged in ",
                success:true,
                token:jwtCreation    
            })
        }else{
            return res.status(401).json({
                message: "Invalid credentials.",
                success: false,
            });
        }
    } catch (error) {
        console.log(error)
        console.log("This is the error message",error.message)
        return res.status(500).json({
            message:"there is an error in login code",
            success:false
        })
    }
}


// This is the code to get all the data
exports.GetAllUsers = async(req,res)=>{
    try {
        const allusers = await USER.find()
        if(allusers.length === 0){
            return res.status(400).json({
                message:"There are no users created",
                success:false
            })
        }else{
            console.log("These are all the usres",allusers)
            return res.status(200).json({
                message:"These are all the users",
                success:true,
                data:allusers
            })
        }
    } catch (error) {
        console.log(error)
        console.log("This is the error message",error.message)
        return res.status(500).json({
            message:"there is an error in the get all user code",
            success:false
        })   
    }
}