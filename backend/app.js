const express = require('express')
const dotenv = require('dotenv')
var cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerDefinition = require('./swagger.json')

// Import routes
const authRoute = require('./routes/api/auth')
const userRoute = require('./routes/api/user')

dotenv.config()
const app = express()
const port = process.env.PORT || 3001

// Set up Swagger
const swaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js', './routes/api/*.js', './routes/api/**/*.js']
}

const openapiSpecification = swaggerJsdoc(swaggerOptions)

var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification, {
  swaggerOptions: {
    persistAuthorization: true
  },
  explorer: true
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // send error page
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
