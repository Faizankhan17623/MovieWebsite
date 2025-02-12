const genre = require('../../models/genre')
const subgenre = require('../../models/subgenre')
exports.CreateSubgenre = async(req,res)=>{
    try {
        const {id,subgenrename} = req.body

        const finding = await genre.findOne({_id:id})
        if(!finding){
            return res.status(404).json({
                message:"The genre is not been found",
                success:false
            })
        }

        const sub = await subgenre.findOne({name:subgenrename})
        if(sub){
            return res.status(404).json({
                message:"The sub genre is already been present please create another one",
                success:false
            })
        }

        const Creation = await subgenre.create({name:subgenrename})
        const {_id} = Creation
        const updating = await genre.findByIdAndUpdate(id,{$push:{subgeneres:_id}},{new:true})
        return res.status(200).json({
            message:"The sub genre is been created",
            success:true
        })

    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the create genre code",
            success:false
        })       
    }
}