const jwt = require('jsonwebtoken')

const checkAuthToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json({isAuthenticated: false})
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    }catch(error){
        res.status(500).json({isAuthenticated: false})
    }
}
module.exports = checkAuthToken