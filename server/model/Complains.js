const mongoose = require('mongoose')
const Schema = mongoose.Schema

const complainsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    date: String,
    title: String,
    upVote: Number,
    text: String,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Companies'
    },

})

const Complains = mongoose.model("Complains", complainsSchema)

module.exports = Complains