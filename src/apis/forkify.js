import axios from "axios";
import { API_URL } from "../utility/config";

export default axios.create({
    baseURL: API_URL
});