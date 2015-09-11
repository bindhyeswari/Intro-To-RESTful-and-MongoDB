

var mongoose = require('mongoose');
var router = require('express').Router();

// create a model

var ContactModel = mongoose.model('contact', {
    name: String,
    tel: String,
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    }
});

// INSERT
router.post('/', function (req, res) {
    console.log(req.body);

    var contact = new ContactModel(req.body);

    contact.save(function (err, result) {
        if (err) res.status(500).json({error: err});
        else res.status(201).json({result: result});
    });
});

// READ
router.get('/', function (req, res) {
    ContactModel.find(function (err, results) {
        if (err) res.status(500).json({error: err});
        else res.status(201).json({results: results});
    });
});

// UPDATE
router.put('/:id', function (req, res) {
    console.log(req.params.id);
    console.log(req.body);
    ContactModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, result) {
        if (err) res.status(500).json({error: err});
        else res.status(201).json({result: result});
    });
});


module.exports = router;