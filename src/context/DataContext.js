import { createContext, useEffect, useState } from "react";
// import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [edit, setEdit] = useState({});
  const [addNotificationTitle, setAddNotificationTitle] = useState("");
  const [editNotificationTitle, setEditNotificationTitle] = useState("");
  const [deleteNotificationTitle, setDeleteNotificationTitle] = useState("");

  const [addNotification, setAddNotification] = useState(false);
  const [editNotification, setEditNotification] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState(false);

  const [data, setData] = useState([]); // Khởi tạo với mảng rỗng

  const [index, setIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://669dc88e9a1bda3680045918.mockapi.io/api/Todo");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const items = await response.json();
        setData(items || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{
      data,
      setData,
      edit,
      setEdit,
      addNotificationTitle,
      editNotificationTitle,
      deleteNotificationTitle,
      setDeleteNotificationTitle,
      addNotification,
      editNotification,
      deleteNotification,
      setDeleteNotification,
      setAddNotificationTitle,
      setAddNotification,
      setEditNotificationTitle,
      setEditNotification,
      index,
      setIndex
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
