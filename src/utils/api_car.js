import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../constants";

//get all
export const getCars = async (type, brand, sortType) => {
  try {
    const response = await axios.get(API_URL + "/car", {
      params: {
        type,
        brand,
        sortType: sortType === "latest" ? "createdAt" : sortType,
        // 'latest' --> 'createdAt'
        // 'name' --> 'name'
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//get all admin
export const getCarsAdmin = async (token, sortType = "latest") => {
  console.log(token);
  try {
    const response = await axios.get(API_URL + "/car/admin", {
      params: {
        sortType: sortType === "latest" ? "createdAt" : sortType,
      },
      headers: {
        Authorization: "Bearer " + token.token,
      },
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
export const addCar = async (carData, token) => {
  try {
    console.log(token);
    const response = await axios.post(
      API_URL + "/car",
      {
        name: carData.name,
        description: carData.description,
        type: carData.type,
        brand: carData.brand,
        image: carData.image,
      },
      {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );
    toast.success("car added successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//edit
export const editCar = async (id, carData, token) => {
  try {
    const response = await axios.put(
      API_URL + "/car/" + id,
      {
        name: carData.name,
        description: carData.description,
        type: carData.type,
        brand: carData.brand,
        image: carData.image,
      },
      {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );
    toast.success("car updated successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//delete
export const deleteCar = async (id, token) => {
  try {
    await axios.delete(API_URL + "/car/" + id, {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    });
    toast.success("car deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
