
import React, { useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import TasksOptions from "./TasksOptions";
import { FaCheck } from "react-icons/fa6";

const Todo = ({
  i,
  val,
  data,
  setData,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setTaskDetails,
}) => {
  const [openOptions, setOpenOptions] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="flex justify-between gap-4 max-w-full items-center text-white bg-purple-800 rounded-2xl px-6 py-5 max-sm:py-4 max-sm:px-4">
      {val.completed && (
        <div className="bg-purple-500 p-4 max-sm:p-2 rounded-xl">
          <FaCheck className="text-4xl" />
        </div>
      )}

      <div className="black w-full">
        <div
          className={`flex justify-between gap-10 items-center ${
            val.desc ? "mb-3 max-sm:mb-1" : "mb-0"
          }`}
        >
          <h2
            className={`${
              val.completed ? "line-through" : ""
            } font-bold text-lg displayInput max-sm:text-sm`}
          >
            {val.title}
          </h2>
          <p
            className={`${
              val.completed ? "line-through" : ""
            } min-w-[110px] max-sm:text-xs font-light text-gray-200`}
          >
            {val.currentTime}
          </p>
        </div>
        <p
          className={`${
            val.completed ? "line-through" : ""
          } text-base max-sm:text-sm ${!val.desc && "hidden"}`}
        >
          {val.desc}
        </p>
      </div>

      <div ref={menuRef} className="relative">
        <SlOptionsVertical
          onClick={() => setOpenOptions(!openOptions)}
          className="text-lg cursor-pointer"
        />

        <div className={`${openOptions ? "animationActive" : "animationUnactive"}`}>
          {openOptions && (
            <TasksOptions
              index={i}
              val={val}
              data={data}
              setData={setData}
              setEdit={setEdit}
              setDeleteNotificationTitle={setDeleteNotificationTitle}
              setDeleteNotification={setDeleteNotification}
              setTaskDetails={setTaskDetails}
              setOpenOptions={setOpenOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
