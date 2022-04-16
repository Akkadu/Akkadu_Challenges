import { injectable } from "inversify";
import mongoose from "mongoose";
import { commentSchema } from "./models/Comment";
import { productSchema } from "./models/Product";

@injectable()
export class DbContext {

    private _db: typeof mongoose

    async connect() {
        this._db = await mongoose.connect('mongodb://mongo/product_review_challenge')
        console.log('connected to DB')
    }

    get product() {
        return this._db.model('Product', productSchema)
    }

    get comment() {
        return this._db.model('Comment', commentSchema)
    }
}