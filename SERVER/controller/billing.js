if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const express = require('express'),
    app = express(),
    router = express.Router(),
    auth = require('../config/authenticate'),
    User = require('../model/User');

router.get('/*', (req, res, next)=>{
    req.app.locals.layout = 'index'
    next()
})    


// handling stripe payment
router.post('/api/stripe', auth, (req, res)=>{
   
    stripe.charges.create({
        amount: 500,
        currency: "usd",
        description: "Subscription for 5 Email Credits",
        source: req.body.id,
    }, (err, charge)=>{
        if(err)console.log(err)

        User.findById(req.user._id)
            .then(user=>{
                user.credit += 5;
                user.save()
                then(response=>{
                    res.status(200).json({data: response})
                })
            })


    })

    
})


module.exports = router