const genre = require('../../models/genre')
const Subgenre = require('../../models/subgenre')
exports.Creategenre = async(req,res)=>{
    try {
        const {genrename} = req.body

        const Finding = await genre.findOne({genreName:genrename})
        const SubFinding = await Subgenre.findOne({name:genrename})
        if(Finding){
            return res.status(400).json({
                message:"This genere is already present please create an another one",
                success:false
            })
        }

        if(SubFinding){
            return res.status(400).json({
                message:"This genere is already present in the sub genere plese re check what you are uploading",
                success:false
            })
        }

        const Creation = await genre.create({genreName:genrename})
        return res.status(200).json({
            message:"The genere is been created",
            success:true,
            data:Creation
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the create show code",
            success:false
        })       
    }
}