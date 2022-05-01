import './App.css';
import { useState } from "react";
import StatusLine from "./components/task-status";
import Pomodoro from "./components/pomodoro"
import { Container, Button, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  function addNewTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        urgency: "",
        status: status,
      },
    ]);
  }

  function addTask(taskToAdd) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });
    let newTaskList = [...filteredTasks, taskToAdd];
    setTasks(newTaskList);
  }

  function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTasks);
  }

  function moveTask(id, newStatus) {
    let task = tasks.filter((task) => {
      return task.id === id;
    })[0];

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    task.status = newStatus;
    let newTaskList = [...filteredTasks, task];
    setTasks(newTaskList);
  }
  
  // function showTimer = () => {
  //   this.setTimer({
  //     showMessage: true
  //   });
  // }

  return (
    <div className="Header">
      <h1>
        Post-It Board
      </h1>
      <div className="App">
        <Row>
          <Button variant="outline-dark" >
            Start Pomodoro Session
          </Button>
          <Pomodoro></Pomodoro>
        </Row>
        
        <Container className="board">
          <Row>
            <Col>
              <StatusLine
                  tasks={tasks}
                  addNewTask={addNewTask}
                  addTask={addTask}
                  deleteTask={deleteTask}
                  moveTask={moveTask}
                  status="Not Started 😩"
                />
            </Col>
            <Col>
              <StatusLine
                  tasks={tasks}
                  addNewTask={addNewTask}
                  addTask={addTask}
                  deleteTask={deleteTask}
                  moveTask={moveTask}
                  status="In Progress 💪"
                />
            </Col>
            <Col>
              <StatusLine
                  tasks={tasks}
                  addNewTask={addNewTask}
                  addTask={addTask}
                  deleteTask={deleteTask}
                  moveTask={moveTask}
                  status="Finished ✔️"
                />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
