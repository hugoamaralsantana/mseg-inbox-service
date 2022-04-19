//routes/api/pto_req.js

const express = require('express');
const router = express.Router();
const {check, validationRes} = require('express-validator') 

//Load PTO Request Model
const PTO_Req = require('../../models/PTO'); //Ask Steven


// @route GET api/pto_req
// @description test PTO requests route
// @access User Directed
router.get('/test', (req, res) => res.send('pto request route testing'));

// @route GET api/pto_req
// @description Get all PTO requests
// @access User Directed
router.get('/', (req, res) => {
    PTO_Req.find()
        .then(request => res.json(request))
        .catch(err => res.status(404).json({norequestsfound: 'User PTO inbox empty'}));
});

// @route GET api/pto_req/:id
// @description Get pto request by id
// @access User Directed
router.get('/:id', (req, res) => {
    PTO_Req.findById(req.params.id)
        .then(request => res.json(request))
        .catch(err => res.status(404).json({noreviewfound: "No PTO Request found"}));
});

// @route POST api/pto_req
// @descriptioon add/save pto requests
// @access User Directed
router.post('/', [
    check('startDate').isDate(),
    check('EndDate').isDate(),
    check("Reason").isAlphanumeric(),
    check("assignID").isNumeric()
], (res, req) => {
    PTO_Req.create(req.body)
        .then(request => res.json({msg : "Request addded!"}))
        .catch(err => res.status(400).json({error : "Unable to add this request"}));
});

// @route PUT api/pto_req/:id
// @description update pto request
// @access User Directed
router.put('/:id',[
    check('startDate').isDate(),
    check('EndDate').isDate(),
    check("Reason").isAlphanumeric(),
    check("assignID").isNumeric()
] ,(res, req) => {
    PTO_Req.findByIdAndUpdate(req.params.id, req.body)
        .then(request => res.json({msgs : "Updated Successfully"}))
        .catch(err => res.status(400).json({error : "Unable to update this request"}));
});

// @route PUT api/pto_req/:id
// @description delete pto request
// @access User Directed
router.put('/:id',[
    check("assignID").isNumeric()
] ,(res, req) => {
    Pref_rev.findByIdAndDelete(req.params.id, req.body)
        .then(request => res.json({msgs : "Deleted Successfully"}))
        .catch(err => res.status(400).json({error : "Unable to delete this review"}));
});


module.exports = router;