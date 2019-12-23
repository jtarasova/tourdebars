const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Auction = require('../models/auction');

router.get('/new', async (req, res) => {
    res.render('./auction/new', { userLogged: req.session.logged, name: req.session.name })

})
router.post('/new', async function (req, res, next) {
    let ownerData = await User.getUserByName(req.session.name);
    newAuction = new Auction({
        title: req.body.title,
        condition: req.body.condition,
        start: req.body.start,
        end: req.body.end,
        description: req.body.description,
        owner: ownerData.name,
    });
    await newAuction.save();
    res.redirect(`/auction/${newAuction.id}`);
});

router.get('/:id', async function (req, res, next) {
    let auction = await Auction.findById(req.params.id);
    res.render('./auction/show', { auction, userLogged: req.session.logged, name: req.session.name });
});
router.put('/:id', async function (req, res, next) {
    let auction = await Auction.findById(req.params.id);
    auction.title = req.body.title;
    auction.body = req.body.body;
    await auction.save();

    res.redirect(`/auction/${auction.id}`);

});
router.delete('/:id', async function (req, res, next) {
    console.log(req.params.id);
    await Auction.deleteOne(req.params.id);
    res.redirect('/');
});

router.get('/:id/edit', async function (req, res, next) {
    let auction = await Auction.findById(req.params.id);
    res.render('auction/edit', { auction, userLogged: req.session.logged, name: req.session.name });
});
module.exports = router;