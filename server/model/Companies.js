const mongoose = require('mongoose')
const Schema = mongoose.Schema

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