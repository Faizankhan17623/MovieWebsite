const Theatres = require('../../models/Theatres')
exports.GetAllTheatreDetails = async(req,res)=>{
    try {
        const Finding = await Theatres.find({});
        if(!Finding) {
            return res.status(404).json({ message: "No theatres created" });
        }        

        return res.status(200).json({message:"All theatres",success:true,Finding:Finding})
    } catch (error) {
        console.log(error)
        console.log("Error in GetAllTheatreDetails controller",error.message)
        res.status(500).json({message:"Internal Server Error"});
    }
}