require('dotenv').config();
const date = require('date-and-time');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const USER = require('../../models/user');
// Done
// tHIS IS THE FUNCTION THAT WILL HELP US SO THAT THE ROUTE IS THE USE ROUTE AND IT IS PRESENTED ON LINIE NO 27
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required.",
                success: false
            });
        }

        const Finding = await USER.findOne({ email })
            .populate('resetPasswordExpires')
            .populate({path:'showsCreated',model:'Show'})
            .populate({path:'UserBannerliked',model:'Show'})
            .populate({path:'UserBannerhated',model:'Show'})
            .populate({path:'messageReceived',model:'Message'})
            .populate({path:'comment',model:'Comment'})
            .exec()

            if(Finding.usertype === 'Organizer'){
                return res.status(400).json({
                    message:"you are not allowed to use This route ",
                    success:false
                })
            }


            
        if (!Finding) {
            return res.status(404).json({
                message: "Email not found.",
                success: false
            });
        }

        const isPasswordValid = await bcrypt.compare(password, Finding.confirmpass);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Incorrect password.",
                success: false
            });
        }

        const { userName, usertype, verified, number, _id } = Finding;
        console.log(usertype)
        const now = new Date();
        const pattern = date.compile('DD/MM/YYYY HH:mm:ss');
        const lastLoginTime = date.format(now, pattern);

        // Restrict access for "organizer" and "administrator"
            // Allow only "viewer" role to proceed
        await USER.findByIdAndUpdate(_id, { verified: true }, { new: true });
        await USER.findByIdAndUpdate(_id, { $push: { lastlogin: lastLoginTime } }, { new: true });

        const jwtCreation = jwt.sign(
            { email, userName, usertype, verified, number, id: _id, lastlogin: lastLoginTime },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h', algorithm: 'HS256' }
        );

        // console.log(jwtCreation)
        const options = {
            expires : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly:true,
        };

        res.setHeader('token',jwtCreation,options)
        
        res.cookie('token', jwtCreation, options).status(200).json({
            message: "User logged in successfully.",
            success: true,
            token: jwtCreation
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Error in login process.",
            success: false
        });
    }
};
