import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getuser } from "../services/authService";
import { FaSignOutAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { getalltask, deletetask, addtask, updatetask, upsatestatus } from "../services/taskService";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

const TaskView = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [deletetaskitem, setdeletetaskitem] = useState({});
  const [error, setError] = useState(null);
  const [isdeleteModalOpen, setIsdeleteModalOpen] = useState(false);
  const [isaddModalOpen, setIsaddModalOpen] = useState(false);
  const [isupdateModalOpen, setIsupdateModalOpen] = useState(false);
  const [isupdatestatusModalOpen, setIsupdatestatusModalOpen] = useState(false);
  const [task_name, setTask_name] = useState("");
  const [utid, setutid] = useState("");

  //   Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const task = await getalltask(); 
      setTasks(task);
    } catch (error) {
      setError("Failed to fetch tasks");
      console.error("Failed to fetch tasks:", error);
    }
  };

  const getUser = async () => {
    try {
      const u = await getuser();
      setUser(u);
      console.log(u);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };
 


  //   Handle task deletion
  const deleteTasks = async (task) => {
    setdeletetaskitem(task);
    setIsdeleteModalOpen(true);
  };

// update task
  const update_task = async (task) => {
    setutid(task.id);
    setIsupdateModalOpen(true);
  };

  // update status
  const update_status = async (task) => {
    setutid(task.id);
    setIsupdatestatusModalOpen(true);
  };

  const handlestatusupdate = () => {
    upsatestatus(utid);
    fetchTasks();
    setIsupdatestatusModalOpen(false);
  }
  //   Cancel btton
  const cancelDelete = () => {
    setIsdeleteModalOpen(false);
    setIsaddModalOpen(false);
    setIsupdateModalOpen(false);
    setIsupdatestatusModalOpen(false);
  };

  const co_deletetask = () => {
    deletetask(deletetaskitem);
    fetchTasks();
    setIsdeleteModalOpen(false);
  };

  const handleaddSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields and password matching
    if (!task_name) {
      setError("Please fill all fields.");
      return;
    }
    try {
      await addtask(task_name);
      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("adding failed");
    }

    setError(""); // Clear error if form is valid
    console.log("Added Successful:");
    setIsaddModalOpen(false);
    // Here you would send the form data to the backend API for registration
  };

  const handleupdateSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields and password matching
    if (!task_name) {
      setError("Please fill all fields.");
      return;
    }
    try {
      await updatetask(task_name, utid);
      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("adding failed");
    }

    setError(""); 
    console.log("Added Successful:");
    setIsupdateModalOpen(false);

  };

  useEffect(() => {
    fetchTasks();
    getUser();
  }, []);

  const logOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#808080_100%)] flex items-center justify-center min-h-screen bg-gray-400">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-center  justify-between mb-5">
          <h1 className="text-2xl font-bold text-center text-black">Tasks</h1>
          <h4>Hi, {user.name}</h4>
          <button onClick={logOut}>
            <FaSignOutAlt className="text-2xl hover:cursor-pointer hover:text-red-900" />
          </button>
        </div>
        <div className="flex items-center  justify-between mb-5">
          <h1 className="text-2xl font-bold text-center text-black"></h1>
          <h4></h4>
          <button
            className="flex items-center bg-black rounded-lg text-white p-1 px-2 hover:bg-gray-800 hover:cursor-pointer"
            onClick={() => setIsaddModalOpen(true)}
          >
            <FaPlus className="text-xs hover:cursor-pointer  mr-2" />
            <p className="text-sm">Add Task</p>
          </button>
        </div>
        <div className="flex items-center  justify-between ">
          <h1 className="font-bold text-center text-black">To Do Task</h1>
        </div>
        <div className="mb-10">
          {error && <p>{error}</p>}
          <table className="min-w-full">
            <tbody>
              {tasks.length > 0 ? (
                tasks.map(
                  (task) =>
                    task.status === "pending" && (
                      <tr key={task.id}>
                        <td className="px-4 py-2 flex gap-5">
                          <p className="min-w-[100px]">{task.task_name}</p>
                          <button
                            className="text-white hover:bg-red-800 p-1 rounded-lg bg-black hover:cursor-pointer"
                            onClick={() => deleteTasks(task)}
                          >
                            <AiFillDelete />
                          </button>
                          <button className="text-white hover:bg-blue-600 p-1 rounded-lg bg-black hover:cursor-pointer"
                          onClick={() => update_task(task)}>
                            <AiOutlineEdit />
                          </button>
                        </td>
                        <td className="px-4 py-2 ">
                          <button className="text-white hover:bg-green-700 p-1 rounded-lg bg-black hover:cursor-pointer"
                          onClick={() => update_status(task)}>
                            <FaCheck />
                          </button>
                        </td>
                        <td className="px-4 py-2">
                          {/* Add any actions you want here, like edit/delete buttons */}
                        </td>
                      </tr>
                    )
                )
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">
                    No tasks available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center  justify-between">
          <h1 className="font-bold text-center text-black">Completed Task</h1>
        </div>
        <div className="mb-5">
          {error && <p>{error}</p>}
          <table className="min-w-full">
            <tbody>
              {tasks.length > 0 ? (
                tasks.map(
                  (task) =>
                    task.status === "done" && (
                      <tr key={task.id}>
                        <td className="px-4 flex gap-5 w-[200px]">
                          <div className="w-[100px]">{task.task_name}</div>
                        </td>
                      </tr>
                    )
                )
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">
                    No tasks available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      {isdeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold text-center">
              Are you sure you want to delete this task?
            </h3>
            <div className="flex justify-between mt-4">
              <button
                onClick={co_deletetask}
                className="px-4 py-1 bg-black text-white rounded-lg hover:bg-red-800 hover:cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-1 bg-black text-white rounded-lg hover:bg-gray-600 hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/*task create Modal */}
      {isaddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold text-center">Add a Task</h3>
            <form onSubmit={handleaddSubmit}>
              <div className="flex justify-between mt-4">
                <input
                  type="text"
                  required
                  onChange={(e) => setTask_name(e.target.value)}
                  placeholder="Task Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                ></input>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="px-4 py-1 bg-black text-white rounded-lg hover:bg-green-700 hover:cursor-pointer"
                >
                  Add
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-4 py-1  text-white rounded-lg bg-black hover:bg-gray-600  hover:cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/*update create Modal */}
      {isupdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold text-center">Edit the Task</h3>
            <form onSubmit={handleupdateSubmit}>
              <div className="flex justify-between mt-4">
                <input
                  type="text"
                  required
                  onChange={(e) => setTask_name(e.target.value)}
                  placeholder="Add New Task Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                ></input>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="px-4 py-1 bg-black text-white rounded-lg hover:bg-green-700 hover:cursor-pointer"
                >
                  Add
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-4 py-1  text-white rounded-lg bg-black hover:bg-gray-600  hover:cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/*update status Modal */}
      {isupdatestatusModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold text-center">
              Are you complete this task?
            </h3>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlestatusupdate}
                className="px-4 py-1 bg-black text-white rounded-lg hover:bg-green-700 hover:cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-1 bg-black text-white rounded-lg hover:bg-gray-600 hover:cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskView;
