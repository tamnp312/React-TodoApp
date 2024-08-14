import React, { useContext, useEffect, useRef, useState } from "react";
import TopNav from "../Utils/TopNav";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import axios from 'axios';

const API_BASE_URL = "https://669dc88e9a1bda3680045918.mockapi.io/api/Todo";

const EditTodo = () => {
  const {
    data,
    setData,
    edit,
    setEdit,
    setEditNotificationTitle,
    setEditNotification,
    index,
  } = useContext(DataContext);

  const [emptyInputError, setEmptyInputError] = useState(false);
  const [nameCountError, setNameCountError] = useState("");
  const [descriptionCountError, setDescriptionCountError] = useState("");

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleEditTitle = (e) => {
    const title = e.target.value;
    setEdit((prev) => ({
      ...prev,
      title,
    }));

    if (title.length >= 35) {
      setNameCountError("Name should be less than or equal to 30 characters");
    } else {
      setNameCountError("");
    }
  };

  const handleEditDescription = (e) => {
    const desc = e.target.value;
    setEdit((prev) => ({
      ...prev,
      desc,
    }));

    if (desc.length >= 200) {
      setDescriptionCountError("Description should be less than or equal to 200 characters");
    } else {
      setDescriptionCountError("");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (edit.title.trim() === "") {
      setEmptyInputError(true);
      setTimeout(() => setEmptyInputError(false), 4000);
    } else {
      try {
        await axios.put(`${API_BASE_URL}/${edit.id}`, {
          ...edit
        });

        const updatedData = data.map((item, idx) =>
          idx === index ? { ...edit } : item
        );
        setData(updatedData);
        setEdit("");
        navigate("/");

        setEditNotificationTitle(edit.title);
        setEditNotification(true);
        setTimeout(() => {
          setEditNotification(false);
          setEditNotificationTitle("");
        }, 4000);
      } catch (error) {
        console.error("Failed to update todo item", error);
      }
    }
  };

  const handleCancel = () => {
    setEdit("");
    navigate("/");
  };



  return (
    <div className="w-full relative min-h-screen bg-purple-600">
      <div className="max-w-[1300px] px-10 max-md:px-5 m-auto">
        <TopNav title={"Edit Todo"} />
        <div className="mt-10">
          <form className="max-w-[600px] m-auto">
            <div>
              <label
                className={`text-sm max-sm:text-xs ${
                  nameCountError ? "text-red-500" : "text-purple-200"
                } text-purple-200`}
                htmlFor="taskName"
              >
                Edit Name
              </label>
              <input
                type="text"
                id="taskName"
                value={edit.title}
                onChange={handleEditTitle}
                onKeyDown={handleKeyDown}
                placeholder="Enter task name"
                className={`w-full h-14 max-sm:h-12 ${
                  nameCountError ? "border-red-500 border-2" : "border-none"
                } rounded-xl p-4 text-base max-sm:placeholder:text-sm mt-1 outline-none`}
              />
              <p className="text-red-500 text-base max-sm:text-xs mt-1">
                {nameCountError}
              </p>
            </div>
            <div className="mt-7 max-sm:mt-4">
              <label
                className={`text-sm max-sm:text-xs ${
                  descriptionCountError ? "text-red-500" : "text-purple-200"
                } text-purple-200`}
                htmlFor="taskDescription"
              >
                Task Description
              </label>
              <textarea
                id="taskDescription"
                value={edit.desc}
                onChange={handleEditDescription}
                placeholder="Enter task description"
                className={`resize-none ${
                  descriptionCountError
                    ? "border-red-500 border-2"
                    : "border-none"
                } w-full rounded-xl p-4 max-sm:p-3 mt-1 text-base max-sm:placeholder:text-sm h-48 max-sm:h-36 outline-none`}
              ></textarea>
              <p className="text-red-500 text-base max-sm:text-xs mt-1">
                {descriptionCountError}
              </p>
            </div>
            
            <div className="text-center flex gap-4 max-sm:flex-col mt-4">
              <button
                onClick={handleCancel}
                className="bg-purple-400 hover:bg-purple-800 transition text-xl font-bold text-white p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full"
              >
                Cancel
              </button>
              <button
                disabled={
                  nameCountError || descriptionCountError || !edit.id
                }
                type="submit"
                onClick={handleEditSubmit}
                className={`${
                  nameCountError || descriptionCountError || !edit.id
                    ? "bg-purple-700 cursor-not-allowed text-purple-400"
                    : "hover:bg-purple-800 text-white"
                } transition text-xl font-bold bg-purple-500 p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full`}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
