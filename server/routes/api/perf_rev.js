//routes/api/pref_rev.js

const express = require('express');
const { modelName } = require('../../models/PERF_REV');
const router = express.Router();
const {check, validationRes} = require('express-validator')

//Load PTO Request Model
const Pref_rev = require('../../models/PTO'); //Ask Steven


// @route GET api/pref_rev
// @description test performance reviews route
// @access User Directed
router.get('/test', (req, res) => res.send('performance review route testing'));

// @route GET api/perf_rev
// @description Get all performance reviews
// @access User Directed
router.get('/', (req, res) => {
    Pref_rev.find()
        .then(performance => res.json(performance))
        .catch(err => res.status(404).json({noreviewsfound: 'User preformance inbox empty'}));
});

// @route GET api/perf_rev/:id
// @description Get performance review by id
// @access User Directed
router.get('/:id', (req, res) => {
    Pref_rev.findById(req.params.id)
        .then(performance => res.json(performance))
        .catch(err => res.status(404).json({noreviewfound: "No Performance Review found"}))
});

// @route POST api/pref_rev
// @descriptioon add/save reviews
// @access User Directed
router.post('/', [
    check('overallComments').isAlphanumeric(),
    check('growthFeedbackRating').isNumeric().isin([1, 2, 3, 4, 5]),
    check('growthFeedbackComment').isAlphanumeric(),
    check('kindnessFeedbackRating').isNumeric().isin([1, 2, 3, 4, 5]),
    check('kindnessFeedbackComment').isAlphanumeric(),
    check('deliveryFeedbackRating').isNumeric().isin([1, 2, 3, 4, 5]),
    check('deliveryFeedbackComment').isAlphanumeric()
],(res, req) => {
    Pref_rev.create(req.body)
        .then(review => res.json({msg : "Review addded!"}))
        .catch(err => res.status(400).json({error : "Unable to add this review"}))
})

// @route PUT api/pref_rev/:id
// @description update review
// @access User Directed
router.put('/:id', [
    check('overallComments').isAlphanumeric(),
    check('growthFeedbackRating').isNumeric().isin([1, 2, 3, 4, 5]),
    check('growthFeedbackComment').isAlphanumeric(),
    check('kindnessFeedbackRating').isNumeric().isin([1, 2, 3, 4, 5]),
    check('kindnessFeedbackComment').isAlphanumeric(),
    check('deliveryFeedbackRating').isNumeric().isin([1, 2, 3, 4, 5]),
    check('deliveryFeedbackComment').isAlphanumeric()
],(res, req) => {
    Pref_rev.findByIdAndUpdate(req.params.id, req.body)
        .then(review => res.json({msgs : "Updated Successfully"}))
        .catch(err => res.status(400).json({error : "Unable to update this review"}))
})

// @route PUT api/pref_rev/:id
// @description delete review
// @access User Directed
router.put('/:id', (res, req) => {
    Pref_rev.findByIdAndDelete(req.params.id, req.body)
        .then(review => res.json({msgs : "Deleted Successfully"}))
        .catch(err => res.status(400).json({error : "Unable to delete this review"}))
})




module.exports = router;