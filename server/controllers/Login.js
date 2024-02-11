const User = require('../models/user')
const Refer = require('../models/refer')
const bcrypt = require('bcryptjs');
const Login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.json({ success: false, field: 'user' });
        if (!user.verified) return res.json({ success: false, field: 'verify' });
        if (!(await bcrypt.compare(req.body.password, user.password))) return res.json({ success: false, field: 'password' });
        const refer = await Refer.findOne({ user: user._id });
        const currUser = {
            username: user.username,
            email: user.email,
            number: user.number,
            referCode: refer.referCode,
            referLink: refer.referLink,
            referedBy: refer.referedBy,
            referPoints: refer.referPoints,
            totalRefer: refer.totalRefer,
            totalSecondRefer: refer.totalSecondRefer,
            balance: refer.balance
        }
        req.session.currUser = currUser;
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false, field: 'error' });
    }
}
module.exports = Login;