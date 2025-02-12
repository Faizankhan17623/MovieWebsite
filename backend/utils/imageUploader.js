const cloudinary = require('cloudinary').v2
exports.uploadDatatoCloudinary  = async(file,folder,height,quality)=>{
    const options = {folder}
    if(height){
        options.height = height
    }
    if(quality){
        options.quality = quality
    }
    options.resource_type = "auto"
    // console.log("Theseare allthe options",options)
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}