import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../constants";

//add
export const addLike = async (eId, eType, token) => {
  try {
    const userId = token._id;
    console.log(token);
    const response = await axios.post(
      API_URL + "/like/" + eId,
      {
        eType: eType,
        userId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }
    );

    toast.success("liked!");
    return response.data;
  } catch (error) {
    console.log("Error in addLike:", error.response?.data || error.message);
  }
};

//delete
export const deleteLike = async (eId, eType, token) => {
  try {
    const userId = token._id;
    const response = await axios.delete(API_URL + "/like/" + eId, {
      params: {
        eType: eType,
        userId: userId,
      },
      headers: {
        Authorization: "Bearer " + token.token,
      },
    });
    toast.success("unliked!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
