import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircle, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const API_BASE_URL = "https://669dc88e9a1bda3680045918.mockapi.io/api/Todo";

const FormInputs = ({
  data,
  setData,
  setAddNotification,
  setAddNotificationTitle,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [emptyInputError, setEmptyInputError] = useState(false);
  const [nameCountError, setNameCountError] = useState("");
  const [descriptionCountError, setDescriptionCountError] = useState("");
  const [maxSelectedError, setMaxSelectedError] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleName = (e) => {
    const title = e.target.value;
    setTaskName(title);
    if (title.length > 35) {
      setNameCountError("Name should be less than or equal to 35 characters");
    } else {
      setNameCountError("");
    }
  };

  const handleDescription = (e) => {
    const description = e.target.value;
    setTaskDescription(description);
    if (description.length > 250) {
      setDescriptionCountError("Description should be less than or equal to 250 characters");
    } else {
      setDescriptionCountError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskName === "") {
      setEmptyInputError(true);
      setTimeout(() => setEmptyInputError(false), 4000);
      return;
    }

    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    let hours = now.getHours();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = (hours % 12 || 12).toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${date}/${month}/${year} ,${hours}:${minutes} ${amOrPm}`;

    const newTask = {
      title: taskName,
      desc: taskDescription,
      completed: false,
      currentTime,
    };

    try {
      const response = await axios.post(API_BASE_URL, newTask);
      const createdTask = response.data;
      const updatedData = [...data, createdTask];
      setData(updatedData);
      setTaskName("");
      setTaskDescription("");
      setEmptyInputError(false);
      navigate("/");
      setAddNotificationTitle(taskName);
      setAddNotification(true);
      setTimeout(() => {
        setAddNotification(false);
        setAddNotificationTitle("");
      }, 4000);
    } catch (error) {
      console.error("Failed to create new task", error);
    }
  };



  return (
    <div className="py-10">
      <form onSubmit={handleSubmit} className="max-w-[600px] m-auto">
        <div>
          <label
            className={`text-sm max-sm:text-xs ${nameCountError ? "text-red-500" : "text-purple-200"} text-purple-200`}
            htmlFor="taskName"
          >
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            placeholder="Enter task name"
            value={taskName}
            onChange={handleName}
            onKeyDown={handleKeyDown}
            className={`w-full h-14 max-sm:h-12 ${nameCountError ? "border-red-500 border-2" : "border-none"} rounded-xl p-4 text-base max-sm:placeholder:text-sm mt-1 outline-none`}
          />
          <p className="text-red-500 text-base max-sm:text-xs mt-1">
            {nameCountError}
          </p>
        </div>
        <div className="mt-7 max-sm:mt-4">
          <label
            className={`text-sm max-sm:text-xs ${descriptionCountError ? "text-red-500" : "text-purple-200"} text-purple-200`}
            htmlFor="taskDescription"
          >
            Task Description
          </label>
          <textarea
            id="taskDescription"
            placeholder="Enter task description"
            value={taskDescription}
            onChange={handleDescription}
            className={`resize-none ${descriptionCountError ? "border-red-500 border-2" : "border-none"} w-full rounded-xl p-4 max-sm:p-3 mt-1 text-base max-sm:placeholder:text-sm h-48 max-sm:h-36 outline-none`}
          ></textarea>
          <p className="text-red-500 text-base max-sm:text-xs">
            {descriptionCountError}
          </p>
        </div>

        <div className="text-center mt-4">
          <button
            disabled={nameCountError || descriptionCountError ? true : false}
            type="submit"
            className={`${
              nameCountError || descriptionCountError
                ? "bg-purple-700 cursor-not-allowed text-purple-400"
                : "hover:bg-purple-800 text-white"
            } transition text-xl font-bold bg-purple-400 p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full`}
          >
            Create Task
          </button>
        </div>
      </form>

      {emptyInputError && (
        <div className="max-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[5px] border-red-600 flex items-center gap-2 fixed bottom-8 left-[50%] -translate-x-[50%]">
          <IoIosCloseCircle className="text-2xl text-red-600" />
          <p className="text-red-600 text-sm max-sm:text-xs">Task name cannot be empty</p>
        </div>
      )}

      {maxSelectedError && (
        <div className="max-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[5px] border-red-600 flex items-center gap-2 fixed bottom-8 left-[50%] -translate-x-[50%]">
          <IoIosCloseCircle className="text-2xl text-red-600" />
          <p className="text-red-600 text-sm max-sm:text-xs">You can select a maximum of 3 categories</p>
        </div>
      )}
    </div>
  );
};

export default FormInputs;
