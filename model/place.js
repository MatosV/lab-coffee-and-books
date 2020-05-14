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
    },
    coordinates: [
      {
        //create constrains both for long and latt
        type: Number,
        min: -180,
        max: 180
      }
    ]
  },
  {
    timestamps: {
      type: String,
      default: new Date()
    }
  }
);


//creating an index for mongoDB
//this will helps us to find documents with specific coordinates
placeSchema.index({ location: '2dsphere' });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
