const jwt = require('jsonwebtoken')
const cookie = require('cookie');

const checkToken = (socket ,next) => {
    const token = socket.handshake.headers.cookie;  
    console.log("Received token:", token);
    if(token){
        const cookies = cookie.parse(token);
    const accessToken = cookies.access_token; 
    console.log("Access Token:", accessToken);
  } else {
    console.log("No cookies found!");
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