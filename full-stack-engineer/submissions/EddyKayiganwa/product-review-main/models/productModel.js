const mongoose = require('mongoose');
const productSchema=new mongoose.Schema({
product_name:{
    type:String,
    required:true
},
product_type:{
    type:String,
    required:true
},
product_price:{
    type:Number,
    required:true
},
imagePath: {type: String, required: true},
CreatedAt:{
    type:Date,
    default:Date.now
},
//  add review
reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Review"
}]
});
const pr=mongoose.model('product',productSchema)
module.exports=pr;