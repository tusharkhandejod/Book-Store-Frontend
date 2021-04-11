import Axios from "./axiosServices";
const baseUrl = "http://localhost:6000/api/user"
const axios = new Axios();

export default class userServices {
    SignUp = (data) => {
        console.log('we are inside on userServices SignUp function',data)
        return axios.Post(`${baseUrl}/register`, data);
    };

    SignIn = (data) => {
        console.log('we are inside on userServices SignIn function',data)
        return axios.Post(`${baseUrl}/login`, data);
    }

}