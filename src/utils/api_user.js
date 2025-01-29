import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../constants";

export const getAllUsers = async (sortType = "latest") => {
  try {
    const response = await axios.get(API_URL + "/auth/users", sortType);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get 1 user by email
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(API_URL + "/auth/users" + email);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// update user by ID
export const updateUser = async (id, name) => {
  try {
    const response = await axios.put(API_URL + "/auth/users" + id, name);
    toast.success("User updated successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// delete user by ID
export const deleteUser = async (id) => {
  try {
    await axios.delete(API_URL + "/auth/users" + id);
    toast.success("user deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
