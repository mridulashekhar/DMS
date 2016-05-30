var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var person;
var event;

// var mongoDBConnection = require('./db.toDoSample.config');

// console.log(mongoDBConnection.uri);



//mongoose.connect('mongodb://admin:letmein@ds036789.mlab.com:36789/donormanagementsystem');

var mongoDBConnection = require('./db.dmsSample.config');
mongoose.connect(mongoDBConnection.uri);

mongoose.connection.on('open', function () {
    var Schema = new mongoose.Schema({
            FirstName: String,
            LastName: String,
            Address: String,
            Street: String,
            City: String,
            State: String,
            ZipCode: Number,
            Email: String,
            Phone: String,
            Events: Object
        },
        {collection: 'Donor'}
    )
    person = mongoose.model('Donor', Schema);
    console.log("Connected");
})

mongoose.connection.on('open', function () {
    var Schema = new mongoose.Schema({
            EventName: String,
            Location: String,
            Description: String,
            TotalDonation: Number,
            Donors: Object
        },
        {collection: 'Event'}
    )
    event = mongoose.model('Event', Schema);
    console.log("Connected");
})

app.get('/Event', function (req, res) {
    console.log("I received a GET request")

    event.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    })
});

app.get('/Donor', function (req, res) {
    console.log("I received a GET request")

    person.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    })
});

app.get('/Donor/:id', function (req, res) {
    var uid = req.params.id.toString();
    console.log(uid);
    person.findOne({_id: uid}, function (err, doc) {
        res.json(doc);
    })
});

app.post('/Event', function (req, res) {
    console.log('Received post request');
    console.log(req.body);
    var newEvent = new event();
    newEvent.EventName = req.body.EventName;
    newEvent.Location = req.body.Location;
    newEvent.Description = req.body.Description;
    newEvent.Donors = {};

    newEvent.save(function (err, doc) {
        if (err) res.json(err);
        else res.send('Successfully inserted');
    });
});

app.post('/Donor', function (req, res) {
    console.log('Received post request');
    console.log(req.body);
    var newuser = new person();
    newuser.FirstName = req.body.FirstName;
    newuser.LastName = req.body.LastName;
    newuser.Address = req.body.Address;
    newuser.City = req.body.City;
    newuser.State = req.body.State;
    newuser.ZipCode = req.body.ZipCode;
    newuser.Email = req.body.Email;
    newuser.Phone = req.body.Phone;
    newuser.Events = {};

    newuser.save(function (err, doc) {
        if (err) {
            res.json(err);
            console.log(err);
        }
        else {
            res.send('Successfully inserted');
        }
    });
});

app.delete('/Event/:id', function (req, res) {
    console.log('Received post request');
    var uid = req.params.id.toString();
    console.log(uid);
    event.remove({_id: uid}, function (err, doc) {
        res.json(doc);
    })
});

app.delete('/Donor/:id', function (req, res) {
    console.log('Received post request');
    var uid = req.params.id.toString();
    console.log(uid);
    person.remove({_id: uid}, function (err, doc) {
        res.json(doc);
    })
});

app.get('/Event/:id', function (req, res) {
    var uid = req.params.id.toString();
    console.log(uid);
    event.findOne({_id: uid}, function (err, doc) {
        res.json(doc);
    })
});

app.get('/Donor/:id', function (req, res) {
    var uid = req.params.id.toString();
    console.log(uid);
    person.findOne({_id: uid}, function (err, doc) {
        res.json(doc);
    })
});


app.put('/Event/:id', function (req, res) {
    var uid = req.params.id.toString();
    console.log(req.body.FirstName);
    event.findById(uid, function (err, user1) {

        if (err)
            res.send(err);
        user1.EventName = req.body.EventName;
        user1.Location = req.body.Location;
        user1.Description = req.body.Description;
        user1.Donors = req.body.Donors;


        user1.save(function (err, doc) {
            if (err)
                res.send(err);
            res.json({message: 'Event updated!'});
        });
    });
});


app.put('/Donor/:id', function (req, res) {
    var uid = req.params.id.toString();
    console.log(req.body.FirstName);
    person.findById(uid, function (err, person) {

        if (err)
            res.send(err);
        person.FirstName = req.body.FirstName;
        person.LastName = req.body.LastName;
        person.Address = req.body.Address;
        person.Street = req.body.Street;
        person.City = req.body.City;
        person.State = req.body.State;
        person.ZipCode = req.body.ZipCode;
        person.Email = req.body.Email;
        person.Phone = req.body.Phone;
        person.Events = req.body.Events;

        person.save(function (err, doc) {
            if (err)
                res.send(err);
            res.json({message: 'Donor updated!'});
        });
    });
});

app.listen(3000);
console.log("Server running on port 3000");