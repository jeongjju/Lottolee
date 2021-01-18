const mongoose = require('mongoose');

const { Schema } = mongoose;
const numberSchema = new Schema({
  drwNo: {
    type: Number,
    required: true,
    unique: true,
  },
  drwtNo1: {
    type: Number,
    required: true,
  },
  drwtNo2: {
    type: Number,
    required: true,
  },
  drwtNo3: {
    type: Number,
    required: true,
  },
  drwtNo4: {
    type: Number,
    required: true,
  },
  drwtNo5: {
    type: Number,
    required: true,
  },
  drwtNo6: {
    type: Number,
    required: true,
  },
  bnusNo: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Number', numberSchema);
