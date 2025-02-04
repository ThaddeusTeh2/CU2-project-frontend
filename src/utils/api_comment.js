import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../constants";

//get all comments (actually)
export const getAllComments = async (sortType) => {
  try {
    console.log(sortType === "latest" ? "createdAt" : "content");
    const response = await axios.get(API_URL + "/comment", {
      params: {
        sortType: sortType === "latest" ? "createdAt" : "content",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//get all comments based on car
export const getComments = async (carId, sortType = "latest") => {
  try {
    const response = await axios.get(API_URL + "/comment/" + carId, {
      params: {
        sortType: sortType === "latest" ? "createdAt" : "content",
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
export const addComment = async (carId, content, userId, token) => {
  console.log(content);
  try {
    const response = await axios.post(
      API_URL + "/comment/" + carId,
      {
        content: content,
        userId: userId,
      },
      {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );
    toast.success("comment added successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//edit
export const editComment = async (commentId, updatedContent, token) => {
  try {
    const response = await axios.put(
      API_URL + "/comment/" + commentId,
      {
        content: updatedContent,
      },
      {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );
    toast.success("comment updated successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//delete
export const deleteComment = async (commentId, userId, userRole, token) => {
  console.log(commentId, userId, userRole, token);
  try {
    const response = await axios.delete(API_URL + "/comment/" + commentId, {
      data: {
        userId: userId,
        userRole: userRole,
      },
      headers: {
        Authorization: "Bearer " + token.token,
      },
    });
    toast.success("comment deleted successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
