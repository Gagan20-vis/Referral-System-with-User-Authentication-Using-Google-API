require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const session = require('express-session')
const user = require('./routes/route')
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET","DELETE"],
    credentials: true,
}))
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 3
    }
}))
mongoose.connect(process.env.DB);
app.use('/api/user', user)
app.listen(port, () => console.log(`listening to the port = ${port}`))