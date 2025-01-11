const USER  =  require('../models/user')
const OTP = require('../models/otp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

exports.Createorgainezer = async(req,res)=>{
    try {
        const {userName,password,confirmpass,email,usertype="Organizer",number} = req.body
                if(!userName || !password || !email || !number){
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
            message:"there is an error in the create Orgainizer code",
            success:false
        })
    }
}

exports.OrgainezerLogin = async(req,res)=>{
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
                // console.log("This is hte compare from th org login",compare)
                console.log("This is thee finding from th org login",Finding)
                const {verified} = Finding
                if(compare === true){
                    const jwtCreation = jwt.sign({email:Finding.email,userName:Finding.userName,id:Finding._id,usertype:Finding.usertype,verified:Finding.verified},
                        process.env.JWT_ORGAINEZER_PRIVATE_KEY,{expiresIn:'24h'}, { algorithm: 'HS256' })
                    console.log("This is the created jwt",jwtCreation)
                    USER.token = jwtCreation
                    USER.id = Finding._id
                    const options = {
                        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                        httpOnly: true,
                        secure:true
                    }
                    // res.setHeader('Authorization', `Bearer ${jwtCreation}`);
                    res.cookie('token',jwtCreation,options).status(200).json({
                        message:"the user is been logged in ",
                        success:true,
                        token:jwtCreation,
                        verify:verified    
                    })
        
                    // return res.status(200).json({
                    //     message:"The user is been loge in enjoy "
                    // })
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
            message:"there is an error in the orgainezer login code",
            success:false
        })
    }
}