/*
*Exports the Mutations and Query functions
*Methods invoked from Mongoose ORM
*Author Mike Mwambia
*Date : 18th Feb 2021
*/
const reviewSchema = require('../../models/reviews');
module.exports = {
    //Document Modifications
    Mutation : {
        async post(_,args) {
            const newReview = new reviewSchema({
                name : args.name,
                rating : args.rating,
                reviewNote : args.reviewNote,
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
                    {rating:args.rating},{reviewNote:args.review},{timestamp:args.timestamp})
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
        allReview : async ()=>{
            let allReview = await reviewSchema.find().then((err,data)=>{
                if(err){
                    console.log(err)
                    return err;
                }else{
                    console.log(data)
                    return data
                }
            })

            return allReview;

            /*
            try{
                return await reviewSchema.find()
            }catch(err){
                return err
            }*/ 
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