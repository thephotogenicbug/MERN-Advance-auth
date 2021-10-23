const jwt = require('jwt')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

exports.protect = async (req,res,next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        //Bearer CzrV4HupyTROzGB1WsIZ_3GFrPONOWw8hfBkJJezxr8
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
       return next(new ErrorResponse("Not authorized to access this route", 401))
    }

    try {
        const decoded = hwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById()
    } catch (error) {
        
    }
}