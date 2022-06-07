const router = require("express").Router();
const { send } = require("express/lib/response");
const Beach = require('../models/Beach.model');
const User = require('../models/User.model');
const axios = require('axios');
const req = require("express/lib/request");
const res = require("express/lib/response");
const { findById } = require("../models/Beach.model");


/* GET home page */
router.get("/", async (req, res, next) => {
// const beachesResponse = await Beach.find()
// console.log(beachesResponse); 
  res.render("index");
});

router.get('/forecast', async (req, res, next) => {
  const beachesResponse = await Beach.find()
  // console.log(beachesResponse); 
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


router.post('/forecast-detail/:id', async(req, res) => {
  try {
    const {id} = req.params
    console.log('req.session',req.session.currentUser._id)
    const userId = req.session.currentUser._id;
    const favoriteBeach = await Beach.findOne({spotId:id})
    const nameBeach = favoriteBeach.spotName; 
    const updateFavorites = await User.findByIdAndUpdate(userId,{$push:{favorites:nameBeach}})
    res.redirect('/favorites')
  } catch (error) {
    console.log('error beach name', error);
  }  
  
}); 



router.get('/favorites', async (req, res) => {
 try {
  const user = await User.findById(req.session.currentUser._id)
  console.log(user);
const userFavorites = user.favorites;
res.render('favorites', {userFavorites})
 } catch (error) {
  console.log('We have an error', error)
 }
})


// router.get('/favorites/:id', async (req, res) => {
//     const nameBeach = await favoriteBeach.spotName; 

// }    

// router.get('/edit/:id', async (req, res) => {
//   const movie = await Movie.findById(req.params.id)
//   const celebs = await Celebrity.find()
//   res.render('movies/edit-movie', { movie, celebs })
// })


//   // console.log('beach', max, min)
//   res.render('forecast-detail', {spotDetails})
//   } catch (error) {
//     console.log('We have an error', error)
//   }
// })
    


module.exports = router;

