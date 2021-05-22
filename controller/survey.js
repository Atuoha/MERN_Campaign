const Survey = require('../model/Survey');

const express =  require('express'),
    app = express(),
    router  = express.Router(),
    Survery = '../model/Survey';


router.get('/', (req, res)=>{
    Survey.find({user: req.user})
    .then(surveys=>{
        res.status(202).json({surverys})
    })
    .catch(err=>console.log(err))

})   


router.post('/', (req, res)=>{
    if(req.title && req.body.subject && req.body.body && req.body.recipients){
        const newSurvey = new Survey()
        newSurvey.title = req.body.title
        newSurvey.subject = req.body.subject
        newSurvey.body = req.body.body
        newSurvey.recipients = req.body.recipients
        newSurvey.save()
        .then(response=>{
            // handle mailing


            res.status(202).json({response})
        })
        .catch(err=>console.log(err))
    }else{
        res.status(402).json({error: "Field(s) can not be empty"})
    }
})
