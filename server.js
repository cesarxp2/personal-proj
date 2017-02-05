const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const Massive = require('massive');
const db = Massive.connectSync({
    db: 'cesargarcia'
});

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const app = module.exports = express();
const stripe = require("stripe")(keySecret);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())


// STRIPE ~~

app.post("/charge", (req, res) => {

    console.log(req.body);
    var newDonation = {
        email: req.body.email,
        amount_donated: req.body.amount / 100
    };
    var save = db.donationsmade.saveSync(newDonation);

    stripe.customers.create({
            email: req.body.email,
            source: req.body.id
        })
        .then(customer =>
            stripe.charges.create({
                amount: req.body.amount,
                description: "Sample Charge",
                currency: "usd",
                customer: customer.id
            }))
        .then(charge => res.send(charge));

});
// // END STRIPE ~~

// app.post('/donation', function(req, res) {
//
//     db.findUserByEmail([req.body.email], function(err, result) {
//         if (result[0]) {
//             db.createDonation([result[0].id, req.body.amount], function(err, donation) {
//
//             })
//         } else {
//             db.createUser([req.body.email], function(err, user) {
//
//                 db.createDonation([user[0].id, req.body.amount], function(err, newUser) {
//
//
//                 })
//             });
//         }
//     })
//
// });



app.post('/api/user', (req, res) => {
    var newUser = {
        name: req.body.name,
        email: req.body.email
    };
    var save = db.HumaneNewsletter.saveSync(newUser);

    console.log(req.body);
    console.log(save);
})


var port = 3000;
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}!`)
})
