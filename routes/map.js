const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
router.route('/')
    .get(async (req, res) => {
        res.render('map', { userLogged: req.session.logged, name: req.session.name })
    });
//console.log(req.query);
router.get('/pubs', async (req, res) => {
    //let response = await fetch(`https://kudago.com/public-api/v1.4/places/?lang=&fields=&expand=&order_by=&text_format=&ids=&location=&has_showings=&showing_since=1444385206&showing_until=1444385206&categories=pub&lon=55.7089923&lat=37.5923362&radius=100000`);
    let response = await fetch(`https://kudago.com/public-api/v1.4/places/?lang=&fields=&expand=&order_by=&text_format=&ids=&location=&has_showings=&showing_since=1444385206&showing_until=1444385206&categories=pub&lon=37.5923362&lat=55.7089923&radius=100000`);
    if (response.ok) {
        // res.render('map')
        let pubs = await response.json()
        //console.log(await response.json());
        // console.log(a);

        res.json(pubs);
    } else {
        res.send("Ошибка HTTP: " + response.status);
    }
})

//.post(async (req, res, next) => {
//console.log(req.body.lat, req.body.long)
// })

module.exports = router;

