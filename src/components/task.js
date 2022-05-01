import { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

export default function Task(props) {
  const { addTask, deleteTask, moveTask, task } = props;

  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
  const [formAction, setFormAction] = useState("");

  function setUrgency(event) {
    setUrgencyLevel(event.target.attributes.urgency.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formAction === "delete") {
        deleteTask(task.id);
    } else {
        let newTask = {
            id: task.id,
            title: event.target.elements.title.value,
            description: event.target.elements.description.value,
            urgency: urgencyLevel,
            status: task.status,
          };
          addTask(newTask);
    }
  }

  function moveLeft() {
    let newStatus = "";
    if (task.status === "In Progress 💪") {
      newStatus = "Not Started 😩";
    } else if (task.status === "Finished ✔️") {
      newStatus = "In Progress 💪";
    }
    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  function moveRight() {
    let newStatus = "";
    if (task.status === "Not Started 😩") {
      newStatus = "In Progress 💪";
    } else if (task.status === "In Progress 💪") {
      newStatus = "Finished ✔️";
    }
    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card style={{ width: '17rem' }}>
            <Card.Body>
                <Card.Title>
                    <input
                        type="text"
                        className="title input"
                        name="title"
                        placeholder="Enter Task Name"
                        defaultValue={task.title}
                    />
                </Card.Title>
                <Card.Subtitle>
                    <textarea
                        rows="3"
                        className="description input"
                        name="description"
                        placeholder="Enter Description"
                        defaultValue={task.description}
                    />
                </Card.Subtitle>
                <div className="urgencyLabels">
                    <Container>
                        <Row>
                            <Col>
                                <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
                                    <input
                                    urgency="low"
                                    onChange={setUrgency}
                                    type="radio"
                                    name="urgency"
                                    />
                                    Maybe Later 😀
                                </label>
                            </Col>
                            <Col>
                                <label
                                    className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}>
                                    <input
                                    urgency="medium"
                                    onChange={setUrgency}
                                    type="radio"
                                    name="urgency"
                                    />
                                    Start Soon⏳
                                </label>
                            </Col>
                            <Col>
                                <label
                                    className={`high ${urgencyLevel === "high" ? "selected" : ""}`}>
                                    <input
                                    urgency="high"
                                    onChange={setUrgency}
                                    type="radio"
                                    name="urgency"
                                    />
                                    Highly Urgent ⚠️
                                </label>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <br></br>
                <Container>
                    <Row>
                        <Col>
                            <button onClick={moveLeft}>
                                &#171;
                            </button>
                        </Col>
                        <Col>
                        <button onClick={() => {setFormAction("delete");}}>
                            Delete
                        </button>
                        </Col>

                        <Col>
                            <button onClick={moveRight}>
                                &#187;
                            </button>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
      </form>
    </div>
  );
}