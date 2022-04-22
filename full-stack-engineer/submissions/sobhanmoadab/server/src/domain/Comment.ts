import mongoose from "mongoose";
import { ID } from "./shared/ID";

export default class Comment {
    constructor(
        public name: string,
        public rating: number = 0,
        public content: string,
        public productId: ID,
        public userId: ID,
        public _id = new mongoose.Types.ObjectId(),
    ) {
    }

}