const express = require('express');
const Place = require('./../model/place');
const placeRouter = new express.Router();

// ***************** ROUT HANDELERS *****************\\

//LIST OF PLACES
placeRouter.get('/display', (req, res, next) => {
  Place.find()
    .then((places) => {
      console.log(places);
      res.render('place/display', { places });
    })
    .catch((err) => {
      next(err);
    });
});

//CREATE A PLACE
placeRouter.get('/create', (req, res, next) => {
  res.render('place/create');
});

placeRouter.post('/create', (req, res, next) => {
  Place.create({
    name: req.body.name,
    location: req.body.location,
    type: req.body.type
  })
    .then((newPlace) => {
      res.redirect('/place/display');
      console.log(`You created => ${newPlace}`);
    })
    .catch((err) => {
      console.log(err);
      res.render('place/create', err);
    });
});

//SHOW A PLACE
placeRouter.get('/:placeId', (req, res, next) => {
  const placeId = req.params.placeId;

  Place.findById(placeId)
    .then((place) => {
      res.render('place/display', { place });
    })
    .catch((err) => {
      next(err);
    });
});

//DELETE PLACES
placeRouter.post('/place/:id/delete', (req, res, next) => {
  const placeId = req.params.id;

  Place.findByIdAndDelete(placeId)
    .then(() => {
      res.redirect('/place');
      console.log(`You deleted: => ${placeId}`);
    })
    .catch((err) => {
      next(err);
    });
});

//EDIT PLACES
placeRouter.get('/place/:id/update', (req, res, next) => {
  const placeId = req.params.id;

  Place.findById(placeId)
    .then((places) => {
      res.render('place/update', { places });
      console.log(`Place edited => ${places}`);
    })
    .catch((err) => {
      next(err);
    });
});

//PARAMS TO EDIT
placeRouter.post('/place/:id', (req, res, next) => {
  const placesId = req.params.id;

  Place.update(placesId, {
    name: req.body.name,
    location: req.body.location
    //missing - type
    //missing - timestamp
  })
    .then((places) => {
      res.render('/place', { places });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = placeRouter;
