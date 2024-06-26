import { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import { Link, useNavigate } from "react-router-dom";

const WorkingPage = () => {
  const {
    tasks,
    currentTask,
    setCurrentTask,
    setWorkingTime,
    setTotalTime,
    workingTime,
  } = useAppContext();

  // Timer
  const [currentTime, setCurrentTime] = useState(0);
  const [continueTotalTimer, setContinueTotalTimer] =
    useState(true);

  const timer = () => {
    setCurrentTime((prev) => prev + 1);
  };

  useEffect(() => {
    if (tasks.length > 0) {
      let counter: number | undefined;
      if (continueTotalTimer) {
        counter = setInterval(() => timer(), 1000);
      }
      return () => {
        clearInterval(counter);
      };
    }
  }, [continueTotalTimer]);

  useEffect(() => {
    if (workingTime > 0) {
      setCurrentTime(workingTime);
    }
    const filter = tasks.filter(
      (item) => item.completed === false
    );
    const index = tasks.indexOf(filter[0]);

    setCurrentTask(index);
  }, []);

  const onNextTaskBtnClicked = () => {
    if (nextTask === "No Task") {
      setContinueTotalTimer(false);
      navigate("/finished");
    } else {
      if (tasks[currentTask]) {
        setCurrentTime(0);
        setTotalTime((prev) => prev + currentTime);
        tasks[currentTask].completed = true;
        const find = tasks.find((item, index) => {
          if (
            item.completed === false &&
            index > currentTask
          ) {
            return tasks[index];
          }
        });
        if (find) {
          setPreviousTask(tasks[currentTask].task);
          const index = tasks.indexOf(find);
          setCurrentTask(index);
        } else {
          console.log("Something went wrong");
        }
      }
    }
  };

  // Pause And Stop Button
  const navigate = useNavigate();

  const onStopBtnClicked = () => {
    setContinueTotalTimer(false);
    setShowStopAlert(true);
  };
  const onPauseBtnClicked = () => {
    setContinueTotalTimer(false);
    setWorkingTime(currentTime);

    setTotalTime(
      (prev) => prev + currentTime - workingTime
    );

    navigate("/");
  };

  // Stop Alert
  const [showStopAlert, setShowStopAlert] = useState(false);
  const onNoBtnClicked = () => {
    setContinueTotalTimer(true);
    setShowStopAlert(false);
  };

  const onYesBtnClicked = () => {
    setContinueTotalTimer(false);
    setShowStopAlert(false);
    navigate("/");
  };

  // Setting tasks
  const [nextTask, setNextTask] = useState("");
  const [previousTask, setPreviousTask] =
    useState("No task");

  useEffect(() => {
    if (tasks[currentTask + 1] !== undefined) {
      const find = tasks.find((item, index) => {
        if (
          item.completed === false &&
          index > currentTask
        ) {
          return tasks[index].task;
        }
      });
      if (find) {
        setNextTask(find.task);
      } else {
        setNextTask("No Task");
      }
    } else {
      setNextTask("No Task");
    }
  }, [currentTask]);

  return (
    <>
      {tasks.length <= 0 ? (
        <div className="flex flex-col items-center justify-center h-screen gap-3 ">
          <span className="text-r-4xl">
            Not Tasks To Work On
          </span>
          <Link to="/" className="primaryButton">
            Add Tasks
          </Link>
        </div>
      ) : (
        <section className="h-screen">
          {/* Tasks */}
          <section className="flex-col gap-3 flexCenter h-1/3">
            <p className="opacity-50 text-r-xl">
              {previousTask}
            </p>
            <p className="text-r-3xl">
              {tasks[currentTask].task}
            </p>
            <p className="opacity-50 text-r-xl">
              {nextTask}
            </p>
          </section>

          {/* Timer */}
          <section className="flex-col gap-3 flexCenter h-1/3">
            <h1>Working</h1>
            <h2>
              {new Date(currentTime * 1000)
                .toISOString()
                .substring(11, 19)}
            </h2>

            <button
              className="primaryButton w-[60%]"
              onClick={() => onNextTaskBtnClicked()}
            >
              {nextTask === "No Task"
                ? "Finish"
                : "Next Task"}
            </button>
          </section>

          {/* Pause and Stop Button */}
          <section className="flex-col gap-6 flexCenter h-1/3">
            <button
              className={`w-[60%] ${
                continueTotalTimer
                  ? "secondaryButton"
                  : "primaryButton"
              }`}
              onClick={() => onPauseBtnClicked()}
              disabled={showStopAlert}
            >
              {continueTotalTimer ? "Pause" : "Resume"}
            </button>
            <button
              className="secondaryButton w-[60%]"
              onClick={() => onStopBtnClicked()}
              disabled={showStopAlert}
            >
              Stop
            </button>
          </section>

          {/* Stop Div */}
          {showStopAlert && (
            <>
              <div className="absolute top-[35%] left-0 flex flex-col w-full gap-3 p-2 text-center bg-slate-700 border-accent border-2 h-1/3">
                <h3 className="py-3 text-r-3xl">
                  Are you sure your want to stop?
                </h3>
                <p>This will reset the working time</p>
                <div className="flex justify-around">
                  <button
                    className="w-20 primaryButton "
                    onClick={() => onYesBtnClicked()}
                  >
                    Yes
                  </button>
                  <button
                    className="w-20 primaryButton"
                    onClick={() => onNoBtnClicked()}
                  >
                    No
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
};
export default WorkingPage;
