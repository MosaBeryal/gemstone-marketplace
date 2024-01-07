import { BASE_URL, LOGIN_USER, UPLOAD_FILE } from "../config/apiRoutes";
import axios from "axios";


const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`http://localhost:8800/api/auth/login`, credentials);

        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        }
        //set data of user in local storage

    } catch (err) {
        throw new Error(err.response?.data?.message || "Login failed"); // Throw the error with a custom message
    }
};

const logoutUser = async () => {

    try {
        // Return a successful response
        localStorage.removeItem("user");
        return { success: true };
    } catch (error) {
        // Handle any errors that occur during logout
        throw new Error("Logout failed");
    }
};

//Register User
const registerUser = async (credentials) => {
    try {
        const response = await axios.post(`http://localhost:8800/api/auth/register`, credentials);

            return response.data;
        
    } catch (err) {
        throw new Error(err.response?.data?.message || "Registration failed"); // Throw the error with a custom message
    }
};

export { loginUser, logoutUser, registerUser }