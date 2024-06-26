import { createContext, useContext, useState } from "react";

type ContextType = {
  tasks: { task: string; completed: boolean }[];
  setTasks: React.Dispatch<
    React.SetStateAction<
      {
        task: string;
        completed: boolean;
      }[]
    >
  >;
  currentTask: number;
  setCurrentTask: React.Dispatch<
    React.SetStateAction<number>
  >;
  workingTime: number;
  totalTime: number;
  setWorkingTime: React.Dispatch<
    React.SetStateAction<number>
  >;
  setTotalTime: React.Dispatch<
    React.SetStateAction<number>
  >;
};

const appContext = createContext<ContextType | null>(null);

export const AppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<
    { task: string; completed: boolean }[]
  >([{ task: "Task 1", completed: false }]);
  const [currentTask, setCurrentTask] = useState(0);

  // Timer Counter
  const [workingTime, setWorkingTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  return (
    <appContext.Provider
      value={{
        tasks,
        setTasks,
        currentTask,
        setCurrentTask,
        workingTime,
        totalTime,
        setWorkingTime,
        setTotalTime,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(appContext);
  return context as ContextType;
};
