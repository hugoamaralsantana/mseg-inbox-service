const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Company = require('../models/COMPANY');
const mongoose = require('mongoose');
const Atlas_Technology = require('../UKG_client_data/Atlas_Technology-employees.json')

const User = require('../models/USER');

  router.get('/test', (req, res) => res.send('user route testing!'));

  // populate database with fake users
  router.post('/populate', (req, res) => {

    const parseDate = (date) => {
        const year = date.slice(0, 4)
        const month = date.slice(5,7)
        const day = date.slice(8,10)
        return month  + '/' + day + '/' + year
    }

    const getUsers = () => {
        const users = Atlas_Technology;
        return users.map(user => {
            const newUser = {
                user_type: user.isManager ? 'Manager' : 'Employee',
                password: user.password,
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                company_id: '6267230829c9494013400be6',
                manager_id: null,
                company_name: user.companyName,
                position_title: user.positionTitle,
                start_date: parseDate(user.startDate)
            }
            return newUser;
        });
    }

    const users = getUsers();

    users.forEach((user) => {
      User.create(user)
      .catch(err => res.status(400).json({ err }));
    })

    return res.json({message: "Successfully populated database"});
  });

  // get all users from database
  router.get('/', (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ error: 'No Users found' }));
  });

  // login user (check if email and password matches in database)
  router.post('/login', (req, res) => {
    User.findOne({"email":req.body.email, "password": req.body.password})
      .then(user => res.json(user))
      .catch(err => res.status(404).json({ error: 'No Users found' }));
  });
  
  // get a user by id from database
  router.get('/:id', (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(404).json({ error: `No User found at ${req.params.id}` }));
  });

  // get a user by name from database
  router.get('/email/:email', (req, res) => {
    User.find({'email': req.params.email})
      .then(user => res.json(user))
      .catch(err => {
        res.status(404).json({ error: `No User found at ${req.params.name}` });
      })
  });

  // create a user and insert into database
  router.post('/', [
    check('user_type').custom(user_type => {
      return user_type === 'Manager' || user_type === 'Admin' || user_type === 'Employee'; 
    }),
    check('password').isLength({min : 4}).isAlphanumeric(),
    check('first_name').isLength({min : 1}),
    check('last_name').isLength({min : 1}),
    check('email').isEmail(),
    check('email').custom(async(email) => {
      const emailCheck = await User.find({'email': email})
      if (emailCheck.length > 0) {
        return Promise.reject()
      }
    }),
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
     .catch(err => res.status(400).json({ err }));
  });

  // update a user in the database
  router.put('/:id',[
    check('user_type').custom(user_type => {
      return user_type === 'Manager' || user_type === 'Admin' || user_type === 'Employee'; 
    }),
    check('password').isLength({min : 4}).isAlphanumeric(),
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
