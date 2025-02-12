const language = require('../../models/CreateHashtags')
exports.Createtags = async(req,res)=>{
    try {
        const {langname} = req.body
        const Finding = await language.findOne({name:langname})
        if(Finding){
            return res.status(400).json({
                message:"This name is already been taken please take another one",
                success:false
            })
        }
        const Creation = await language.create({name:langname})
        return res.status(200).json({
            message:"The tag is benn created",
            success:true
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the create language code ",
            success:false
        })
    }
}
