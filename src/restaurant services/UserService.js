import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/user";

export const UserLogin = (details) => axios.post(REST_API_BASE_URL+"/login",details);
export const CreateNewUser = (user) => axios.post(REST_API_BASE_URL+"/signup",user);
export const GetAllRestaurants = () => axios.get(REST_API_BASE_URL+"/restaurants");