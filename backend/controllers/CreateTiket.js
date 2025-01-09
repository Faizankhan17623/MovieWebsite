exports.CreateShow = async(req,res)=>{
    try {
                
    } catch (error) {
        console.log(error)
        console.log("This is the error message",error.message)
        return res.status(500).json({
            message:"there is an error in the Show creatin code",
            success:false
        })
    }
}