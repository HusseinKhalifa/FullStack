const mongoose = require('mongoose')

const PlayerSchema = mongoose.Schema({
    name: { type: String, required: true },
    rank: {type: Number, required: false },
    score: {type: Number, required: false },
    time: { type: String, required: false },
    game: { type: String, required: false },
    available: { type: Boolean , required: false}
  });
  
const Player = mongoose.model('Player', PlayerSchema);
  
module.exports = Player;
