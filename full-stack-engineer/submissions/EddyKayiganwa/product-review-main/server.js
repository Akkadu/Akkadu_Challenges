const express = require('express');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const connectDB = require('./config/db')
const{errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const fileupload = require('express-fileupload')
const index = require('./routes/index')
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
app.post('/upload', (req, res) => {
  console.log(req.files.foo);
});

app.use(errorHandler) 
app.use(fileupload({useTempFiles:true}))



app.listen(port, ()=> console.log(`server running on port ${port}`));
