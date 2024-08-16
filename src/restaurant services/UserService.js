import axios from "axios";
const config = {
    Headers:{
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
}

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const REST_API_BASE_URL = "http://localhost:8080/api/user";

export const UserLogin = (details) => axios.post(REST_API_BASE_URL+"/login",details,config);
export const ChangePassword = (details) => axios.post(REST_API_BASE_URL+"/password",details,config);
export const NewPassword = (details) => axios.put(REST_API_BASE_URL+"/password",details,config);

export const CreateNewUser = (user) => axios.post(REST_API_BASE_URL+"/signup",user,config);
export const findDuplicateUser = (user) => axios.get(REST_API_BASE_URL+"/signup",{params:{username:user}},config);

export const AddRestaurant = (user_rest) => axios.post(REST_API_BASE_URL+window.location.pathname+"/new",user_rest,config);
export const RemoveRestaurant = (user_rest) => axios.post(REST_API_BASE_URL+window.location.pathname+"/remove",user_rest,config);
export const ChangeRestaurantName = (rest_details) => axios.put(REST_API_BASE_URL+"restaurant/rename",rest_details,config);
export const GetAllUserRestaurants = () => axios.get(REST_API_BASE_URL+"/restaurant/userpage",config);
export const GetAllOwnerRestaurants = () => axios.get(REST_API_BASE_URL+window.location.pathname+"/all",config);
export const SuggestAllRestaurants = (name) => axios.get(REST_API_BASE_URL+window.location.pathname+"/"+name,{params:{}},config);

export const AddFoodItem = (id,item) => axios.post(REST_API_BASE_URL+"/menu/add",item,{params:{rest_id:id}},config);
export const GetAllItems = (id) => axios.get(REST_API_BASE_URL+"/menu/all",{params:{rest_id:id}},config);
export const GetAllCategories = (id) => axios.get(REST_API_BASE_URL+"/menu/categories",{params:{rest_id:id}},config);
export const RemoveItems = (id,items) => axios.post(REST_API_BASE_URL+"/menu/remove/items",items,{params:{rest_id:id}},config);
export const RemoveCategories = (id,items) => axios.post(REST_API_BASE_URL+"/menu/remove/category",items,{params:{rest_id:id}},config);