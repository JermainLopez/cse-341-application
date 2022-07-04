const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const morgan = require('morgan')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoDbStore = require('connect-mongo')


//config my passport
require('./config/passport')(passport)
    // Load config variables
dotenv.config({ path: './config/config.env' })

//Start app
const app = express()
    // Connect to MongoDB
connectDB()

//Add body parser to parse the body of the request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
    // Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
//Handlebars
const { engine } = require('express-handlebars')
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoDbStore.create({
            mongoUrl: 'mongodb+srv://JermainLopez:Honduras1234@cluster0.ckaz6.mongodb.net/test'
        })
    })
)

//set passport middleware
app.use(passport.initialize())
app.use(passport.session())

//My static folder
app.use(express.static(path.join(__dirname, 'public')))


// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/recipes', require('./routes/recipe'))

const PORT = process.env.PORT || 8080

app.listen(
    PORT,
    console.log(`Server running in port ${PORT}`)
)