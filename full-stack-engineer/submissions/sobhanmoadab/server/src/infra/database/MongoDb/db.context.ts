import { injectable } from "inversify";
import mongoose from "mongoose";
import { commentSchema } from "./models/Comment";
import { productSchema } from "./models/Product";

const defaultMongoUri = process.env.DEFAULT_MONGO_URI ? process.env.DEFAULT_MONGO_URI : "mongodb://localhost/product_review_challenge"
const dockerMongoUri = process.env.DOCKER_MONGO_URI ? process.env.DOCKER_MONGO_URI : "mongodb://mongo/product_review_challenge"

@injectable()
export class DbContext {

    private _db: typeof mongoose

    async connect() {
        this._db = await mongoose.connect(defaultMongoUri)
        console.log('connected to DB')
    }

    get product() {
        return this._db.model('Product', productSchema)
    }

    get comment() {
        return this._db.model('Comment', commentSchema)
    }
}