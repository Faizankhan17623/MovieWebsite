const USER = require('../../models/user')
const SendMessage = require('../../models/Createmessage')
const CreateShow = require('../../models/CreateShow')
exports.SendPersonalMessage = async(req,res)=>{
    try{

        const {to,message,type} = req.body 

        const Types = ['Personal']

        if(!Types.includes(type)){
            return res.status(400).json({
                message: "The input type is not valid. Please check your types.",
                success: false
            });
        }

        // console.log("Thesea are the checked types",TypeChecking)

        const nameFinding = await USER.findOne({_id:to})

        console.log("This is the name Finding",nameFinding)
        if(!nameFinding){
            return res.status(400).json({
                message:"This user name is not been found",
                success:false
            })
        }

        const {userName} = nameFinding


        let Creation;
        if(type === 'Personal'){
            if(!to || !message || !type){
                return res.status(400).json({
                    message:"The inputs are been required",
                    success:false
                })
            }
            Creation = await SendMessage.create({
                to:to,
                message:message,
                typeOfmessage:type,
                personalMessage:true,
                professionalMessage:false,
                showid:false
            })

            await USER.updateOne({_id:to},{$push:{MessageReceivedPersonal:Creation._id}})

            return res.status(200).json({
                message:`The Personal message is been send to the username ${userName}`,
                success:true,
                data:Creation
            })
        }
    }catch(error){
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the personal message sending code",
            success:false
        })
    }
}


exports.SendProfessionalMessage = async(req,res)=>{
    try {

        const {to,message,type,id} = req.body 

        const Types = ['Professional']

        if(!Types.includes(type)){
            return res.status(400).json({
                message: "The input type is not valid. Please check your types.",
                success: false
            });
        }

        const nameFinding = await USER.findOne({_id:to})
        const Finding = await CreateShow.findOne({_id:id})
        
        if(!Finding){
            return res.status(400).json({
                message:"This id is not valid or please re-check it",
                success:false
            })
        }
        // console.log("This is the name Finding",nameFinding)
        if(!nameFinding){
            return res.status(400).json({
                message:"This user name is not been found",
                success:false
            })
        }

        const {userName} = nameFinding

        let Creation;
        if(type === 'Professional'){
            if(!to || !message || !type ||!id ){
                return res.status(400).json({
                    message:"The inputs are been required",
                    success:false
                })
            }
            Creation = await SendMessage.create({
                to:to,
                message:message,
                typeOfmessage:type,
                personalMessage:false,
                professionalMessage:true,
                showid:id
            })

            await CreateShow.updateOne({_id:to},{$push:{customeMessage:Creation._id}})

            return res.status(200).json({
                message:`The Personal message is been send to the username ${userName}`,
                success:true,
                data:Creation
            })
        }

    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the professional message sending code",
            success:false
        })
    }
}