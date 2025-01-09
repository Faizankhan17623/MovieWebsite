    const USER = require('../models/user')
    // This is the route that will get all the orgaineser
    exports.AdminController = async(req,res)=>{
        try {
            const Finding = await USER.find()
            const org = Finding.filter( (user) => user.usertype === "Organizer")
            
            console.log("These are all the orgainezer",org)

            if(Finding.length === 0){
                return res.status(400).json({
                    message:"there are no users presnet",
                    success:false
                })
            }
            const {_id} = org
            console.log("These  are all the Findings and all the user  of all the types",Finding)
            return res.status(200).json({
                message:"These are all the orgainezer",
                success:true,
                data:org,  
                id:_id
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
            if(!id){
                return res.status(400).json({
                    message:"The input fields are required",
                    success:false
                })
            }
            const Finding = await USER.findOne({_id:id})
            if(!Finding){
                return res.status(404).json({
                    message:"This id is not been Found",
                    success:false,
                    id:id
                })
            }
            if(Finding.verified === true){
                return res.status(400).json({
                    message:"This id is already veerified please log in",
                    success:false
                })
            }else{
                const updating = await USER.findByIdAndUpdate(id,{verified:true},{new:true})
                console.log("This is the updating",updating)
                return res.status(200).json({
                    message:"The org  is beeen veerified",
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