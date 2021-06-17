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
 * /scorers Route, get top scorers
 *
 *
*/
router.get('/scorers', function (req, response) {
    const opt = {
        headers: {
            "X-Auth-Token": process.env.API_KEY,
            'Accept': 'application/json'
        }
    };

    axios.get(process.env.URL + "/scorers", opt)
        .then((resp) => {
            response.set('Content-Type', 'text/html');
            response.render('scorers', {result: resp.data});
        })
        .catch((error => {
            console.log(error);
        }));
});

module.exports = router;
