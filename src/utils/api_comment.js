import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../constants";

//get all
export const getComments = async (carId, sortType = "latest") => {
  try {
    const response = await axios.get(API_URL + "/comment/" + carId, {
      params: {
        sortType: sortType === "latest" ? "createdAt" : sortType,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//get 1
export const getComment = async (commentId) => {
  try {
    const response = await axios.get(API_URL + "/comment/" + commentId);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//add
export const addComment = async (carId, content, userId) => {
  console.log(content);
  try {
    const response = await axios.post(API_URL + "/comment/" + carId, {
      content: content,
      userId: userId,
    });
    toast.success("comment added successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//edit
export const editComment = async (commentId, updatedContent) => {
  try {
    const response = await axios.put(API_URL + "/comment/" + commentId, {
      content: updatedContent,
    });
    toast.success("comment updated successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//delete
export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(API_URL + "/comment/" + commentId);
    toast.success("comment deleted successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
