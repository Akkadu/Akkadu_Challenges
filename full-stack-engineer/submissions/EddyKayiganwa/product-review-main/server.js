const express = require('express');
const path = require('path');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const connectDB = require('./config/db')
const{errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT
const fileupload = require('express-fileupload')
const index = require('./routes/index')

const Like = require('./models/likeModel');
const asyncHandler = require('express-async-handler');

connectDB()
const app = express();
app.use(bodyParser.json());

app.use(express.json())
app.use(cors({origin: "*"}));
app.use(express.urlencoded({
    extended: true
  }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',index)

app.use('/', express.static(path.join(__dirname, 'frontend/build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'))
});

app.use(errorHandler) 
app.use(fileupload({useTempFiles:true}))



app.listen(port, ()=> console.log(`server running on port ${port}`));
