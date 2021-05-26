const express =  require('express'),
    app = express(),
    router  = express.Router(),
    // Mailer = require('../services/Mailer'),
    mailTemplate = require('../services/mailTemplate'),
    Survey = require('../model/Survey'),
    auth = require('../config/authenticate'),
    User = require('../model/User');



router.get('/', (req, res)=>{
    Survey.find({user: req.user})
    .then(surveys=>{
        res.status(202).json({surveys})
    })
    .catch(err=>console.log(err))

})   


router.post('/', auth, (req, res)=>{
    if(req.body.title && req.body.subject && req.body.body && req.body.recipients){
         User.findById(req.user._id)
        .then(user=>{
            if(user.credit < 1){
                return res.status(402).json({error: "Survey not sent. Low on credits. Credit now!!"})
            }


            const newSurvey = new Survey()
            newSurvey.title = req.body.title
            newSurvey.subject = req.body.subject
            newSurvey.body = req.body.body
            newSurvey.recipients = req.body.recipients.split(',').map(email=> ({ email }) )
            newSurvey.user = req.user
            newSurvey.dateSent = Date.now()

                // handle mailing
            //  const mailer = new Mailer(survey, mailTemplate(survey))
            try {
                // mailer.send()
                newSurvey.save()
                .then(response=>{
                    user.credit -= 1
                    user.save()
                    .then(response=>{
                        res.status(202).json({user})
                    })
                    .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
                
            } catch (error) {
                res.status(402).json({error: "An error occurred!"})
            }
           
                 
        })
        .catch(err=>console.log(err))
       
    }else{
        res.status(402).json({error: "Field(s) can not be empty"})
    }
})


module.exports = router