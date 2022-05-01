import Task from "./task.js"

export default function TaskStatus(props) {
  const { status, tasks, addTask, deleteTask, addNewTask, moveTask} = props;

  let taskList, tasksForStatus;

  function handleAddEmpty() {
    addNewTask(status);
  }

  if (tasks) {
    tasksForStatus = tasks.filter((task) => {
      return task.status === status;
    });
  }

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
        />
      );
    });
  }

  return (
    <div className="TaskStatus">
      <h3>{status}</h3>
      {taskList}
      <br></br>
      <button onClick={handleAddEmpty} className="button addTask">
        Add Post-It
      </button>
    </div>
  );
}