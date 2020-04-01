import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'https://akkadu-careers.s3.cn-north-1.amazonaws.com.cn'
    })
}