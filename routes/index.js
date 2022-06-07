const router = require("express").Router();
const { send } = require("express/lib/response");
const Beach = require('../models/Beach.model');
const axios = require('axios')

/* GET home page */
router.get("/", async (req, res, next) => {
// const beachesResponse = await Beach.find()
// console.log(beachesResponse); 
  res.render("index");
});

router.get('/forecast', async (req, res, next) => {
  const beachesResponse = await Beach.find()
  console.log(beachesResponse); 
    res.render("forecast", {beachesResponse});
  });

router.get('/forecast-detail/:id', async (req, res) => {
  try {
    const {id} = req.params
    const singleSpot = await axios.get(`https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${id}&days=1&intervalHours=24&maxHeights=false`)
    
  const beach = await Beach.findOne({spotId:req.params.id})
  const humanRelation = singleSpot.data.data.wave[0].surf.humanRelation;
  const max = singleSpot.data.data.wave[0].surf.max;
  const min= singleSpot.data.data.wave[0].surf.min;
  const spotDetails = {
    humanRelation:humanRelation,
    max : max,
    min: min,
    beach:beach
}
  // console.log('beach', max, min)
  res.render('forecast-detail', {spotDetails})
  } catch (error) {
    console.log('We have an error', error)
  }
})


    


module.exports = router;

