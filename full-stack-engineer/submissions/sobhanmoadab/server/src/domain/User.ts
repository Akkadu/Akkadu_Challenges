import mongoose from "mongoose";

export default class User {

    constructor(
        public name: string,
        public password: string,
        public _id = new mongoose.Types.ObjectId(),
        public token?: string[],
    ) {
    }

}