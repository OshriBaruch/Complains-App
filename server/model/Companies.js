const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://mongodb+srv://localHost/complainDB', {
    useNewUrlParser: true
})

const companiesSchema = new Schema({
    companyName: String,
    companyDomain: String,
    companyLogo: String,
    complains: [{
        type: Schema.Types.ObjectId,
        ref: 'Complains'
    }]
})


const Companies = mongoose.model("Companies", companiesSchema)

module.exports = Companies