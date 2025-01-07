require('dotenv')
const cloudinary  = require('cloudinary').v2
const CloudConnection = async ()=>{
    cloudinary.v2.config({
        cloud_name:"",
        api_key:"",
        api_secret:"",
        secure:true
    })
    .then(()=>{
        console.log("The cloudinary connection is been established")
    })
    .catch((error)=>{
        console.log(error);
        console.log("error in th cloud connection")
    })
}

module.exports = CloudConnection
