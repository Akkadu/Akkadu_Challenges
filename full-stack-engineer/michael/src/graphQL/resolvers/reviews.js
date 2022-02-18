const reviewSchema = require('../../models/review');
//CRUD applications
module.exports = {
    //Document Modifications
    Mutation : {
        async post(_,args) {
            const newReview = new reviewSchema({
                name : args.name,
                rating : args.rating,
                review : args.review,
                timestamp : args.timestamp
            })
            const res = await newReview.save();
            return {
                id : res.id,
                ...res._doc
            };
        },
        async update(_,args) {
            try{
                return await reviewSchema.findOneAndUpdate({_id:args.id},{name:args.name},
                    {rating:args.rating},{review:args.review},{timestamp:args.timestamp})
            }catch(err){
                return err
            }
        },
        async delete(_,args) {
            try {

                return await reviewSchema.findOneAndDelete({_id:args.id})

            }catch(err){

                return err

            }
        }
    },
    //Document Queries 
    Queries : {
        //All review
        allReview : async (_,args)=>{
            try{
                return await reviewSchema.find()
            }catch(err){
                return err
            }
        },
        //Single review
        singleReview : async (_,args)=>{
            try{
                return await reviewSchema.find({_id:args.id})
            }catch(err){
                return err
            }
        }
    }
}