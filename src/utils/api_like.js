import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../constants";

//add
export const addLike = async (eId, eType, token) => {
  try {
    const response = await axios.post(API_URL + "/like/" + eId, eType, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    toast.success("liked!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//delete
export const deleteLike = async (id, token) => {
  try {
    const response = await axios.delete(API_URL + "/like/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    toast.success("unliked!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
