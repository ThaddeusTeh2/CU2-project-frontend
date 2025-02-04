import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../constants";

//get all brands
export const getBrands = async (sortType) => {
  try {
    const response = await axios.get(API_URL + "/brand", sortType);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//get 1 brand
export const getBrand = async (id) => {
  try {
    const response = await axios.get(API_URL + "/brand/" + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//add brand
export const addBrand = async (name, token) => {
  try {
    const response = await axios.post(
      API_URL + "/brand/",
      {
        name: name,
      },
      {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );
    toast.success("brand added successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//edit brand
export const editBrand = async (id, name, token) => {
  try {
    const response = await axios.put(
      API_URL + "/brand/" + id,
      {
        name: name,
      },
      {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );
    toast.success("brand updated successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//delete brand
export const deleteBrand = async (id, token) => {
  try {
    const response = await axios.delete(API_URL + "/brand/" + id, {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    });
    toast.success("brand deleted successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
