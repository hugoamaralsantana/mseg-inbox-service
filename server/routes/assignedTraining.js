const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// const User = require('../src/models/AssignedTraining');
const AssignedTraining = require('../src/models/AssignedTraining');

router.get('/test', (req, res) => res.send('assigned training route testing!'));

router.get('/', (req, res) => {
    AssignedTraining.find()
      .then(trainings => res.json(trainings))
      .catch(err => res.status(404).json({ notrainingfound: 'No Trainings found' }));
  });

  router.get('/:assignedTrainingId', (req, res) => {
    AssignedTraining.findById(req.params.assignedTrainingId)
      .then(trainings => res.json(trainings))
      .catch(err => res.status(404).json({ notrainingfound: `No Training found at ${req.params.assignedTrainingId}` }));
  });

  router.post('/', [
    check('url').isURL()
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    AssignedTraining.create(req.body)
      .catch(err => res.status(400).json({ error: 'Unable to add this training' }));
  });

  router.put('/:assignedTrainingId', [
    check('url').isURL()
  ], (req, res) => {
    const erros = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    AssignedTraining.findByIdAndUpdate(req.params.assignedTrainingId, req.body)
      .then(trainings => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

  router.delete('/:assignedTrainingId', (req, res) => {
    AssignedTraining.findByIdAndRemove(req.params.assignedTrainingId, req.body)
      .then(trainings => res.json({ mgs: 'Training entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a training' }));
  });
  
  module.exports = router;