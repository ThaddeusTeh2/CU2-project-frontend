import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../../constants";

export const overview = async () => {
  try {
    const response = await axios.get(API_URL + "/review/");
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
