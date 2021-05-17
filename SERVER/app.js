
const express =  require('express'),
    PORT = process.env.PORT || 4010,
    passport = require('passport'),
    session = require('express-session'),
    { mongoURI } = require('./config/db'),
    bodyParser =  require('body-parser')
    mongoose = require('mongoose'),
    app = express();

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(db=>{
    console.log('Database Connected...')
})
.catch(err=>console.log(err))
    
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Session Middleware
app.use(session({
    secret: '000000000',
    resave: true,
    saveUninitialized: true
}));


//Passport inits
app.use(passport.initialize());
app.use(passport.session());


// google sigin
const index = require('./controller/index')
app.use('/', index)


app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})