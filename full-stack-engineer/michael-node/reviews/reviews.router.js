const reviewController = require('./reviews.controller');

exports.routerConfig = (app)=>{

    //Create a new Assembly Manager
    app.post('/review/create',[reviewController.createReview]);

    //Get all Assembly Managers
    app.get('/review/getAllReviews',[reviewController.getAllReviews]);

    //Get specific Assembly Manager
    app.get('/review/getSpecific',[reviewController.getSpecificReview]);

    //Update specific Assembly Manager
    app.put('/bills/updateReview',[reviewController.updateSpecificReview]);

    //Aprove specific bill
    app.put('/bills/delete',[reviewController.delete]);

}
