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
        res.json({
            success:true,
            message:"All the user details are present",
            data:Details
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}