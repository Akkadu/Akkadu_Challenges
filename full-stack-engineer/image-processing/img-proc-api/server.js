const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mime = require('mime');
var cors = require('cors');


const dotenv = require('dotenv')

dotenv.config();
// app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
// parse application/json
app.use(bodyParser.json());


// var corsOptions = {
//   origin: 'https://fluffy-frog.surge.sh/',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// const corsOptions ={
//     origin:'https://fluffy-frog.surge.sh/', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

 

const uploadImage = async (req, res, next) => {
      // to declare some path to store your converted image
      var matches = req.body.base64image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
      console.log(matches)
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    let fileName =  "image." + extension;
    console.log("response2===>",matches)
    try {
      fs.writeFileSync("./images/" + fileName, imageBuffer, 'utf8');
      return res.send({"status":"success","image":imageBuffer});
  } catch (e) {
      next(e);
  }
}

app.post('/upload/image', uploadImage) 
app.get('/', (req,res)=>{
  res.send("server is runnning")
}) 
 
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`))
