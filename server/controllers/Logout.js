const logout = (req, res) => {
    req.session.destroy()
    res.json({success: true,message: "User logged out"})
}
module.exports = logout;