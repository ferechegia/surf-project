//https://services.surfline.com/kbyg/spots/forecasts/wave
const router = require("express").Router();

const Beach = require('../models/Beach.model')




router.get("/https://services.surfline.com/kbyg/spots/forecasts/wave", (req, res, next) => {
Beach.findOne({ wave })
console.log('wave')
});




  module.exports = router;