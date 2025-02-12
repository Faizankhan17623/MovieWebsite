const { bgCyan } = require('colors')
const cast = require('../../models/Createcast')
const {uploadDatatoCloudinary}= require('../../utils/imageUploader')
exports.CreateCast = async(req,res)=>{
    try {
        const {name} = req.body
        const image = req.files.image
        if(!req.files || !req.files.image){
            return res.status(400).json({
                message:"The images are been important",
                success:false
            })
        }

        if(!name){
            return res.status(400).json({
                message:"the input field is been required",
                success:false
            })
        }

        const imageUploading = await uploadDatatoCloudinary(image,process.env.CLOUDINARY_FOLDER_NAME,1000,1000)
            const creation = await cast.create({
                name:name,
                images:imageUploading.secure_url
            })
            console.log(`The image is been uploaded`.bgRed)
        // console.log(imageUploading)
        return res.status(200).json({
            message:"The cast for the show is been created",
            success:true,
            data:creation
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the  create cast code",
            success:false
        })
    }
}