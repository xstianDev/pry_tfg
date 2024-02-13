import React from "react";
import PropTypes from "prop-types";

const AuthField = (props) => {
    const {className, labelText, type, fn} = props;
    return (
        <div className={`auth-field ${className}`}>
            <label>{labelText}</label>
            <input 
                type={type}
                onChange={e => fn(e.target.value)}
            />
        </div>
    );
};

AuthField.propTypes = {
    className: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    fn: PropTypes.func.isRequired
};

AuthField.defaultProps = {
    className: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    fn: PropTypes.func.isRequired
};

export default AuthField;