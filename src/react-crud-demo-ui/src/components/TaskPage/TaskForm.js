import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../Utils/TextInput";
import SelectInput from "../../Utils/SelectInput";

function TaskForm(props) {
    return (
      <form onSubmit={props.onSubmit}>
        <TextInput
          id="taskDescription"
          label="Task Description"
          onChange={props.onChange}
          name="taskDescription"
          value={props.task.taskDescription}
          error={props.errors.taskDescription}
        />

        <SelectInput
          id="taskPriority"
          label="Task Priority"
          onChange={props.onChange}
          name="taskPriority"
          values={[1, 2, 3]}
          labels={["High", "Medium", "Low"]}
          value={props.task.taskPriority}
          error={props.errors.taskPriority}
        />
        
        <TextInput
          id="taskDue"
          label="Due Date"
          name="taskDue"
          onChange={props.onChange}
          value={props.task.taskDue}
          error={props.errors.taskDue}
        />
  
        <input type="submit" value="Save" className="btn btn-primary" />
      </form>
    );
  }
  
TaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default TaskForm;