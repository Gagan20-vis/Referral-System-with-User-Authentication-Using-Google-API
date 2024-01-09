const Token = require('../models/token')
const User = require('../models/user')
const Verify = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.send('Invalid link');
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        })
        if (!token) return res.send('Invalid link');
        await User.updateOne(
            { _id: user._id },
            { $set: { verified: true } }
        );
        await Token.findByIdAndDelete(token._id);
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div className="container" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div className="heading">
                    <h1>Your Email is Verified</h1>
                </div>
                <div className="content"
                    style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-bottom: 4rem;">
                    <p style="text-align: center; margin-bottom: 2.5rem;">Click the button to login now !</p>
                    <a href="localhost:5173/login" style="background-color: black; color: white; padding: 10px 20px; border: 1px solid black; cursor: pointer;">Login</a>
                </div>
            </div>
        </body>
        </html>
        `);
    } catch (error) {
        console.log(error)
        res.json({sucess:false,field:'error'})
    }
}
module.exports = Verify;