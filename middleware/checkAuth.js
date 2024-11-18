const jwt = require('jsonwebtoken')
const cookie = require('cookie');

const checkToken = (socket ,next) => {
    const cookies = socket.handshake.headers.cookie
    ? cookie.parse(socket.handshake.headers.cookie)
    : {};

  const token = socket.handshake.auth.access_token || cookies.access_token;
  console.log('Access Token:', token);

  if (!token) {
    console.error('Authentication token missing!');
    socket.disconnect();
    return;
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