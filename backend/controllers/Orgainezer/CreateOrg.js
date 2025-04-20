const bcrypt = require('bcrypt')
const USER = require('../../models/user')
const date = require('date-and-time')
const jwt = require('jsonwebtoken')
const cookieParser  = require('cookie-parser')
const OTP = require('../../models/otp')

// This is the function that is going to create the route in the orgainezer in the line no 10
exports.CreateOrgainezer = async(req,res)=>{
    try {
        const {name,password,email,number,otp} = req.body
    
        if(!name || !password || !email || !number || !otp){
            return res.status(400).json({
                message:"The input fields are been required",
                success:false
            })
        }

        const Finding = await USER.findOne({userName:name})
        if(Finding){
            return res.status(400).json({
                message:"The username is already beeen taken please take another one",
                success:false,
                extra:`email that is using the usernam ${Finding.email}`
            })
        }
        const EmailFinding = await USER.findOne({email:email})
        if(EmailFinding && EmailFinding !== number){
            return res.status(400).json({
                message:"The email is already beeen taken please take another one",
                success:false
            })
        }


        const numberRecord = await USER.findOne({number}).populate("resetPasswordExpires")
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
            // console.log("This is thee otpcrations from th createduser code",otpCreation)
            if(otpCreation.otp !== otp){
                return res.status(400).json({
                    message:"the otp is not created or is beeen expired",
                    success:false
                })
            }
            // now we will hash the password 
        const hasing =  await bcrypt.hash(password,10)
        const now = new Date()
        const pattern = date.compile('ddd, YYYY/MM/DD HH:mm:ss');
        let ps = date.format(now, pattern);
                    const nameChnages = name.split(' ')
                    // console.log("This is the name",nameChnages)
                    // const uploding = await uploadDatatoCloudinary(image,process.env.CLOUDINARY_FOLDER_NAME,1000,1000) 
                    const Creation = new USER({
                        userName:name,
                        email:email,
                        password:hasing,
                        confirmpass:hasing,
                        number:number,
                        usertype:"Organizer",
                        otp:otpCreation,
                        createdAt:ps,
                        image:`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
                        verified:false
                    }) 
                    await Creation.save()
                    nameChnages.join()
                    USER.id = Creation._id
                    console.log(Creation)
                    return res.status(200).json({
                        message:"The orgainezer is been created",
                        success:true,
                        data:Creation
                    })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the create orgainezer code",
            success:false
        })
    }
}
// This is the function that is going to create the route in the orgainezer in the line no 11
exports.OrgaineserLogin = async(req,res)=>{
    try{
            const {email,password} = req.body
            if(!email || !password){
                return res.status(400).json({
                    message:"The input fields are been required",
                    success:false
                })
            }
    
            const Finding = await USER.findOne({email:email}).populate('resetPasswordExpires')
            if(!Finding){
                return res.status(404).json({
                    message:"The email is not been found",
                    success:false
                })
            }

            if(Finding.usertype === 'Viewer'){
                return res.status(400).json({
                    message:"you are not allowed to use This route ",
                    success:false
                })
            }
            const compare = await bcrypt.compare(password,Finding.confirmpass)
    
            if(!compare){
                return res.status(400).json({
                    message:"please enter the right password",
                    success:false
                })
            }

                const {userName,usertype,verified,number,_id} = Finding
                const now = new Date();
                const pattern = date.compile('DD/MM/YYYY HH:mm:ss');
                let lastLoginTime = date.format(now, pattern);
                // console.log("This is the id",_id)
                await USER.findByIdAndUpdate(_id,{$push:{lastlogin:lastLoginTime}},{new:true})
                USER.id = _id
                // console.log("This is the login code",login)
                const jwtCreation = jwt.sign({email,userName,usertype,verified,number,id:_id,lastlogin:lastLoginTime},process.env.JWT_PRIVATE_KEY,{ expiresIn: '24h', algorithm: 'HS256' })
                const options = {
                    expires:new Date (Date.now() + 2 * 24 * 60 * 60 * 1000),
                    httpOnly:true
                }
    
                res.cookie('token',jwtCreation,options).status(200).json({
                    message:"The user is been loged in",
                    success:true,
                    data:jwtCreation
                })
        }catch(error){
            console.log(error)
            console.log(error.message)
            return res.status(500).json({
                message:"error in the login code",
                success:false
            })
            
        }
}