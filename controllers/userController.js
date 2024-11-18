const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const register = async(req,res) => {
    try{
        const findUser = await User.findOne({userName: req.body.userName})
    if(findUser){
        return res.status(401).json({message: "user already exists"})
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
        userName : req.body.userName,
        fullName: req.body.fullName,
        password: hashedPassword
    }
    const saveUser = new User(newUser);
    await saveUser.save();
    res.status(201).json({message: "user created successfully"})
    }catch(error){
        console.log('Error saving user:', error);
        res.status(500).json({message: "unable to create new user"})
    }
}

const login = async(req,res) => {
    try{    
        const findUser = await User.findOne({userName: req.body.userName})
        if(!findUser){
            return res.status(401).json({message: "wrong userName or user doesnt exist"})
        }
        const comparePassword = await bcrypt.compare(req.body.password, findUser.password)
        if(!comparePassword){
            return res.status(401).json({message: "wrong password"})
        }
        const payload = {
            userName: findUser.userName,
            userId: findUser._id
        }
        const secretKey = process.env.SECRET_KEY
        const token = await jwt.sign(payload, secretKey, {expiresIn: "1d"})
        res.cookie('access_token', token, {httpOnly: true, secure: true, sameSite: 'none', maxAge: 3600000,})
        res.status(200).json({message: "logeed in successfully", payload})
    }catch(error){
        res.status(500).json({message: "unable to login"})
    }
}

module.exports = {login,register}