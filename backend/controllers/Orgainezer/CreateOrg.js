const {uploadDatatoCloudinary} = require('../../utils/imageUploader')
const bcrypt = require('bcrypt')
const USER = require('../../models/user')
exports.CreateOrgainezer = async(req,res)=>{
    try {
        const image = req.files.image
        const {name,password,email,usertype="Organizer",number} = req.body
    
        if(!name || !password || !email || !number){
            return res.status(400).json({
                message:"The input fields are been required",
                success:false
            })
        }

        if(!req.files || !req.files.image || !image){
            return res.status(400).json({
                message:'The input image is been required',
                success:False
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
                    const uploding = await uploadDatatoCloudinary(image,process.env.CLOUDINARY_FOLDER_NAME,1000,1000) 
                    const Creation = new USER({
                        userName:name,
                        email:email,
                        password:hasing,
                        confirmpass:hasing,
                        number:number,
                        usertype:usertype,
                        otp:otpCreation,
                        createdAt:ps,
                        image:uploding.secure_url,
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