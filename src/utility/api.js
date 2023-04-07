
// export const  API = class {
//     constructor(){
//         URL = "http://127.0.0.1:5000";
//     }
//     this.login = async (data) => await login({URL, ...data})
// }

import axios from "axios";

/*******************************NON AUTH REQUEST************************************/
const AuthClient = axios.create({
    // baseURL: baseURL
    //baseURL: "https://api2.dhanva.icu/",
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});
const AuthService = {
    login: (data) => AuthClient.post('/login/admin', JSON.stringify(data)),
    forgetPassword: (data) => AuthClient.post('/forget/admin', JSON.stringify(data)),
    verifyOtp: (data) => AuthClient.post('/verifyOTP/admin', JSON.stringify(data)),
    changePassword: (data) => AuthClient.post('/changePassword/admin', JSON.stringify(data))

}

/******************************************************************************** */


/***************************AUTHRIZED REQUEST**************************************/
const httpClient = axios.create({
    // baseURL: baseURL
    //baseURL: "https://api2.dhanva.icu/",
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
    }
});

httpClient.interceptors.response.use((response) => Promise.resolve(response),
    (res) => {
        // console.log(res);
        // const { message} = data;
        // if (message === "Token has expired") {
        //     localStorage.clear();
        //     window.location.reload();
        // }
        // if (error === "You must be logged in") {
        //     // console.log("messagemessageerror", error, "You must be logged in");
        //     localStorage.clear();
        // }
        return Promise.reject(res);
    }
)

const HttpService = {
    getAllEvents: ()=>httpClient.get('/get/allevents'),
    getEventById: (id)=> httpClient.get(`/get/event/${id}`),
    addEvent: (data)=>httpClient.post('/add/event/admin', data ,{ headers:{
        'Content-Type':'multipart/form-data'
    }}),
    addImage: (data)=> httpClient.post('/add/event/gallery',data, { headers:{
        'Content-Type':'multipart/form-data'
    }}),
    editEvent: (data)=>httpClient.post('/edit/event', data),
    removeImage: (data)=> httpClient.post('/remove/img', data),
    removeEvent: (id)=> httpClient.post(`/remove/event/${id}`)
}
/******************************************************************************** */


export { AuthService, HttpService };

