const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const AssignedTraining = require('../models/ASSIGNEDTRAINING');

  router.get('/test', (req, res) => res.send('assigned training route testing!'));

  // get all assigned trainings from database
  router.get('/', (req, res) => {
    AssignedTraining.find()
      .then(trainings => res.json(trainings))
      .catch(err => res.status(404).json({ error: 'No Trainings found' }));
  });

  // get an assigned training by id from database
  router.get('/getById/:id', (req, res) => {
    AssignedTraining.findById(req.params.id)
      .then(training => res.json(training))
      .catch(err => res.status(404).json({ error: `No Training found at ${req.params.id}` }));
  });

  // create an assigned training and insert into the database
  router.post('/', [
    check('type').custom(type => type === "assignedTraining"),
    check('status').custom(status => {
      return status === 'pending' || status === 'inProgress' || status === 'completed'; 
    }),
    check('recipient').isLength({min : 1}),
    check('recipient_id').custom(recipient_id => mongoose.isValidObjectId(recipient_id)),
    check('sender').isLength({min : 1}),
    check('sender_id').custom(sender_id => mongoose.isValidObjectId(sender_id)),
    check('recipient_comments').isLength({max: 200}),
    check('sender_comments').isLength({max: 200}),
    check('training').isURL(),
    check('is_completed').custom(is_completed => is_completed === false),
    check('favorited').custom(favorited => favorited === false),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    AssignedTraining.create(req.body)
      .then(training => res.json(training))
      .catch(err => res.status(400).json(err));
  });

  // update an assigned training in the database
  router.put('/:id', [
    check('type').custom(type => type === "assignedTraining"),
    check('status').custom(status => {
      return status === 'pending' || status === 'inProgress' || status === 'completed'; 
    }),
    check('recipient').isLength({min : 1}),
    check('recipient_id').custom(recipient_id => mongoose.isValidObjectId(recipient_id)),
    check('recipient_due_date').custom(recipient_due_date => {
      const date = new Date(recipient_due_date);
      return date instanceof Date && !isNaN(date.valueOf()) || recipient_due_date == null
    }),
    check('sender').isLength({min : 1}),
    check('sender_id').custom(sender_id => mongoose.isValidObjectId(sender_id)),
    check('sender_due_date').custom(sender_due_date => {
      const date = new Date(sender_due_date);
      return date instanceof Date && !isNaN(date.valueOf()) || sender_due_date == null
    }),
    check('recipient_comments').isLength({max: 200}),
    check('sender_comments').isLength({max: 200}),
    check('training').isURL(),
    check('is_completed').isBoolean(),
    check('favorited').isBoolean(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    AssignedTraining.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(training => res.json(training))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

  // get an assigned training data for a user from database
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
    AssignedTraining.find(query)
      .then(trainings => {
        response[type] = trainings;
        return res.json(response);
      })
      .catch(err => res.status(404).json({ error: `No Trainings found at ${req.params.id}` }));
  });

  router.delete('/:assignedTrainingId', (req, res) => {
    AssignedTraining.findByIdAndRemove(req.params.assignedTrainingId, req.body)
      .then(trainings => res.json({ success: 'Training entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a training' }));
  });
  
  module.exports = router;