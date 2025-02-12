require('dotenv')
const cloudinary  = require('cloudinary').v2
exports.CloudConnect = async()=>{
    try {
        cloudinary.config({
            cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_API_SECRET,
        })   
        return `The Connection to the cloudinary is been done`.bgGreen 
    } catch (error) {
        console.log(error);
        console.log("error in th cloud connection")   
    }
}