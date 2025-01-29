import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../constants";

//get all
export const getTypes = async (sortType) => {
  try {
    const response = await axios.get(API_URL + "/type", sortType);
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
export const addType = async (name) => {
  try {
    const response = await axios.post(API_URL + "/type", name);
    toast.success("type added successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//edit
export const editType = async (id, name) => {
  try {
    const response = await axios.put(API_URL + "/type/" + id, name);
    toast.success("Type updated successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//delete
export const deleteType = async (id) => {
  try {
    const response = await axios.delete(API_URL + "/type/" + id);
    toast.success("type deleted successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
