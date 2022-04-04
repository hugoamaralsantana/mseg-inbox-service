const express = require('express');
const router = express.Router();
const {check, validationResult} = require("express-validator/check");

const User = require('../../models/User');

var jsonencoded = express.json();
router.use(express.json());

router.get('/test', (req, res) => res.send('user route testing!'));

router.get('/', (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
  });

  router.get('/:id', (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
  });

  router.post('/', (req, res) => {
    User.create(req.body)
      .then(user => res.json({ msg: 'User added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
  });

  /*router.post('/', async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, employeeId, email, companyId, companyName, positionTitle, startDate,isManager, password } = req.body

    try {
      let user = await user.findOne({email});

      if (user){
        res.status(400).json({errors : [{msg: "User already exists" }] })
      }

      user = new User({firstName, lastName, employeeId, email, companyId, companyName, positionTitle, startDate,isManager, password})

      await user.save();

      res.send("User route");

    } catch(err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }

  }); */

  router.put('/:id', (req, res) => {
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