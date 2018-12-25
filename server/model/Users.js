const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://mongodb+srv://localHost/complainDB', {
    useNewUrlParser: true
})

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