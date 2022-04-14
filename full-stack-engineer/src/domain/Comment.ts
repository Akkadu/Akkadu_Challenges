import mongoose from "mongoose";

export default class Comment {
    constructor(
        public name: string,
        public rating: number = 0,
        public content: string,
        public productId: mongoose.Schema.Types.ObjectId,
        public id?: mongoose.Schema.Types.ObjectId,
    ) {
    }

}