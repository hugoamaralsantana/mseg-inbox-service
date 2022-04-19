const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Company = require('../models/COMPANY');
const mongoose = require('mongoose');

const User = require('../models/USER');

  router.get('/test', (req, res) => res.send('user route testing!'));

  // get all users from database
  router.get('/', (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ error: 'No Users found' }));
  });

  // get a user by id from database
  router.get('/:id', (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(404).json({ error: `No User found at ${req.params.id}` }));
  });

  // create a user and insert into database
  router.post('/', [
    check('user_type').custom(user_type => {
      return user_type === 'Manager' || user_type === 'Admin' || user_type === 'Employee'; 
    }),
    check('password').isLength({min : 10}).isAlphanumeric(),
    check('first_name').isLength({min : 1}),
    check('last_name').isLength({min : 1}),
    check('email').isEmail(),
    // check to see if company exists in database
    check('company_id').custom(async(company_id) => {
        if (!mongoose.isValidObjectId(company_id)) {
          return Promise.reject()
        }
        const company = await Company.findOne({"_id":company_id});
        if (!company) {
          return Promise.reject()
        }        
    }),
    // check to see if company name exists in database
    check('company_name').custom(async(company_name) => {
      const company = await Company.findOne({"name":company_name});
      if (!company) {
        return Promise.reject()
      }        
    }),
    check('position_title').isLength({min : 1}),
  ],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    User.create(req.body)
     .then(user => res.json(user))
     .catch(err => res.status(400).json({ error: `Unable to add this user ${req.body}` }));
  });

  // update a user in the database
  router.put('/:id',[
    check('user_type').custom(user_type => {
      return user_type === 'Manager' || user_type === 'Admin' || user_type === 'Employee'; 
    }),
    check('password').isLength({min : 10}).isAlphanumeric(), 
    check('first_name').isLength({min : 1}),
    check('last_name').isLength({min : 1}),
    check('email').isEmail(),
    // check to see if company id exists in database
    check('company_id').custom(async(company_id) => {
        if (!mongoose.isValidObjectId(company_id)) {
          return Promise.reject()
        }
        const company = await Company.findOne({"_id":company_id});
        if (!company) {
          return Promise.reject()
        }        
    }),
    // check to see if company name exists in database
    check('company_name').custom(async(company_name) => {
      const company = await Company.findOne({"name":company_name});
      if (!company) {
        return Promise.reject()
      }        
    }),
    check('position_title').isLength({min : 1}),
    check('start_date').custom(start_date => {
      const date = new Date(start_date);
      return date instanceof Date && !isNaN(date.valueOf())
    }),
  ], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    User.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(user => res.json(user))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

  router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, req.body)
      .then(user => res.json({ success: 'User entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a user' }));
  });
  
  module.exports = router;