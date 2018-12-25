const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const request = require('request');
const moment = require('moment');
const companies = require('../model/Companies')
const complains = require('../model/Complains')
const users = require('../model/Users')


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/company/:companyName', function (req, res) {
    let companyName = req.params.companyName
    companies.findOne({ companyName: companyName })
        .populate({
            path: 'complains',
            populate: {
                path: 'user'
            }
        })
        .exec(function (err, response) {
        if (response == []) { res.send("not Found") } else { res.send(response) }
    })
});

const getAPIFunc = (companyName) => {
    request(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${companyName}`, function (error, response) {
        if (error) { return 'apixu_API :error ' + error }
        let companyAPI = JSON.parse(response.body)
        if (!(response.body)) { return "no data from API" }
        else {
            return ({
                name: companyAPI[0].name,
                updated: moment().format('LLLL'),
                logo: companyAPI[0].logo,
                domain: companyAPI[0].domain
            })
        }
    })
}

router.get('/APIReq/:companyName', async function (req, res) {
    let companyName = req.params.companyName
    let data = await getAPIFunc(companyName)
    res.send(data)
});

const saveToDBFunc=(company)=>{
    let companie = new companies({
        companyName: company.companyName,
        companyDomain: company.companyDomain,
        companyLogo: company.companyLogo,
        complains: []
    })

    let user = new users({
        name: company.complains[0].user.name,
        email: company.complains[0].user.email,
        complains: [],
    })

    let complain = new complains({
        user: user,
        date: moment().format('LLLL'),
        title: company.complains[0].title,
        upVote: 1,
        text: company.complains[0].text,
        company: companie
    })

    companie.complains.push(complain)
    user.complains.push(complain)

    companie.save()
    complain.save()
    user.save()
}
router.post('/company', function (req, res) {
    let company = req.body
    saveToDBFunc(company)
    res.send("city saved")
})


module.exports = router