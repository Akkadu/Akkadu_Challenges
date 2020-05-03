import axios from "axios";

const BASE_URL = "https://akkadu-careers.s3.cn-north-1.amazonaws.com.cn/challenges/fe/data/json"

class Service {
    async makeRequest(method, endpoint, data = null) {
        try {
            let result = await axios({
                method: method,
                url: `${BASE_URL}/${endpoint}`,
                data: data
            });
            return result.data;
        } catch (error) {
            console.log("service makeRequest error", error);
        }
    }

    async getUsers() {
        return this.makeRequest("get", "users.json")
    }
}

export default {
    install(Vue) {
        const apiService = new Service;
        Vue.prototype.$service = apiService;
        Vue.service = apiService;
    }
}