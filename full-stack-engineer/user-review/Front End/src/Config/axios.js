import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:500/api/user/review'
const instance = axios.create({
    baseURL:"https://product--review.herokuapp.com/api/user/review"
})
export default instance