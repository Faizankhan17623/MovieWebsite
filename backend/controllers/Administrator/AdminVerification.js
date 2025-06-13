
const USER = require('../../models/user')
const SendMessage = require('../../models/Createmessage')
const mailSender = require('../../utils/mailsender')
const sendingOtpTeemplate = require('../../templates/userTemplates/emailTemplate')

// This route is present in the admin route on the line no 15
exports.VerifyOrgainezer = async (req, res) => {
  try {
    const { id, verify } = req.body


    if (!id ||  typeof verify !== 'string') {
      return res.status(400).json({
        message: "The id and verify status are required to verify the organizer",
        success: false
      })
    }
    const user = await USER.findOne({ _id: id })

    if (!user) {
      return res.status(400).json({
        message: "The user ID is not present please check your inputs",
        success: false
      })
    }

    if (user.usertype !== "Organizer") {
      return res.status(400).json({
        message: "The user is not an organizer",
        success: false
      })
    }

    if (verify === 'true') {
        try{
            await USER.findByIdAndUpdate(id, { verified: verify }, { new: true })
             await mailSender(user.email,"The Verification of the orgaiser is been done",sendingOtpTeemplate(verify))
            return res.status(200).json({
                message: "The user has been verified",
                success: true
            })
        }catch(error){
            console.log(error)
            console.log(error.message)
            return res.status(500).json({
                message: "There is an error while sending the verification email",
                success: false
            })
        }
    }

    if (verify === 'false') {
        try{
            const newMessage = await SendMessage.create({
                to: id,
                message: ["Your account verification request was declined."],
                typeOfmessage: 'Personal'
              })
        
            //   console.log(newMessage)
              await USER.findByIdAndUpdate(id, { verified: verify } , { new: true })
            
              await USER.findByIdAndUpdate(id, {$push:{messageReceived:newMessage._id}},{ new: true })
                await mailSender(user.email,newMessage.message[0],sendingOtpTeemplate(verify))


              return res.status(200).json({
                message: "Verification declined and message sent to the user",
                success: true
              })
        }catch(error){
            console.log(error)
            console.log(error.message)
            return res.status(500).json({
                message: "There is an error while sending the verification email",
                success: false
            })
        }
      // Send a message to the organizer
    }

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: "There is an error in the verification code",
      success: false
    })
  }
}
// This route is present in the admin route on the line no 18
exports.GetAllorg = async(req,res)=>{
    try{
        const Finding = await USER.find({usertype:'Organizer',verified:false})
        if(!Finding){
            return res.status(400).json({
                message:"There are no org present for the verification",
                success:false
            })
        }
        return res.status(200).json({
            message:"These are all the org users",
            successs:true,
            data:Finding,
        })
    }catch(error){
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the Get All orgainezer code",
            success:false
        })
    }
}

// This route is present in the admin route on the line no 16
exports.deleteOrgainezer = async(req,res)=>{
    try{
        const id = req.body
        if(!id){
            return res.status(500).json({
                message:"The user input is ben required",
                success:false
            })    
        }
        const Finders = await USER.findOne({_id:id},{usertype:'Organizer'})
        if(!Finders){
            return res.status(404).json({
                message:"The id is not been found",
                success:false
            })    
        }

        const Deletions = await USER.findByIdAndDelete({_id:Finders.id},{new:true})
        if(!Deletions){
            return res.status(400).json({
                message:"Cannot delete This user",
                success:false
            })
        }


        return res.status(200).json({
            message:"The user id is been deleeted",
            success:true,
            data:Deletions
        })

    }catch(error){
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the delete orgainezer code",
            success:false
        })
    }
}
// This route is present in the admin route on the line no 17
exports.DeleteAllOrgainezers = async(req,res)=>{
    try{
        const {id} = req.body
        if(!id){
            return res.status(500).json({
                message:"The user input is ben required",
                success:false
            })    
        }
        
        let lengthChecker = id.length
        if(lengthChecker < 1){
            return res.status(400).json({
                message:"you need t delete more than on id",
                success:false
            })
        }

        const Deletion = await USER.deleteMany({_id:id})
        if(!Deletion){
            return res.status(500).json({
                message:"The user is not been present or already beeen deleted",
                success:false
            })
        }


        return res.status(200).json({
            message:"The user is been deleted",
            success:true,
            data:Deletion
        })

    }catch(error){
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the delete all orgainezer at once  code",
            success:false
        })
    }
}
