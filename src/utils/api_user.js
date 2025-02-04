import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../constants";

export const getAllUsers = async (sortType) => {
  try {
    const response = await axios.get(API_URL + "/auth/users", {
      params: { sortType: sortType === "latest" ? "createdAt" : sortType },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get 1 user by email
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(API_URL + "/auth/users/" + email);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// update user by ID
export const updateUser = async (id, name, token) => {
  try {
    const response = await axios.put(API_URL + "/auth/users/" + id, name, {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    });
    toast.success("User updated successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// delete user by ID
export const deleteUser = async (id, token) => {
  try {
    await axios.delete(API_URL + "/auth/users/" + id, {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    });
    toast.success("user deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
