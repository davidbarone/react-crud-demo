import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import { GetSingleTask, SaveTask } from "../../utils/ApiFacade";

const TaskPage = props => {
  const [errors, setErrors] = useState({});
  const [task, setTask] = useState({
      taskId: null,
      taskDescription: "",
      taskPriority: 3,
      taskDue: new Date(),
      taskComplete: false
  });

  useEffect(() => {
      const id = props.match.params.id; // from the path `/courses/:slug`
      
      if (id) {
        GetSingleTask(id).then(t => setTask(t));
      }
  }, [props.match.params.id]);

  function handleChange({ target }) {
    setTask({
      ...task,
      [target.name]: target.value
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!task.taskDescription) _errors.taskDescription = "Description is required";
    if (!task.taskPriority) _errors.taskPriority = "Priority is required";
    if (!task.taskDue) _errors.taskDue = "Due date is required";

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    SaveTask(task).then(() => {
      props.history.push("/tasks");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <TaskForm
        errors={errors}
        task={task}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default TaskPage;