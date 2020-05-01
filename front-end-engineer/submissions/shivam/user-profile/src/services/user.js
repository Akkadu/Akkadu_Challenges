import axios from "axios";

const BASE_URL = "https://akkadu-careers.s3.cn-north-1.amazonaws.com.cn/challenges/fe/data/json"

export default class UserService {
    constructor() {
        this.endpoint = "users.json";
    }

    async get() {
        try {
            let result = await axios.get(`${BASE_URL}/${this.endpoint}`);
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }
}