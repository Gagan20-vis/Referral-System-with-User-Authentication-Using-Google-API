const mongoose = require('mongoose')
const { Schema } = mongoose;
const ReferSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
    },
    referCode: {
        type: String,
    },
    referLink: {
        type: String,
    },
    referedBy: {
        type: String,
        default: ''
    },
    referPoints: {
        type: Number,
        default: 0
    },
    totalRefer: {
        type: Number,
        default: 0
    },
    totalSecondRefer: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    }
})
const Refer = mongoose.model('refer', ReferSchema);
module.exports = Refer;