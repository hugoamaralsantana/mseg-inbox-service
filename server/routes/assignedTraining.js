const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const AssignedTraining = require('../models/ASSIGNEDTRAINING');
const User = require('../models/USER');

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
    check('sender_favorited').custom(favorited => favorited === false),
    check('recipient_favorited').custom(favorited => favorited === false),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    AssignedTraining.create(req.body)
      .then(training => res.json(training))
      .catch(err => res.status(400).json(err));
  });

  // create an assigned training for all users and insert into the database
  router.post('/sendAll', [
    check('type').custom(type => type === "assignedTraining"),
    check('status').custom(status => {
      return status === 'pending' || status === 'inProgress' || status === 'completed'; 
    }),
    // check('recipient').isLength({min : 1}),
    // check('recipient_id').custom(recipient_id => mongoose.isValidObjectId(recipient_id)),
    check('sender').isLength({min : 1}),
    check('sender_id').custom(sender_id => mongoose.isValidObjectId(sender_id)),
    check('recipient_comments').isLength({max: 200}),
    check('sender_comments').isLength({max: 200}),
    check('training').isURL(),
    check('is_completed').custom(is_completed => is_completed === false),
    check('sender_favorited').custom(favorited => favorited === false),
    check('recipient_favorited').custom(favorited => favorited === false),
  ], (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    User.find()
    .then(users => {
      users.forEach(user => {
        const body = req.body;
        body.recipient_id = user._id;
        body.recipient = user.first_name + ' ' + user.last_name;
        AssignedTraining.create(body)
        .catch(err => res.status(400).json(err)); 
      }) 
    })
    .catch(err => res.status(404).json({ error: 'No Users found' }));
    return res.status(200).json({message: "Succesfully sent assigned trainings to all employees."})
  });

  // update an assigned training in the database
  router.put('/:id', [
    check('type').custom(type => type === "assignedTraining"),
    check('status').custom(status => {
      return status === 'pending' || status === 'inProgress' || status === 'completed'; 
    }),
    check('recipient').isLength({min : 1}),
    check('recipient_id').custom(recipient_id => mongoose.isValidObjectId(recipient_id)),
    check('sender').isLength({min : 1}),
    check('sender_id').custom(sender_id => mongoose.isValidObjectId(sender_id)),
    check('due_date').custom(sender_due_date => {
      const date = new Date(sender_due_date);
      return date instanceof Date && !isNaN(date.valueOf()) || sender_due_date == null
    }),
    check('recipient_comments').isLength({max: 200}),
    check('sender_comments').isLength({max: 200}),
    check('training').isURL(),
    check('is_completed').isBoolean(),
    check('sender_favorited').isBoolean(),
    check('recipient_favorited').isBoolean(),
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

  router.get('/userData/:userId', (req, res) => {
    // if we want incoming -> we look for recipient id
    // if we want outgoing -> we look for sender id
    const userId = req.params.userId;
    if (!userId) {
      return res.json({error: "An error occured getting user data"});
    }
    const response = {incoming: [], outgoing: []}
    AssignedTraining.find({recipient_id: userId})
      .then(trainings => {
        response['incoming'] = trainings;
        AssignedTraining.find({sender_id: userId})
          .then(trainings => {
            response['outgoing'] = trainings;
            return res.json(response);
        })
      })
      .catch(err => res.status(404).json({ error: `No Trainings found at ${req.params.id}` }));
  });

  router.delete('/:assignedTrainingId', (req, res) => {
    AssignedTraining.findByIdAndRemove(req.params.assignedTrainingId, req.body)
      .then(trainings => res.json({ success: 'Training entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a training' }));
  });
  
  module.exports = router;