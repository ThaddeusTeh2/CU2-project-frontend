import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../constants";

//get all
export const getTypes = async (sortType, search) => {
  try {
    const response = await axios.get(API_URL + "/type", {
      params: {
        sortType: sortType === "latest" ? "createdAt" : sortType,
        search: search?.trim() || "all",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//get 1
export const getType = async (id) => {
  try {
    const response = await axios.get(API_URL + "/type/" + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//add
export const addType = async (name, token) => {
  try {
    console.log(token);
    const response = await axios.post(
      API_URL + "/type",
      {
        name: name,
      },
      {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );
    toast.success("type added successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//edit
export const editType = async (id, name, token) => {
  try {
    const response = await axios.put(
      API_URL + "/type/" + id,
      {
        name: name,
      },
      {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );
    toast.success("Type updated successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//delete
export const deleteType = async (id, token) => {
  try {
    const response = await axios.delete(API_URL + "/type/" + id, {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    });
    toast.success("type deleted successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
