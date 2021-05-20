
const express =  require('express'),
    PORT = process.env.PORT || 4010,
    passport = require('passport'),
    session = require('express-session'),
    { mongoURI } = require('./config/db'),
    bodyParser =  require('body-parser')
    mongoose = require('mongoose'),
    path = require('path')
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


// Routes
const index = require('./controller/index')
app.use('/', index)

const billing = require('./controller/billing')
app.use('/', billing)


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../Client/build'))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'))
    })
} 


app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})