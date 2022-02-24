// Set up mongoose connection
const mongoose = require('mongoose');
let mongoDB = process.env.MONGO_DB;

async function makeConnection(req,res,next){
        await makeTheConnection().then((result)=>{
            return result;
        },(error)=>{
            return error;
        })
        next();
    };

module.exports = makeTheConnection;


async function makeTheConnection(){
    return new Promise((resolve,reject)=>{
    var connected = false;
    
    mongoose.connect(mongoDB,
        {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        autoIndex: true,
        keepAlive: true,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4
        });
    mongoose.Promise = global.Promise;
    let db = mongoose.connection.db;
    db.on('error',(err)=>{
    reject(err);
    });

    db.once('open',()=>{
    resolve(db);
    });

    })
}
    
    