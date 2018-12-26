const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: String,
    email: String,
    complains: [{
        type: Schema.Types.ObjectId,
        ref: 'Complains'
    }],

})

const Users = mongoose.model("Users", usersSchema)

module.exports = Users