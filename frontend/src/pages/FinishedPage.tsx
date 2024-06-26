import { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import { Link, Navigate } from "react-router-dom";

const FinishedPage = () => {
  const { tasks, setTasks, setCurrentTask, totalTime, setTotalTime, setWorkingTime } =
    useAppContext();
  const [allTasksCompleted, setAllTasksCompleted] =
    useState(true);

  useEffect(() => {
    const find = tasks.find((item) => {
      item.completed = false;
    });
    if (find) {
      setAllTasksCompleted(false);
    }
  }, []);

  const onStartAgainBtnClicked = () => {
    setTasks([]);
    setCurrentTask(0);
    setWorkingTime(0)
    setTotalTime(0)
  };

  return (
    <>
      {allTasksCompleted ? (
        <section className="flex flex-col items-center justify-around h-screen text-center">
          <section className="flexCenter ">
            <h1>All Tasks Completed</h1>
          </section>

          <section className="flex-col flexCenter ">
            <h2>Total Time</h2>
            <h2>
              {new Date(totalTime * 1000)
                .toISOString()
                .substring(11, 19)}
            </h2>
          </section>

          <section className="flex-col flexCenter ">
            <h2>Total Tasks Completed</h2>
            <h2>{tasks.length}</h2>
          </section>

          <Link
            to="/"
            className="primaryButton w-[60%] "
            onClick={() => onStartAgainBtnClicked()}
          >
            Start Again?
          </Link>
        </section>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};
export default FinishedPage;
