import React, { useContext } from "react";
import { BiTask } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
// import { MdContentCopy } from "react-icons/md";
// import { v4 as uuidv4 } from 'uuid';
import DataContext from "../context/DataContext";
import axios from 'axios';

const API_BASE_URL = "https://669dc88e9a1bda3680045918.mockapi.io/api/Todo";

const TasksOptions = ({
  data,
  setData,
  val,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setOpenOptions,
  index
}) => {

  const {setIndex} = useContext(DataContext)

  const handleDelete = async (isData) => {
    try {
      await axios.delete(`${API_BASE_URL}/${isData.id}`);
      const deleteData = data.filter((val) => val.id !== isData.id);
      setData(deleteData);
  
      setDeleteNotificationTitle(isData.title);
      setDeleteNotification(true);
      setOpenOptions(false);
      setTimeout(() => {
        setDeleteNotification(false);
        setDeleteNotificationTitle("");
      }, 4000);
    } catch (error) {
      console.error("Failed to delete the task", error);
    }
  };
  
  const handleCheck = async (id) => {
    try {
      // Find the task to update
      const taskToUpdate = data.find((val) => val.id === id);
  
      if (taskToUpdate) {
        // Toggle the check status
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
  
        // Update the task on the server
        await axios.put(`${API_BASE_URL}/${id}`, updatedTask);
  
        // Update the local state to reflect the change
        const updatedData = data.map((val) =>
          val.id === id ? updatedTask : val
        );
        setData(updatedData);
        setOpenOptions(false);
      }
    } catch (error) {
      console.error("Failed to update the task", error);
    }
  };
  


  return (
    <div className="absolute z-10 w-[215px] shadow bg-white top-8 left-0 max-xl:-left-48 p-3 rounded-2xl">
      <ul className=" flex flex-col text-black">
        <li
          onClick={() => handleCheck(val.id)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 max-sm:py-2 px-2 rounded-md"
        >
          <FaCheck className=" text-2xl max-sm:text-xl text-slate-700" />
          {val.completed ? "Mark as not done" : "Mark as  done"}
        </li>
        <li
          onClick={() => {
            setIndex(index)
            setEdit({
              id: val.id,
              title: val.title,
              desc: val.desc,
              completed: val.completed,
              currentTime: val.currentTime,
            });
          }}
        >
          <Link
            to={"/edit"}
            className=" max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3  px-2 rounded-md"
          >
            <RiEdit2Fill className=" text-2xl max-sm:text-xl text-slate-700" />
            Edit
          </Link>
        </li>
        <li
          onClick={() => handleDelete(val)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
        >
          <MdDelete className=" text-2xl max-sm:text-xl text-slate-700" />
          Delete
        </li>
        <li>
          <Link
            to={`/todo/${val.id}`}
            className=" max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
          >
            <BiTask className=" text-2xl max-sm:text-xl text-slate-700" />
            Task details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TasksOptions;
