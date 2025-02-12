const Theatre  = require('../../models/Theatres')
const {uploadDatatoCloudinary} = require('../../utils/imageUploader')
const lanuages = require('../../models/CreateLanguage')
const date = require('date-and-time')
exports.CreateTheatre = async(req,res)=>{
    try {
        const {name,locationname,locationurl,languagename,theatreformat} = req.body
        let theatreImage = req.files.theatreImage
        // console.log("This is the theatre images",theatreImage)

        if(!name || !locationname || !locationurl || !languagename || !theatreformat){
            return res.status(400).json({
                message:"the input fields are been required",
                success:false
            })
        }

        if(!req.files || !req.files.theatreImage){
            return res.status(400).json({
                message:"no images uploaded",
                success:false
            })
        }
        const finding = await Theatre.findOne({Theatrename:name})
        if(finding){
            return res.status(400).json({
                message:"The theatre is aready been present pleas take another one",
                success:false
            })
        }

        const langFinding = await lanuages.findOne({name:languagename})
        if(!langFinding){
            return res.status(400).json({
                message:"The language is not present please check it",
                success:false
            })
        }
        const locationFinding = await Theatre.findOne({locationname:locationname})


        if(locationFinding){
            return res.status(400).json({
                message:"This location theatre is lalready beeen present",
                successs:false
            })
        }


        const TheateformatFindnig = await Theatre.findOne({theatreformat:theatreformat})
        if(TheateformatFindnig){
            return res.status(400).json({
                message:"This theatre format is already been availabe please take another one",
                success:false
            })
        }
        // const theatreImageArray = Array.isArray(theatreImage)?theatreImage:[theatreImage]
                        const now = new Date()
                        const pattern = date.compile('ddd, YYYY/MM/DD HH:mm:ss');
                        let ps = date.format(now, pattern);
                        
                                    // const uploadingImage = await uploadDatatoCloudinary(theatreImage,process.env.CLOUDINARY_FOLDER_NAME,1000,1000)
                                    const uploadingImage = await Promise.all(
                                        theatreImage.map(async(file)=>{
                                            let ats = await uploadDatatoCloudinary(file,process.env.CLOUDINARY_FOLDER_NAME,1000,1000)
                                            console.log("This is the multiple",ats)
                                            return ats.secure_url
                                        })
                                    )
                                    // console.log("This is th thestre image",theatreImage)

                                    // console.log("This is the uploaded image",uploadingImage)

        const CreateTheatre =  await Theatre.create({
            Theatrename:name,
            locationname:locationname,
            locationurl:locationurl,
            languagesavailable:langFinding,
            theatreformat:theatreformat,
            CreationDate:ps,
            locationimagesurl:uploadingImage
        }) 

        console.log("THis is the theatre that has been creatd",CreateTheatre)
        return res.status(200).json({
            message:"The theatre is been created",
            success:true

        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the create theatre code",
            success:false
        })
    }
}



exports.updateTheatrename = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the ",
            success:false
        })
    }
}



exports.GetAllTheatres = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}