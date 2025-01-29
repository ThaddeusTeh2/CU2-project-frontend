import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../constants";

//add
export const addLike = async (eId, eType) => {
  try {
    const response = await axios.post(API_URL + "/like/" + eId, eType);
    toast.success("liked!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//delete
export const deleteLike = async (id) => {
  try {
    const response = await axios.delete(API_URL + "/like/" + id);
    toast.success("unliked!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
