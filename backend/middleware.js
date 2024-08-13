const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) { //if the authheader is not present and if it not starts with bearer the request is timed out with 403 rqst and an empty json object
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];//this is basically taking the token part excluding the string bearer

    try{
        const decoded = jwt.verify(token,JWT_SECRET);

        req.userId = decoded.userId;

        next();

    } catch(err){
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
};