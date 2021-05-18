// const e = require('express');

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express'),
    app = express(),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy;
    LocalStrategy = require('passport-local').Strategy
    router = express.Router(),
    googleClientSecret = process.env.GOOGLE_CLIENT_SECRET,
    googleClientID = process.env.GOOGLE_CLIENT_ID,
    User = require('../model/User'),
    crypto = require('crypto'),
    bcrypt = require('bcryptjs');

    
router.get('/*', (req, res, next)=>{
    req.app.locals = 'index';
    next()
})    

router.get('/', (req, res)=>{
    res.send('Welcome to Server')
})

router.post('/api/signup', (req, res)=>{
    console.log('...receiving from signup')
    if(!req.body.email || !req.body.name || !req.body.password){
        res.status(401).json({error: "Fill in Fieldsd"})
    }

    User.findOne({email: req.body.email})
    .then(user=>{
        if(user){
            res.status(402).json({error: "Email already exists"})
        }else{
            const newUser = new User()
            newUser.email = req.body.email
            newUser.name = req.body.name
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(req.body.password, salt, (err, hash)=>{
                    if(err)console.log(err)
                    newUser.password = hash
                    newUser.save()
                    .then(response=>{
                        res.status(200).json({response: `${response.name} has been created successfully`})
                        console.log(response)
                    })
                    .catch(err=>console.log(err))
                })
            })
        }
    })
    .catch(err=>console.log(err))
})


passport.serializeUser((user, done)=> {
    done(null, user.id);
});
  
passport.deserializeUser((id, done)=> {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done)=>{
    console.log('Access Token:', accessToken)
    console.log('Refresh Token:', refreshToken)
    console.log('Profile:', profile)

    User.findOne({googleID: profile.id})
    .then(user=>{
        if(!user){
            const newUser =  new User()
            newUser.googleId = profile.id
            newUser.email = profile.emails.value
            newUser.name = profile.displayName || 'User'
            newUser.save()
            .then(response=>{
                return done(null, response )
            })
            .catch(err=>console.log(err))
        }else{
            return done(null, user)
        }
    })
}))



router.get('/api/auth/google', passport.authenticate('google',{
    scope:['profile', 'email']
}))

router.get('/api/current_user', (req, res)=>{
    res.send(req.user)
})

router.get('/api/auth/google/callback', passport.authenticate('google'),
    (req, res)=>{
        res.redirect('/dahsboard')
    }
)


passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
    User.findOne({email})
    .then(user=>{
        if(!user){
            return done(null, false, {message: "Email not recognised"})
        }else{
            bcrypt.compare(password, user.password, (err, matched)=>{
                if(err)console.log(err)
                
                if(!matched){
                    done(null, false, {message: "Password Mismatch"})
                }else{
                    done(null, user)
                }
            })
        }

    })
    .catch(err=>console.log(err))
}))



router.post('/api/signin', passport.authenticate('local',{
    failureRedirect: '/api/signup',
    failureFlash: false
}), (req, res, next)=>{
    User.findOne({email: req.body.email})
    .then(user=>{
        if(!user){
            res.status(402).json({error: "User Not Found"})
        }else{
            bcrypt.compare(req.body.password, user.password, (err, matched)=>{
                if(err)console.log(err)
                    if(!matched){
                        res.status(401).json({error: "Password Mismatch"})
                        console.log(user)
                    }else{
                        res.status(200).json({user})
                    }
            })
           
        }
    })
    .catch(err=>console.log(errr))    
})


router.get('/api/signout',(req, res)=>{
    req.logout();
    res.status(200).json({success: "Logged out :)"})
})



router.post('/api/forgot', (req,res)=>{
    crypto.randomBytes(20, (err, buffer)=>{
        if(err)console.log(err)
        const token = buffer.toString('hex')

        User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                res.status(402).json({error: "Email not recognised"})
            }else{
                user.token = token
                user.token_expiry = Date.now() + 360000
                user.save()
                .then(response=>{
                    console.log(`http://localhost:2026/reset/${token}`)
                    res.status(200).json({success: "Password reset link sent"})
                })
                .catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
       
    })
    
})


router.post('/api/token/:token', (req, res)=>{
    User.findOne({token: req.params.token, token_expiry: {$gt: Date.now()}})
    .then(user=>{
        if(!user){
            res.status(402).json({error: "Token Expired! Retry"})
        }else{
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(req.body.password, salt, (err, hash)=>{
                    if(err)console.log(err)
                    user.password = hash
                    user.save()
                    .then(response=>{
                        res.status(200).json({success: "Password reset successful. Sign in"})
                    })
                    .catch(err=>console.log(err))
                })
            })
        }
    })
})




// USER EDIT
router.post('/api/user/edit/:id', (req, res)=>{
    User.findById(req.params.id)
    .then(user=>{
        if(req.body.password){
            user.name = req.body.name
            user.email = req.body.email
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(req.body.password, salt, (err, hash)=>{
                    user.password = hash
                    user.save()
                    .then(response=>{
                        res.status(200).json({user: response})
                    })
                    .catch(err=>console.log(err))
                })
            })
        }else{
            user.name = req.body.name
            user.email = req.body.email
            user.save()
            .then(response=>{
                res.status(200).json({user: response})
            })
            .catch(err=>console.log(err))
        }
    })
})











module.exports = router;