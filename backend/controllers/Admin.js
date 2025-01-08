const USER = require('../models/user')
// This is the route that will get all the orgaineser
exports.AdminController = async(req,res)=>{
    try {
        const Finding = await USER.find()
        let Organize = []
        console.log("These  are all the Findings and all the user  of all the types",Finding)
        if(Finding.usertype === "Organizer"){
            Organize.push(Finding)
            console.log("These are all the organizer")
        }
        return res.status(200).json({
            message:"These are all the orgainezer",
            success:true,
            data:Organize
        })
    } catch (error) {
        console.log(error)
        console.log("This is the error message",error.message)
        return res.status(500).json({
            message:"there is an error in the get all user code",
            success:false
        })
    }
}


exports.VerifyOrgaineser = async(req,res)=>{
    try {
        // This route will be used to give the orgainzer the permissions to like herre wee will verify them
        const {id} = req.body
        const Finding = await USER.findOne({_id:id})
        if(Finding.verified === true){
            return res.status(409).json({
                message:"This orgainezer is alread verified",
                success:false
            })
        }else{
            const changes = await USER.findByIdAndUpdate(Finding.id,{verified:true})
            console.log("These are all the changes",changes)
            return res.status(202).json({
                message:"the user is been verified create your first show",
                success:true
            })
        }
    } catch (error) {
        console.log(error)
        console.log("This is the error message",error.message)
        return res.status(500).json({
            message:"there is an error in the get all user code",
            success:false
        })
    }
}