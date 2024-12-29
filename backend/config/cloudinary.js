require('dotenv')
const clodinary = require('cloudinary')

const CloudConnection = async ()=>{
    await clodinary.v2.config({
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