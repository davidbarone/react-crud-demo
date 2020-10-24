import React, { useState, useEffect } from "react";
import { GetAllTasks, DeleteTask } from "../../Utils/ApiFacade";
import TaskList from "./TaskList"
import { Link } from "react-router-dom";

function TasksPage(props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        GetAllTasks().then(t => setTasks(t));
    },[]);

    function DeleteAndRefresh(id) {
        DeleteTask(id).then(() => {
            // Refresh current page
            props.history.push("/xxx");
            props.history.goBack();
        });
    }

    return (
        <>
            <h2>Tasks</h2>
            <Link to="/Task">
                Add Task
            </Link>
            <TaskList tasks={tasks} deleteTask={DeleteAndRefresh} />
        </>
    );
}

export default TasksPage;