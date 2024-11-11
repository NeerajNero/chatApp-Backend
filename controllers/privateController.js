const privateRoute = (req,res) => {
    res.status(200).json({isAuthenticated: true})
}

module.exports = privateRoute