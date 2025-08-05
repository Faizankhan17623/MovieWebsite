// This is going to be a backend controller that will help me to get all the backend usr data and match it in the frontends
const USER = require('../../models/user')

exports.GetAlluserDetails = async(req,res)=>{
    try{
        const id = req.USER.id
        const Details = await USER.findById(id)
        if(!Details){
            return res.status(400).json({
                message:"There is no user present in the database",
                success:false
            })
        }
        return res.json({
            success:true,
            message:"All the user details are present",
            data:Details
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

exports.FindUserNames = async (req, res) => {
  const { FirstName, LastName } = req.body; // Assuming POST
  try {
    if (!FirstName || !LastName) {
      return res.status(400).json({
        message: "Please provide both First Name and Last Name",
        success: false,
      });
    }
    const userName = `${FirstName} ${LastName}`; // Use template literal for clarity
    const user = await USER.findOne({ userName:userName });
    if (!user) {
      return res.status(200).json({
        message: "Username is available",
        success: true,
      });
    }
    return res.status(409).json({
      message: "Username already taken",
      success: false,
    });
  } catch (error) {
    console.error("Error checking username:", error); // Improved logging
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


exports.FindEmail = async (req,res)=>{
    const {email} = req.body
    try{
        if(!email){
        return res.status(400).json({
            message:"Please provide an email",
            success:false
        })
    }
        const user = await USER.findOne({email:email})
        if(!user){
            return res.status(200).json({
                message:"Email is Available",
                success:true
            })
        }

        return res.status(409).json({
            success:true,
            message:"Email is already taken",
            data:user
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

exports.FindNumber = async (req,res)=>{
    const {number} = req.body

    try{
        if(!number){
        return res.status(400).json({
            message:"Please provide a number",
            success:false
        })
    }
        const user = await USER.findOne({number:number})
        if(!user){
            return res.status(200).json({
                message:"Number is Available",
                success:true
            })
        }
        return res.status(409).json({
            success:true,
            message:"Number is already taken",
            data:user
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}