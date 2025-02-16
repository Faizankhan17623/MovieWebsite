const CreateShow = require('../../models/CreateShow')

exports.Verify = async(req,res)=>{
    try{

    }catch(error){
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the verify code",
            success:false
        })
    }
}