const comment = require('../../models/Comment')
const CreateShow = require('../../models/CreateShow')
const USER = require('../../models/user')
const date = require('date-and-time')
exports.Comment = async(req,res)=>{
    try {
        const userId = req.USER.id
        console.log(`${userId}`.bgBlue)
        const id = req.query.id
        const {coment} = req.body
        if(!id){
            return res.status(500).json({
                message:"The input Fields are been required",
                success:false
            })
        }
        const Finding = await CreateShow.findOne({_id:id})
        if(!Finding){
            return res.status(500).json({
                message:"There is some mistake please check you inputs",
                success:false
            })
        }
        const now = new Date();
                    const pattern = date.compile('DD/MM/YYYY HH:mm:ss');
                    let ComemntTime = date.format(now, pattern);
        const Creation = await comment.create({
            Showid:id,
            data:coment,
            CreatedAt:ComemntTime
        })
        await USER.updateOne({_id:userId},{$push:{comment:Creation._id}})
        await CreateShow.updateOne({_id:id},{$push:{Comment:Creation._id}})

        return res.status(200).json({
            message:"you have commented on this show",
            success:true,
            data:Creation
        })

    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the comment code",
            success:false
        })
    }
}