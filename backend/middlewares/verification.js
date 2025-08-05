require('dotenv').config()
const jwt = require('jsonwebtoken');
const USER = require('../models/user');

exports.auth = async (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.headers['authorization']
        // console.log(token)
        if (token && token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
}

        if (!token) {
            return res.status(401).json({
                message: "You are not logged in. Please log in.",
                success: false 
            });
        }

        // Verify token instead of signing it
        const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        // console.log("Decoded Token:", decode);
        // console.log(decode)
        if (!decode) {
            return res.status(400).json({
                message: "Invalid token format",
                success: false
            });
        }

        req.USER = decode.id; // Attach decoded user to request
        next();

    } catch (error) {
        console.log("Error in auth middleware:", error.message);
        return res.status(500).json({
            message: "There is an error in the auth middleware",
            success: false
        });
    }
};

exports.IsAdmin = async (req, res, next) => {
    try {
        const Finding = await USER.findOne({ id: req.USER.id });
        // console.log("Finding in IsAdmin:", Finding);
        if (!Finding) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (Finding.usertype === 'Administrator') {
            // console.log('Allowed');
            next();
        } else {
            return res.status(403).json({
                message: "You are not allowed to access this route",
                success: false
            });
        }
    } catch (error) {
        console.log("Error in IsAdmin middleware:", error.message);
        return res.status(500).json({
            message: "There is an error in the IsAdmin middleware",
            success: false
        });
    }
};

exports.IsOrganizer = async (req, res, next) => {
    try {
        const Finding = await USER.findOne({ id: req.USER.id });
        // console.log("Finding in IsOrganizer:", Finding);
        if (!Finding) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (Finding.usertype === 'Organizer') {
            // console.log('Allowed');
            next();
        } else {
            return res.status(403).json({
                message: "You are not allowed to access this route",
                success: false
            });
        }
    } catch (error) {
        console.log("Error in IsOrganizer middleware:", error.message);
        return res.status(500).json({
            message: "There is an error in the IsOrganizer middleware",
            success: false
        });
    }
};



exports.IsUSER = async (req, res, next) => {
    try {
        const Finding = await USER.findOne({ id: req.USER.id  });
        // console.log("Finding in IsUSER:", Finding);
        if (!Finding) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (Finding.usertype === 'Viewer') {
            // console.log('Allowed');
            next();
        } else {
            return res.status(403).json({
                message: "You are not allowed to access this route ",
                success: false
            });
        }
    } catch (error) {
        console.log("Error in IsAdmin middleware:", error.message);
        return res.status(500).json({
            message: "There is an error in the IsAdmin middleware",
            success: false
        });
    }
};

exports.IsTheatrer = async (req, res, next) => {
    try {
        const Finding = await USER.findOne({ id: req.USER.id });
        // console.log("Finding in IsTheatrer:", Finding);
        if (!Finding) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (Finding.usertype === 'Theatrer') {
            // console.log('Allowed');
            next();
        } else {
            return res.status(403).json({
                message: "You are not allowed to access this route",
                success: false
            });
        }
    } catch (error) {
        console.log("Error in Theatrer middleware:", error.message);
        return res.status(500).json({
            message: "There is an error in the Theatrer middleware",
            success: false
        });
    }
};
