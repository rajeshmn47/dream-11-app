import axios from "axios";

import {
  ADD_CONFETTI,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REMOVE_CONFETTI,
  RESTORE_TOKEN,
  URL,
} from "../constants/userConstants";
import AsyncStorage from "@react-native-community/async-storage";
import { DevSettings } from "react-native";

//import {API} from "../shared/api"

export const API = axios.create({ baseURL: `${URL}` });
const API_NEW = axios.create({ baseURL: `${URL}` });

// for ec2 environment
// const API = axios.create({ baseURL: 'http://54.84.192.90:8080/api' });
// const API_NEW = axios.create({ baseURL: 'http://54.84.192.90:8081/api' });

API.interceptors.request.use(async (req:any) => {
  const servertoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NWQxOGE4YWI5MDE1MTQ3ZDE2Nzc1YmYiLCJpYXQiOjE3MjAwNjc4MjgsImV4cCI6MTc1MDA2NzgyOH0.OhlljUvsTOdrKNbci5dX_U4IUGuCAobntz_37tW2_PA";
  req.headers.Authorization = `Bearer ${servertoken}`;
  req.headers.servertoken = servertoken;
  req.headers.ContentType = "application/json";
return req;
});

const headers = {
  Accept: "application/json",
};
export const register = (myform:any) => async (dispatch:any) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const { data } = await axios.post(`${URL}/auth/register`, {
      myform,
    });
    localStorage.setItem("server_token", data.server_token);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error:any) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const login = (myform:any) => async (dispatch:any) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(`${URL}/auth/login`, {
      myform,
    });
    localStorage.setItem("token", data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error:any) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const forgot = (email:any) => async (dispatch:any) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.get(`${URL}/auth/forgot-password/${email}`);
    localStorage.setItem("token", data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error:any) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch:any) => {
  try {
    await AsyncStorage.removeItem("server_token");
    dispatch({type:LOGOUT_SUCCESS})
    DevSettings.reload()
  } catch (error:any) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const addconfetti = () => async (dispatch:any) => {
  try {
    dispatch({ type: ADD_CONFETTI });
  } catch (error:any) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const removeconfetti = () => async (dispatch:any) => {
  try {
    dispatch({ type: REMOVE_CONFETTI });
  } catch (error:any) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const loadToken = () => async (dispatch:any) => {
  try {
    const server_token = await AsyncStorage.getItem("server_token");
    if (server_token) {
      dispatch({ type: RESTORE_TOKEN, payload: server_token });
    }
  } catch (error) {
    console.log(error);
  }
};

export const loadUser = () => async (dispatch:any) => {
  try {
    const servertoken = await AsyncStorage.getItem("server_token");
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await API.get(`/auth/loaduser`);
    if (data?.message) {
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.message });
    }
  } catch (error) {
    console.log(error);
  }
};