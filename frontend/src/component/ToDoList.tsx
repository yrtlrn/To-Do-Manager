type ToDoListProps = {
  tasks: { task: string; completed: boolean }[];
  setTasks: (
    value: React.SetStateAction<
      {
        task: string;
        completed: boolean;
      }[]
    >
  ) => void;
};

const ToDoList = ({ tasks, setTasks }: ToDoListProps) => {
  const deleteTask = (task: string) => {
    const taskCheck = tasks.find(
      (ele) => ele.task === task
    );
    if (taskCheck) {
      const index = tasks.indexOf(taskCheck);
      let tempTasks = [...tasks];
      tempTasks.splice(index, 1);
      setTasks([...tempTasks]);
    }
  };

  const changeCompleted = (
    e: React.ChangeEvent<HTMLInputElement>,
    task: string
  ) => {
    const taskFind = tasks.find((ele) => ele.task === task);
    if (taskFind) {
      let newTasks = [...tasks];
      newTasks[tasks.indexOf(taskFind)].completed =
        e.target.checked;
      setTasks([...newTasks]);
    }
  };

  return tasks.map((task, index) => {
    return (
      <div
        key={index}
        className="grid w-full grid-cols-4 grid-rows-1 px-8 group"
      >
        <input
          type="checkbox"
          className="w-6 border-b-2 rounded-full border-secondary accent-accent"
          onChange={(e) => changeCompleted(e, task.task)}
        />
        <p className="col-span-2 text-left taskText group-hover:text-center">
          {task.task}
        </p>
        <div className="flex justify-end">
          <span
            className="flex items-center justify-center text-primary material-symbols-outlined text-r-3xl"
            onClick={() => deleteTask(task.task)}
          >
            delete
          </span>
        </div>
      </div>
    );
  });
};
export default ToDoList;
