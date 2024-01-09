const profile = (req, res) => {
    if (req.session.currUser) return res.json({ valid: true, currUser: req.session.currUser });
    return res.json({ valid: false });
}
module.exports = profile;