const User = require('../models/user')
const Refer = require('../models/refer')
const deleteAccount = async (req, res) => {
    try {
        const userId = await User.findOne({ email: req.session.currUser.email }, { _id: 1 });
        await User.deleteOne({ _id: userId._id });
        await Refer.deleteOne({ user: userId._id });
        res.json({ success: true, message: "User account deleted" });
    }
    catch (e) {
        console.log(e);
    }
}
module.exports = deleteAccount