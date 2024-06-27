import { useEffect, useState } from "react";
import ToDoList from "./component/ToDoList";
import { useAppContext } from "./context/context";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const { tasks, setTasks, totalTime, workingTime } =
    useAppContext();

  const [currentInput, setcurrentInput] = useState("");
  const [showError, setShowError] = useState(false);
  const [showWorkingTotalTime, setShowWorkingTotalTime] =
    useState(false);
  const navigate = useNavigate();
  const addTask = () => {
    if (currentInput) {
      const check = tasks.some(
        (task) => task.task === currentInput
      );

      if (check) {
        setShowError(true);

        return;
      } else {
        const newTasks = [
          ...tasks,
          { task: currentInput, completed: false },
        ];
        setTasks(newTasks);
        setShowError(false);
        const inputElem =
          document.getElementById("taskInput");
        if (inputElem) {
          setcurrentInput("");
        }
      }
    }
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      addTask();
      return;
    }
  };

  const [startResumeButton, setStartResumeButton] =
    useState("");

  useEffect(() => {
    if (totalTime > 0) {
      setShowWorkingTotalTime(true);
    }
  }, []);

  const onStartResumeFinishBtnClicked = () => {
    if (startResumeButton === "Finished") {
      navigate("/finished");
    } else {
      navigate("/working");
    }
  };

  useEffect(() => {
    if (tasks.length > 0) {
      const find = tasks.find((item) => {
        if (item.completed === false) {
          return "Found One";
        }
      });

      if (find) {
        if (showWorkingTotalTime) {
          setStartResumeButton("Resume");
        } else {
          setStartResumeButton("Start Working");
        }
      } else {
        setStartResumeButton("Finished");
      }
    } else {
      setStartResumeButton("Start Working");
    }
  }, [
    tasks.filter((elem) => elem.completed === false).length,
    showWorkingTotalTime,
  ]);

  useEffect(() => {
    const unloadCallback = (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () =>
      window.removeEventListener(
        "beforeunload",
        unloadCallback
      );
  }, []);

  return (
    <section className="flex flex-col h-screen bg-black md:mx-5 lg:mx-10">
      <main className="flex flex-col justify-around flex-1 gap-10">
        {/* Total Tasks */}
        <section className="flex flex-col items-center w-full gap-3">
          <h2>
            {tasks.length > 0
              ? `Tasks Left: ${
                  tasks.filter(
                    (elem) => elem.completed === false
                  ).length
                }`
              : "No Tasks"}
          </h2>
          {showWorkingTotalTime && (
            <>
              <p className="infoText text-accent">{`Working Time - ${new Date(
                workingTime * 1000
              )
                .toISOString()
                .substring(11, 19)}`}</p>
              <p className="infoText text-accent">
                {`Total Time - ${new Date(totalTime * 1000)
                  .toISOString()
                  .substring(11, 19)}`}
              </p>
            </>
          )}
          <button
            className="primaryButton w-fit"
            onClick={() => onStartResumeFinishBtnClicked()}
          >
            {startResumeButton}
          </button>
        </section>
        {/* Add new Task */}
        <section className="flex flex-col items-center w-full">
          <h1>To-Do Manager</h1>
          <div className="flex w-full gap-2">
            <input
              type="text"
              className="flex-1 h-12 text-center text-black border-4 rounded-3xl border-secondary text-r-2xl"
              value={currentInput}
              onKeyUp={(e) => handleKeyUp(e)}
              onChange={(e) =>
                setcurrentInput(e.target.value)
              }
              id="taskInput"
            />
            <button
              className="flex-none px-10 mx-1 primaryButton w-fit"
              onClick={() => addTask()}
            >
              Add
            </button>
          </div>
          {showError && (
            <span className="text-red-500 text-md">
              Task Already Added!!!
            </span>
          )}
        </section>
        {/* To Dos List */}
        <section className="flex flex-col items-center justify-center w-full gap-3 px-2 text-center bg-black">
          <h2 className="mb-4">To Do List</h2>
          {tasks.length <= 0 ? (
            <div>List is empty</div>
          ) : (
            <ToDoList />
          )}
        </section>
      </main>
    </section>
  );
}

export default App;
