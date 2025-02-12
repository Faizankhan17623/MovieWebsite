require('dotenv').config()
const date = require('date-and-time')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser  = require('cookie-parser')
const user = require('../../models/user')
exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(500).json({
                message:"The input fields are been required",
                success:false
            })
        }

        const Finding = await user.findOne({email}).populate('resetPasswordExpires','Bannerliked','Bannerhated')
        if(!Finding){
            return res.statu(404).json({
                message:"The email is not been found",
                success:false
            })
        }

        const compare = await bcrypt.compare(password,Finding.confirmpass)
        if(compare === true){
            const {email,userName,usertype,verified,number,_id} = Finding
            const now = new Date();
            const pattern = date.compile('DD/MM/YYYY HH:mm:ss');
            let lastLoginTime = date.format(now, pattern);
            // console.log("This is the id",_id)
            const login = await user.findByIdAndUpdate(_id,{verified:true},{new:true})
            await user.updateOne({$push:{lastlogin:lastLoginTime}})
            user.id = _id
            console.log("This is the login code",login)
            const jwtCreation = jwt.sign({email:email,userName:userName,usertype:usertype,verified:verified,number:number,id:_id},process.env.JWT_PRIVATE_KEY,{ expiresIn: '24h', algorithm: 'HS256' })
            const options = {
                expires:new Date (Date.now() + 2 * 24 * 60 * 60 * 1000),
                secure:false,
                httpOnly:true
            }

            res.cookie('token',jwtCreation,options).status(200).json({
                message:"The user is been loged in",
                success:true,
                data:jwtCreation
            })
        }
    }catch(error){
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"error in the login code",
            success:false
        })
    }
}