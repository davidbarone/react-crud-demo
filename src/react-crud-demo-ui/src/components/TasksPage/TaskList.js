import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function TaskList(props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>Task ID</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Completed</th>
                </tr>
            </thead>
            <tbody>
                {props.tasks.map(task => {
                    return (
                        <tr key={task.taskId}>
                            <td>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => {
                                        props.deleteTask(task.taskId);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                            {task.taskId}
                            </td>
                            <td>
                                <Link to={"/task/" + task.taskId}>{task.taskDescription}</Link>
                            </td>
                            <td>{task.taskPriority}</td>
                            <td>{task.taskDue}</td>
                            <td>{task.taskComplete}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

TaskList.propTypes = {
    deleteTask: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            taskId: PropTypes.number.isRequired,
            taskDescription: PropTypes.string.isRequired,
            taskPriority: PropTypes.number.isRequired,
            taskDue: PropTypes.string.isRequired,
            taskComplete: PropTypes.bool.isRequired
        })
    ).isRequired
};

export default TaskList;