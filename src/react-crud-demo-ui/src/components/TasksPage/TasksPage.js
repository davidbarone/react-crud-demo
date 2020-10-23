import React, { useState, useEffect } from "react";
import { GetAllTasks, DeleteTask } from "../../utils/ApiFacade";
import TaskList from "./TaskList"
import { Link } from "react-router-dom";

function TasksPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        GetAllTasks().then(t => setTasks(t));
    });

    return (
        <>
            <h2>Tasks</h2>
            <Link to="/Task">
                Add Task
            </Link>
            <TaskList tasks={tasks} deleteTask={DeleteTask} />
        </>
    );
}

export default TasksPage;