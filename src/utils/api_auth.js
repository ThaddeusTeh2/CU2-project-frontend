import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../../constants";

//login
export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//signup
export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//chck if cookie exist or not
export const getCurrentUser = (cookies) => {
  return cookies.currentUser ? cookies.currentUser : null;
};

//is user logged in?
export const isUserLoggedIn = (cookies) => {
  const user = getCurrentUser(cookies);
  return user !== undefined && user !== null;
};

//he admin??
export const isAdmin = (cookies) => {
  const currentUser = getCurrentUser(cookies);
  return currentUser && currentUser.role;
};

// function to access cookies.currentUser.token
export const getUserToken = (cookies) => {
  const currentUser = getCurrentUser(cookies);
  return currentUser && currentUser.token ? currentUser.token : "";
};
