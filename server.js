require("dotenv").config();
require('./db.connection')

const express = require("express");
const cors = require("cors")
const morgan = require("morgan")

const userController = require('./controllers/auth-controller')
const mainController = require('./controllers/main-controller')

const app = express();

app.use(express.json()); 
app.use(cors()); 
app.use(morgan("dev")); 

app.use('/auth', userController)
app.use('/main', mainController)


app.get("/", (req, res) => {
    res.send("hello world");
});

//declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));