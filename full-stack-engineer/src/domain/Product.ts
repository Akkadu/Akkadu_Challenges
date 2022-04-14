import Comment from "./Comment";

export default class Product {
    constructor(
        public name: string,
        public description: string,
        public rating: number,
        public comments: Comment[],
        public img: string,
        public id?: string,
    ) {
    }

}