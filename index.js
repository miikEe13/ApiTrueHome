require('dotenv').config()

// Import express
let express = require('express')
// Import Body parser
let bodyParser = require('body-parser')
// Import Mongoose
let mongoose = require('mongoose')
// import cors
const cors = require('cors')
// logs server api
const logger = require('morgan')
// Initialize the app
let app = express()
// Import routes
let apiRoutes = require('./src/routes/api')
// URL  local
// const RESTAPI = 'mongodb://localhost/resthub'
// URL  mlab
const RESTAPI = process.env.API_URL
// Connect to Mongoose and set connection variable
mongoose.connect(
  RESTAPI,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
)
app.use(logger('dev'))

// fix cors
app.use(cors())

app.use(bodyParser.json())

var db = mongoose.connection

db.on('connected', () => {
  const msg = {
    success: true
  }
  console.log(JSON.stringify(msg, null, 2))
})

// Setup server port
var port = process.env.PORT || 3000

// Use Api routes in the App
app.use('/api/v1', apiRoutes)

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'))

// error 404
app.use((request, response) => {
  const ERROR = {
    message: '404. Not Found'
  }
  response.status(404).json(ERROR)
})

// error 500
app.use((err, request, response, next) => {
  const ERROR = {
    message: '500. Server Error'
  }
  response.status(500).json(ERROR)
})

// Launch app to listen to specified port
app.listen(port, function () {
  console.log('Running True Home api on port ' + port)
})
