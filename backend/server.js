const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// db
mongoose
    .connect(process.env.DATABASE, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('Database Connection Successful!!'));



//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//Cors
if (process.env.NODE_ENV == 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
//Routes
app.get('/api', (req, res) => {
    res.json({ time: Date().toString() })
})
//Port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server runnin on port: ${port}`);
})