const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const PTORequest = require('../models/PTORequest');

  router.get('/test', (req, res) => res.send('PTO request route testing!'));

  // get all PTOs from database
  router.get('/', (req, res) => {
    PTORequest.find()
      .then(ptos => res.json(ptos))
      .catch(err => res.status(404).json({ error: 'No PTOs found' }));
  });

  // get a PTO by id from database
  router.get('/getById/:id', (req, res) => {
    PTORequest.findById(req.params.id)
      .then(pto => res.json(pto))
      .catch(err => res.status(404).json({ error: `No PTO found at ${req.params.id}` }));
  });

  // create a PTO and insert into the database
  router.post('/', [
    check('type').custom(type => type === "PTORequest"),
    check('status').custom(status => {
      return status === 'pending' || status === 'inProgress' || status === 'completed'; 
    }),
    check('recipient').isLength({min : 1}),
    check('recipient_id').custom(recipient_id => mongoose.isValidObjectId(recipient_id)),
    check('sender').isLength({min : 1}),
    check('sender_id').custom(sender_id => mongoose.isValidObjectId(sender_id)),
    check('recipient_comments').isLength({max: 200}),
    check('sender_comments').isLength({max: 200}),
    check('sender_favorited').custom(favorited => favorited === false),
    check('recipient_favorited').custom(favorited => favorited === false),
    check('pto_start').custom(pto_start => {
      const date = new Date(pto_start);
      return date instanceof Date && !isNaN(date.valueOf())
    }),
    check('pto_end').custom(pto_end => {
      const date = new Date(pto_end);
      return date instanceof Date && !isNaN(date.valueOf())
    }),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    PTORequest.create(req.body)
      .then(pto => res.json(pto))
      .catch(err => res.status(400).json(err));
  });

  // update a PTO in the database
  router.put('/:id', [
    check('type').custom(type => type === "PTORequest"),
    check('status').custom(status => {
      return status === 'pending' || status === 'inProgress' || status === 'completed'; 
    }),
    check('recipient').isLength({min : 1}),
    check('recipient_id').custom(recipient_id => mongoose.isValidObjectId(recipient_id)),
    check('due_date').custom(due_date => {
      const date = new Date(due_date);
      return date instanceof Date && !isNaN(date.valueOf()) || due_date == null
    }),
    check('sender').isLength({min : 1}),
    check('sender_id').custom(sender_id => mongoose.isValidObjectId(sender_id)),
    check('recipient_comments').isLength({max: 200}),
    check('sender_comments').isLength({max: 200}),
    check('sender_favorited').isBoolean(),
    check('recipient_favorited').isBoolean(),
    check('recipient_comments').isLength({max: 200}),
    check('sender_comments').isLength({max: 200}),
    check('pto_start').custom(pto_start => {
      const date = new Date(pto_start);
      return date instanceof Date && !isNaN(date.valueOf())
    }),
    check('pto_end').custom(pto_end => {
      const date = new Date(pto_end);
      return date instanceof Date && !isNaN(date.valueOf())
    }),
  ], (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    PTORequest.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(pto => res.json(pto))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

  // get a PTO data for a user from database
  router.get('/userData/:userId/:type', (req, res) => {
    // if we want incoming -> we look for recipient id
    // if we want outgoing -> we look for sender id
    const userId = req.params.userId;
    const type = req.params.type;
    if (!userId || !type) {
      return res.json({error: "An error occured getting user data"});
    }
    const response = {incoming: [], outgoing: []}
    const query = type === 'incoming' ? {recipient_id: userId} : {sender_id: userId};
    PTORequest.find(query)
      .then(ptos => {
        response[type] = ptos;
        return res.json(response);
      })
      .catch(err => res.status(404).json({ error: `No PTOs found at ${req.params.id}` }));
  });

  router.get('/userData/:userId', (req, res) => {
    // if we want incoming -> we look for recipient id
    // if we want outgoing -> we look for sender id
    const userId = req.params.userId;
    if (!userId) {
      return res.json({error: "An error occured getting user data"});
    }
    const response = {incoming: [], outgoing: []}
    const incoming_query = {recipient_id: userId};
    const outgoing_query = {sender_id: userId};
    try {
      PTORequest.find(incoming_query)
      .then(reviews => {
        response.incoming = reviews;
       PTORequest.find(outgoing_query)
        .then(review => {
          response.outgoing = review;
          return res.json(response);
        })
      })
      .catch(err => res.status(404).json({ error: 'Error getting data for user' }));
    }
    catch {
      return res.json({error: "An error occured getting user data"});
    }
  });

  router.delete('/:PTORequestId', (req, res) => {
    PTORequest.findByIdAndRemove(req.params.PTORequestId, req.body)
      .then(pto => res.json({ success: 'PTO deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such PTO' }));
  });
  
  module.exports = router;