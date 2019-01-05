const express = require('express')

const router = express.Router()
const bodyParser = require('body-parser')
const request = require('request');
const moment = require('moment');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const companies = require('../model/Companies')
const complains = require('../model/Complains')
const users = require('../model/Users')

router.get('/company/:companyName', function (req, res) {
    let companyName = req.params.companyName
    companies.find({ companyName: companyName })
        .populate({
            path: 'complains',
            populate: {
                path: 'user'
            }
        })
        .exec(function (err, response) { res.send(response) })
});

router.get('/companyFooter/', function (req, res) {
    companies.find({}).populate('complains').exec(function (err, response) {
        let array = []
        response.forEach(g => array.push(g.companyName))
        let mostCompanies = {}
        for (let i of array) {
            mostCompanies[i] ? mostCompanies[i]++ : mostCompanies[i] = 1
        }
        sortObject = (obj) => {
            let footerArr = [];
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    footerArr.push({
                        'key': prop,
                        'value': obj[prop]
                    });
                }
            }
            footerArr.sort((a, b) => { return a.value - b.value; });
            return footerArr;
        }
        let footerArr = sortObject(mostCompanies);
        res.send(footerArr.reverse());
    })
});

router.get('/APIReq/:companyName', async function (req, res) {
    let companyName = req.params.companyName
    await request(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${companyName}`, function (error, response) {
        if ((error) || (response.body == "[]") || (response == "undefined")) { res.send('not found') } else {
            let companyAPI = JSON.parse(response.body)
            res.send({
                name: companyAPI[0].name,
                updated: moment().format('LLLL'),
                logo: companyAPI[0].logo,
                domain: companyAPI[0].domain
            })
        }
    });
})

router.post('/company', function (req, res) {
    let company = req.body
    let companie = new companies({
        companyName: company.companyName,
        companyDomain: company.companyDomain,
        companyLogo: company.companyLogo,
        complains: []
    })
    let user = new users({
        name: company.userName,
        email: company.userEmail,
        complains: [],
    })
    let complain = new complains({
        user: user,
        date: moment().format('LLLL'),
        title: company.complainsTitle,
        upVote: 1,
        text: company.complainsText,
        company: companie
    })

    companie.complains.push(complain)
    user.complains.push(complain)

    companie.save()
    complain.save()
    user.save()

    res.send("city saved")
})

module.exports = router