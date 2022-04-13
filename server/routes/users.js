const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/USER');

router.get('/test', (req, res) => res.send('user route testing!'));

router.get('/', (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
  });

  router.get('/:id', (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(404).json({ nouserfound: `No User found at ${req.params.id}` }));
  });

  router.post('/', [
    check('employee_id').isNumeric(),
    check('password').isLength({min : 10}).isAlphanumeric(), //what kind of requirements on the password?
    check('first_name').isLength({min : 1}),
    check('last_name').isLength({min : 1}),
    check('email').isEmail(),
    check('company_id').isNumeric(),
    check('company_name').isLength({min : 1}),
    check('position_title').isLength({min : 1}),
    check('start_date').isDate(), //requirements for the date
  ],(req, res) => {
    User.create(req.body)
     .then(user => res.json({ msg : 'User added successfully'}))
     .catch(err => res.status(400).json({ error: `Unable to add this user ${req.body}` }));
  });

  router.put('/:id',[
    check('employee_id').isNumeric(),
    check('password').isLength({min : 10}).isAlphanumeric(), //what kind of requirements on the password?
    check('first_name').isLength({min : 1}),
    check('last_name').isLength({min : 1}),
    check('email').isEmail(),
    check('company_id').isNumeric(),
    check('company_name').isLength({min : 1}),
    check('position_title').isLength({min : 1}),
    check('start_date').isDate(), //requirements for the date
    
  ], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(user => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

  router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, req.body)
      .then(user => res.json({ mgs: 'User entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a user' }));
  });
  
  module.exports = router;