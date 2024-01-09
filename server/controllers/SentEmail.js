const sendEmail = require('../utils/email');
const Token = require('../models/token')
const User = require('../models/user')
const Refer = require('../models/refer')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mongoose = require('mongoose');
function generateRandomString() {
    const getRandomNumber = () => Math.floor(Math.random() * 10);
    const getRandomLetter = () => String.fromCharCode(97 + Math.floor(Math.random() * 26));
    let randomString = '';
    for (let i = 0; i < 3; i++) randomString += getRandomNumber();
    for (let i = 0; i < 4; i++) randomString += getRandomLetter();
    return randomString;
}
const SentEmail = async (req, res) => {
    try {
        //Check is already user exists
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.json({ sucess: false, field: 'email' })
        let username = await User.findOne({ username: req.body.username });
        if (username) return res.json({ success: false, field: 'username' })

        //generate referral code
        const referCode = generateRandomString();

        // agar refer kiya gya he to kisne kiya he uski detail 
        let referBy = '';
        if (req.body.refer) {
            let referId = await Refer.findOne({ referCode: req.body.refer }, { user: 1 });
            if (referId) {
                const id = new mongoose.Types.ObjectId(referId.user);
                let referUser = await User.findOne({_id:id},{username:1,_id:1});
                referBy = { name: referUser.username, id: referUser._id };
            }
        }
        //hashing password
        const hashPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))

        //saving user
        user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            number: req.body.number,
        }).save();

        //saving user referral data and wallet data
        if (referBy) {
            await Refer.create({
                user: user._id,
                referCode: referCode,
                referLink: `http://locahost:8000/refer?id=${referCode}`,
                referedBy: referBy.name,
                referPoints: 20,
                balance: 2,
            })
            await Refer.updateOne(
                { user: referBy.id },
                { $inc: { totalRefer: 1, referPoints: 20, balance: 2 } }
            )
        }
        else {
            await Refer.create({
                user: user._id,
                referCode: referCode,
                referLink: `http://locahost:8000/refer?id=${referCode}`,
            })
        }
        let token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
        }).save();
        const html = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 4rem;
        }

        .content p {
            text-align: center;
            margin-bottom: 2.5rem;
        }

        .content a {
            background-color: black;
            color: white;
            padding: 10px 20px;
            border: 1px solid black;
            cursor: pointer;
            text-decoration: none;
        }

        .footer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        #span1 {
            font-style: italic;
            margin-bottom: 2rem;
        }
    </style>
</head>
<body>
    <div className="container">
        <div className="heading">
            <h1>Verify your email address</h1>
        </div>
        <div className="content">
            <p>Dear Gagan, thanks for signing up an account with the backend project. Please click the button below to verify your email address.</p>
            <a href="${process.env.BASE_URL}/user/verify/${user.id}/${token.token}">Verify Email</a>
        </div>
        <div className="footer">
            <span id="span1">Copyright &#169; 2024 Gagan. All rights reserved.</span>
            <span id="span2">Our mailing address is </span>
            <a href="mailto:gaganvishwakarma46@gmail.com">gaganvishwakarma46@gmail.com</a>
        </div>
    </div>
</body>
</html>
    `
        sendEmail(user.email, html);
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ sucess: false, field: 'error' });
    }
}
module.exports = { SentEmail }