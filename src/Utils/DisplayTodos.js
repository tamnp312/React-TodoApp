import React, { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Sortable from "sortablejs";
import Todo from "./Todo";

const DisplayTodos = ({
  data,
  setData,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setTaskDetails,
}) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState("all"); 
  const listRef = useRef(null);

  const completedTaskPercentage = () => {
    const completed = data.filter((val) => val.completed);

    if (data.length > 0) {
      const completePercentage = (completed.length / data.length) * 100;
      return completePercentage.toFixed();
    }
    return 0;
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (data && data.length) {
      let filterResults = data.filter(
        (val) =>
          (val.title && val.title.toLowerCase().includes(search.toLowerCase())) ||
          (val.desc && val.desc.toLowerCase().includes(search.toLowerCase()))
      );

      if (filter === "completed") {
        filterResults = filterResults.filter(val => val.completed);
      } else if (filter === "incomplete") {
        filterResults = filterResults.filter(val => !val.completed);
      }

      setSearchResults(filterResults);
    } else {
      setSearchResults([]);
    }
  }, [data, search, filter]);

  const handleTasksStatus = () => {
    const parsePercentage = parseFloat(completedTaskPercentage());

    if (parsePercentage === 0) {
      return "No tasks completed";
    } else if (parsePercentage === 100) {
      return "All tasks completed";
    } else if (parsePercentage >= 50) {
      return "More than half tasks completed";
    } else {
      return "Less than half tasks completed";
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const sortable = new Sortable(listRef.current, {
        animation: 150,
        onEnd: (event) => {
          const newOrder = [...searchResults];
          const [movedItem] = newOrder.splice(event.oldIndex, 1);
          newOrder.splice(event.newIndex, 0, movedItem);
          
          // Update the original data with the new order
          const updatedData = newOrder.map(item => 
            data.find(originalItem => originalItem.id === item.id) || item
          );

          setData(updatedData);
        },
      });

      return () => sortable.destroy();
    }
  }, [searchResults, data, setData]);

  return (
    <>
      {data && data.length ? (
        <div>
          <div className="max-md:container border text-white max-w-[700px] mt-10 max-sm:mt-2 m-auto rounded-3xl bg-gradient-to-r from-purple-500 to-purple-700 p-10 max-sm:p-5">
            <h1 className="text-2xl max-sm:text-base font-medium">Progress summary</h1>
            <h3 className="max-sm:text-xs">
              {`${data.length} ${data.length > 1 ? "Tasks" : "Task"}`}
            </h3>

            <div className="flex flex-col w-[60%] max-sm:w-[100%] mt-7 max-sm:mt-5">
              <div className="flex justify-between items-center">
                <p className="max-sm:text-xs">
                  Progress
                  <span
                    className={`text-sm max-sm:text-xs font-semibold ${
                      handleTasksStatus() === "No tasks completed" ? "text-red-700" :
                      handleTasksStatus() === "Less than half tasks completed" ? "text-red-700" :
                      "text-green-500"
                    }`}
                  >
                    {` (${handleTasksStatus()})`}
                  </span>
                </p>
                <p className="text-sm">{completedTaskPercentage()}%</p>
              </div>

              <div className="bg-purple-800 w-full h-2 mt-2 rounded-3xl">
                <div
                  className="h-full rounded-3xl transition-all bg-purple-100"
                  style={{ width: `${completedTaskPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="max-md:container max-w-[700px] m-auto mt-7 max-sm:mt-5 mb-7 max-sm:mb-5 relative flex items-center">
            <div className="w-full">
              <input
                type="text"
                placeholder="Search for task..."
                value={search}
                onChange={handleSearch}
                className="w-full h-12 max-sm:h-10 rounded-xl pl-11 placeholder:text-sm outline-none"
              />
              <IoMdSearch className="absolute top-[50%] left-3 -translate-y-[50%] text-purple-600 text-2xl max-sm:text-xl" />
            </div>
            <div className="mt-5 mb-5 ">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="ml-2 bg-white text-black rounded-xl p-2 h-12 max-sm:h-10 text-center"
                
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
          </div>

          <div className="max-md:container max-w-[700px] m-auto flex flex-col gap-4 max-sm:gap-3 pb-5" ref={listRef}>
            {searchResults.map((val, index) => (
              <Todo
                key={val.id}
                i={index}
                val={val}
                data={data}
                setData={setData}
                setEdit={setEdit}
                setDeleteNotificationTitle={setDeleteNotificationTitle}
                setDeleteNotification={setDeleteNotification}
                setTaskDetails={setTaskDetails}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="w-full text-center text-2xl max-md:text-2xl max-sm:text-xl text-white font-bold absolute bottom-[50%] left-[50%] -translate-x-[50%]">
          You don't have any tasks
        </h1>
      )}
    </>
  );
};

export default DisplayTodos;


