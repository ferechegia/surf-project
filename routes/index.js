const router = require("express").Router();
const { send } = require("express/lib/response");
const Beach = require('../models/Beach.model');

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
const beach = await Beach.findOne({spotId:req.params.id})
console.log('beach', beach)
res.render('forecast-detail', {beach})
})
    


module.exports = router;

