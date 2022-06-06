const { Schema, model } = require("mongoose");





const beachSchema = new Schema({
spotId:String,
spotName: String,
spotImage: String,
spotDescription: String,    


});




const Beach = model("Beach", beachSchema );

module.exports = Beach;

// data.wave[{surf{min, max, humanRelation}}]
// data.wave[{swells{height, period, direction}}]

// min: Number,
// max: Number,
// humanRelation: String