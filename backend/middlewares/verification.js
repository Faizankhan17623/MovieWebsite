require('dotenv')
// This middleware will only check for theif the usertype is administrator
const jwt = require('jsonwebtoken')
const USER = require('../models/user')
exports.auth = async(req,res,next)=>{
    try {
        const token = req.body.token || req.cookies.token || req.headers('token')
        // console.log("This is the user toekn",token)
        if(!token){
            return res.status(404).json({
                message:"you are not log in please log in",
                success:false
            })
        }

        const decode = jwt.verify(token,process.env.JWT_PRIVATE_KEY)
        req.USER = decode
        next()
    } catch (error) {
        console.log(error)
        console.log("This is the error message",error.message)
        return res.status(500).json({
            message:"there is an error in the auth middleware",
            success:false
        })
    }
}


exports.IsAdmin = async(req,res,next)=>{
    try{
        const Finding = await USER.findOne({email:req.USER.email})
        if(Finding.usertype !== 'Viewer' && Finding.usertype !== 'Organizer'){
            console.log('allowed')
            next()
            console.log("This are all the Finding from thr is admin",Finding)
        }else{
            console.log('not allowed')
            return res.status(404).json({
                message:"you are not allowed to enter This route",
                success:false
            })
        }
    }catch(error){
        console.log(error)
        console.log("This is the error message",error.message)
        return res.status(500).json({
            message:"there is an error in the isAdmin middleware",
            success:false
        })
    }
}

exports.IsOrganizer = async(req,res,next)=>{
    try {
        const Finding = await USER.findOne({email:req.USER.email})
        if(Finding.usertype !== 'Viewer' && Finding.usertype !== 'administrator'){
            console.log('allowed')
            next()
            console.log("This are all the Finding from the orgsinezer",Finding)
        }else{
            console.log('not allowed')
            return res.status(404).json({
                message:"you are not allowed to enter This route",
                success:false
            })
        }
    } catch (error) {
        console.log(error)
        console.log("This is the error message",error.message)
        return res.status(500).json({
            message:"there is an error in the isOrgainezer middleware",
            success:false
        })
    }    
}
