import axios from 'axios';


export function registration(data) {
    try {
        console.log("This is the Sign up part", data);
        let data1 = axios.post(`http://localhost:5000/api/user/register`, data);
        return data1;
    } catch (error) {
        return error;
    }

};



export function login(data) {

    try {
        console.log("This is the Sign in part", data);
        const user = localStorage.getItem("bookStoreToken")
        let data2 = axios.post(`http://localhost:5000/api/user/login`, data, {
            headers: {
              "token": `${user}`,
            },
          });
        return data2;
    } catch (error) {
        return error;
    }

};


