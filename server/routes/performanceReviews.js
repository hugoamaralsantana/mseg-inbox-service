const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const PerformanceReview = require('../models/PERFORMANCEREVIEW');

  router.get('/test', (req, res) => res.send('performance review route testing!'));

  // get all performance reviews from database
  router.get('/', (req, res) => {
    PerformanceReview.find()
      .then(reviews => res.json(reviews))
      .catch(err => res.status(404).json({ error: 'No performance reviews found' }));
  });

  // get a performance review by id from database
  router.get('/getById/:id', (req, res) => {
    PerformanceReview.findById(req.params.id)
      .then(review => res.json(review))
      .catch(err => res.status(404).json({ error: `No performance review found at ${req.params.id}` }));
  });

  // create a performance review and insert into the database
  router.post('/', [
    check('type').custom(type => type === "performanceReview"),
    check('status').custom(status => {
      return status === 'pending' || status === 'inProgress' || status === 'completed'; 
    }),
    check('recipient').isLength({min : 1}),
    check('recipient_id').custom(recipient_id => mongoose.isValidObjectId(recipient_id)),
    check('sender').isLength({min : 1}),
    check('sender_id').custom(sender_id => mongoose.isValidObjectId(sender_id)),
    check('recipient_comments').isLength({max: 200}),
    check('sender_comments').isLength({max: 200}),
    check('favorited').custom(favorited => favorited === false),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    PerformanceReview.create(req.body)
      .then(review => res.json(review))
      .catch(err => res.status(400).json(err));
  });

  // update a performance review in the database
  router.put('/:id', [
    check('type').custom(type => type === "performanceReview"),
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
    check('favorited').isBoolean(),
    check('overall_comments').custom(overall_comments => !overall_comments || overall_comments.length < 200),
    check('growth_score').custom(growth_score => !growth_score || [1, 2, 3, 4, 5].includes(growth_score)),
    check('growth_comments').custom(growth_comments => !growth_comments || growth_comments.length < 200),
    check('kindness_score').custom(kindness_score => !kindness_score || [1, 2, 3, 4, 5].includes(kindness_score)),
    check('kindness_comments').custom(kindness_comments => !kindness_comments || kindness_comments.length < 200),
    check('delivery_score').custom(delivery_score => !delivery_score || [1, 2, 3, 4, 5].includes(delivery_score)),
    check('delivery_comments').custom(delivery_comments => !delivery_comments || delivery_comments.length < 200),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    PerformanceReview.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(review => res.json(review))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

  // get performance review data for a user from database
  router.get('/userData/:userId/', (req, res) => {
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
      PerformanceReview.find(incoming_query)
      .then(reviews => {
        response.incoming = reviews;
        PerformanceReview.find(outgoing_query)
        .then(reviews => {
          response.outgoing = reviews;
          return res.json(response);
        })
      })
      .catch(err => res.status(404).json({ error: 'Error getting data for user' }));
    }
    catch {
      return res.json({error: "An error occured getting user data"});
    }
  });

  router.delete('/:performanceReviewId', (req, res) => {
    PerformanceReview.findByIdAndRemove(req.params.performanceReviewId, req.body)
      .then(review => res.json({ success: 'Performance review entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such performance review' }));
  });
  
  module.exports = router;