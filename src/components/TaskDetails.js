import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import TopNav from "../Utils/TopNav";
import PageNotFound from "./PageNotFound";

const API_BASE_URL = "https://669dc88e9a1bda3680045918.mockapi.io/api/Todo";

const TaskDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        setDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch task details", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id, details]);

  if (loading) return <div>Loading...</div>;
  if (error || !details) return <PageNotFound />;

  return (
    <div className="w-full relative min-h-screen bg-purple-600">
      <div className="max-w-[1300px] px-10 max-md:px-5 m-auto">
        <TopNav title={"Task Details"} />
        <div className="rounded-2xl bg-purple-700 max-w-[600px] m-auto mt-16 py-10 px-8 max-sm:p-5 text-white">
          <h1 className="text-center text-4xl max-sm:text-2xl font-bold">
            Task
          </h1>
          <div className="mt-8">
            <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
              <h2 className="text-left text-lg max-sm:text-sm min-w-28">
                Task Name:
              </h2>
              <p className="text-left text-base max-sm:text-sm font-normal">
                {details.title}
              </p>
            </div>

            <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
              <h2 className="text-left text-lg max-sm:text-sm min-w-28">
                Description:
              </h2>
              <p className="text-left text-base max-sm:text-sm font-normal">
                {details.desc ? details.desc : "-"}
              </p>
            </div>

            <div className="text-xl max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
              <h2 className="text-left text-lg max-sm:text-sm min-w-28">
                Created:
              </h2>
              <p className="text-left text-base max-sm:text-sm font-normal">
                {details.currentTime}
              </p>
            </div>

            <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
              <h2 className="text-left text-lg max-sm:text-sm min-w-28">
                Complete:
              </h2>
              <p className="text-left text-base max-sm:text-sm font-normal">
                {details.completed ? "Completed" : "Not completed"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
