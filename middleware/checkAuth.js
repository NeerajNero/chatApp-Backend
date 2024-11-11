const jwt = require('jsonwebtoken')

const checkToken = (socket ,next) => {
    const token = socket.handshake.auth.access_token   
    console.log("Received token:", token);
    if(!token){
        console.error("Authentication error: No token provided");
        return next(new Error("Authentication error: No token provided"));
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        socket.userID = decoded.userId;
        socket.userName = decoded.userName;
        console.log("Token verified successfully, userID:", socket.userID);
        next()
    }catch(error){
        next(new Error("Authentication error: Invalid token"));
    }
}

module.exports = checkToken