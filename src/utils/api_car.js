import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../constants";

//get all
export const getCars = async () => {
  try {
    const response = await axios.post(API_URL + "/car", {
      type,
      brand,
      sortType,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//get 1
export const getCar = async (id) => {
  try {
    const response = await axios.get(API_URL + "/car/" + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//add
export const addCar = async () => {
  try {
    const response = await axios.post(API_URL + "/car", carData);
    toast.success("car added successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//edit
export const editCar = async (id) => {
  try {
    const response = await axios.put(API_URL + "/car/" + id, carData);
    toast.success("car updated successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//delete
export const deleteCar = async (id) => {
  try {
    await axios.delete(API_URL + "/car/" + id);
    toast.success("car deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
