const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

/**
 * Default Route, get group matches
 *
 *
*/
router.get('/', function (req, response) {
    const opt = {
        headers: {
            "X-Auth-Token": process.env.API_KEY,
            'Accept': 'application/json'
        }
    };

    axios.all([
        axios.get(process.env.URL + "/matches?season=2021&group=Group%20A", opt),
        axios.get(process.env.URL + "/matches?season=2021&group=Group%20B", opt),
        axios.get(process.env.URL + "/matches?season=2021&group=Group%20C", opt),
        axios.get(process.env.URL + "/matches?season=2021&group=Group%20D", opt),
        axios.get(process.env.URL + "/matches?season=2021&group=Group%20E", opt),
        axios.get(process.env.URL + "/matches?season=2021&group=Group%20F", opt)
    ]).then(axios.spread((resp1, resp2, resp3, resp4, resp5, resp6) => {
        response.set('Content-Type', 'text/html');
        response.render('index',
            {A: resp1.data, B: resp2.data,
                C: resp3.data, D: resp4.data,
                E: resp5.data, F: resp6.data});
    })).catch(error => {
        console.log(error);
    });
});

/**
 * /standings Route, get group standings
 *
 *
*/
router.get('/standings', function (req, response) {
    var opt = {
        method: 'GET',
        url: "https://" + process.env.HOST + "/tournaments/get-standings",
        params: {tournamentId: '1', seasonId: '26542'},
        headers: {
            'x-rapidapi-key': process.env.API_KEY2,
            'x-rapidapi-host': process.env.HOST
        }
    };

    axios.request(opt).then(function (resp) {
        response.set('Content-Type', 'text/html');
        response.render('standings', {result: resp.data.standings});
    }).catch(function (error) {
        console.error(error);
    });
});

/**
 * /scorers Route, get top scorers
 *
 *
*/
router.get('/scorers', function (req, response) {
    const opt = {
        method: 'GET',
        url: "https://" + process.env.HOST + "/tournaments/get-top-players",
        params: {tournamentId: '1', seasonId: '26542'},
        headers: {
            'x-rapidapi-key': process.env.API_KEY2,
            'x-rapidapi-host': process.env.HOST
        }
    };

    axios.request(opt).then(function (resp) {
        response.set('Content-Type', 'text/html');
        response.render('scorers', {result: resp.data.topPlayers.goals});
    }).catch(function (error) {
        console.error(error);
    });
});

/**
 * /playoff Route, get tournament bracket
 *
 *
*/
router.get('/playoff', function (req, response) {
    response.set('Content-Type', 'text/html');
    response.render('playoff');
});


module.exports = router;
