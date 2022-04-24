import Comment from "./Comment";
import mongoose from "mongoose";
import { ID } from "./shared/ID";

export default class Product {

    constructor(
        public name: string,
        public description: string,
        public rating: number,
        public comments: Comment[],
        public img: string,
        public _id = new mongoose.Types.ObjectId(),
    ) {
    }

}