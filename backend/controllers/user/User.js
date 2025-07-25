// This is going to be a backend controller that will help me to get all the backend usr data and match it in the frontends
const USER = require('../../models/user')
exports.GetAlluserDetails = async(req,res)=>{
    try{
        const Details = await USER.find({})
        if(!Details){
            return res.status(400).json({
                message:"There is no user present in the database",
                success:false
            })
        }
        return res.json({
            success:true,
            message:"All the user details are present",
            data:Details
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

exports.FindUserNames = async (req,res)=>{
    const {FirstName,LastName} = req.body
    try{
        if(!FirstName || !LastName){
            return res.status(400).json({
                message:"Please provide both First Name and Last Name",
                success:false
            })
        }
        const Names = FirstName + " " + LastName
        const user = await USER.findOne({userName:Names})
        if(!user){          
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
        return res.status(200).json({
            message: "Username is available",
            success: true
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

exports.FindEmail = async (req,res)=>{
    const {email} = req.body
    if(!email){
        return res.status(400).json({
            message:"Please provide an email",
            success:false
        })
    }
    try{
        const user = await USER.findOne({email:email})
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
         return res.json({
            success:true,
            message:"User found",
            data:user
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

exports.FindNumber = async (req,res)=>{
    const {number} = req.body
    if(!number){
        return res.status(400).json({
            message:"Please provide a number",
            success:false
        })
    }
    try{
        const user = await USER.findOne({number:number})
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
        return res.json({
            success:true,
            message:"User found",
            data:user
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}