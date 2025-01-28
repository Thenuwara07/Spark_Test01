import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getalltask = async () => {
  try {
    const response = await axios.get(API_URL + "/tasks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching task:",
      error.response?.data || error.message
    );
    throw error; // Re-throw the error if you need to handle it further
  }
};

export const addtask = async (task_name) => {
  try {
    const response = await axios.post(
      API_URL + "/tasks",
      { task_name },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding task:", error.response?.data || error.message);
    throw error; // Re-throw the error if you need to handle it further
  }
};

export const updatetask = async (task_name, id) => {
  try {
    const response = await axios.put(
      API_URL + `/tasks/${id}`,
      { task_name },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding task:", error.response?.data || error.message);
    throw error; // Re-throw the error if you need to handle it further
  }
};

export const deletetask = async (task) => {
  try {
    const response = await axios.delete(API_URL + `/tasks/${task.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting task:",
      error.response?.data || error.message
    );
    throw error; // Re-throw the error if you need to handle it further
  }
};

export const upsatestatus = async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/task/${id}/status`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating task status:",
      error.response?.data || error.message
    );
    throw error; // Re-throw the error if you need to handle it further
  }
};
