import axios from "axios";

const API_URL = "http://localhost:8000/api";


export const register = async (name, email, password) => {
  const response = axios.post(API_URL + "/register", {
    name,
    email,
    password,
    password_confirmation: password,
  });
  if (response.data) {
    // localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "/login", {
      email,
      password,
    });

    if (response.data.token) {
      // Save user and token in localStorage
      // localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);
      return response.data;  // Return the user data along with token
    }
  } catch (error) {
    // Handle errors (e.g., network issues, 401 Unauthorized)
    if (error.response && error.response.data) {
      // Server-side validation or error message
      throw new Error(error.response.data.errors?.email || 'Login failed.');
    } else {
      // Network error or unexpected error
      throw new Error('Something went wrong. Please try again later.');
    }
  }
};

// export const logout = () => {
//   localStorage.removeItem("user");
// }

export const logout = async () => {
  try {
    const response = await axios.post(API_URL + "/logout", {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response.data);

    // Remove token if request is successful
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
  }
};

export const getuser = async () => {
  try {
    const response = await axios.get(
      API_URL + "/user",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching task:",
      error.response?.data || error.message
    );
    throw error; // Re-throw the error if you need to handle it further
  }
};
