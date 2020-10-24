import React from "react";
import PropTypes from "prop-types";

function SelectInput(props) {
    let wrapperClass = "form-group";
    if (props.error.length > 0) {
        wrapperClass += " has-error";
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={props.id}>{props.label}</label>
            <div className="field">
                <select
                    id={props.id}
                    name={props.name}
                    onChange={props.onChange}
                    value={props.value || ""}
                    className="form-control"
                >

                    {props.values.map((item, index) => (
                        <option key={index} value={item}>{props.labels[index]}</option>
                    ))}

                </select>
            </div>
            {props.error && <div className="alert alert-danger">{props.error}</div>}
        </div>
    );
}

SelectInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    values: PropTypes.array,
    labels: PropTypes.array,
    error: PropTypes.string
};

SelectInput.defaultProps = {
  error: ""
};

export default SelectInput;