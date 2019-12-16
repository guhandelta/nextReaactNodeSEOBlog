const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const blogRoutes = require('../routes/blog')
const authRoutes = require('../routes/auth')

const app = express()

// db
mongoose
    .connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => console.log('Database Connection Successful!!'));



//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//Cors
if (process.env.NODE_ENV == 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
// Routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

//Routes
app.get('/api', (req, res) => {
    res.json({ time: Date().toString() })
})
//Port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server runnin on port: ${port}`);
})