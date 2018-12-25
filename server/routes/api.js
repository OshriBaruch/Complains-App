const express = require('express')
const complains = require('../model/complains')
const router = express.Router()
const bodyParser = require('body-parser')
const request = require('request');
const moment = require('moment');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))



module.exports = router

router.get('/company/:companyName', function (req, res) {
    let companyName = req.params.companyName
    let company = complains.find({name : companyName}, function (err, companys) {
        res.send(companys)
    })
    if (!(company)) {
        request(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${companyName}`, function (error, response) {
            if (error) { res.send('apixu_API :error ' + error) }
            let companyAPI = JSON.parse(response.body)
            if (!(response.body)) { console.log("no data from API") }
            else {
                res.send({
                    name: companyAPI[0].name,
                    updated: moment().format('LLLL'),
                    logo: companyAPI[0].logo,
                    domain: companyAPI[0].domain
                })
            }
        })
    } else { alert("company Not Fond") }
});

router.get('/', function (req, res) {
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})

// router.post('/city', function (req, res) {
//     const city = new City(req.body)
//     city.save()
//     res.send("city saved")
// })

// router.delete('/city/:cityName', function (req, res) {
//     console.log("req.params.cityName " + req.params.cityName)
//     City.remove({ name: req.params.cityName })
//         .exec(function (err, city) {
//             res.send(`${city.name} delete`)
//         })
// })
