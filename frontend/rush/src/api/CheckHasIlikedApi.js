import axios from "axios";
import {BACKEND_ADDRESS} from "../constants/ADDRESS";

const checkHasIlikedApi = (accessToken, articleId) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  };
  return axios.get(BACKEND_ADDRESS + "/articles/"+articleId+"/like", config)
  .then(response => response.data);
};

export default checkHasIlikedApi;