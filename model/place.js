const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: String,
    location: {
      type: {
        type: String,
        defualt: 'Point'
      }
    },
    type: {
      type: String,
      enum: ['coffee_shop', 'bookstore']
    }
  },
  {
    timestamps: true
  }
);


//creating an index for mongoDB
//this will helps us to find documents with specific coordinates
placeSchema.index({ location: '2dsphere' });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
