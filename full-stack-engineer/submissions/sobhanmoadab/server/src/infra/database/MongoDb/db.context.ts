import { injectable } from "inversify";
import mongoose from "mongoose";
import { commentSchema } from "./models/Comment";
import { productSchema } from "./models/Product";

const mongoUri = process.env.DOCKER_MONGO_URI ? process.env.DOCKER_MONGO_URI : "mongodb://localhost/product_review_challenge"

@injectable()
export class DbContext {

    private _db: typeof mongoose

    async connect() {
        this._db = await mongoose.connect("mongodb+srv://sobhan:Sobhan1810@cluster0.lbz4a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        console.log('connected to DB')
    }

    get product() {
        return this._db.model('Product', productSchema)
    }

    get comment() {
        return this._db.model('Comment', commentSchema)
    }
}