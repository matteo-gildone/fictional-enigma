import React from "react";
import PropTypes from "prop-types";

class InputSwitchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.handleChange(e.target.id, e.target.value);
  }
  render() {
    return (
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id={this.props.id}
          onChange={this.handleChange}
        />
        <label className="custom-control-label" htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </div>
    );
  }
}

InputSwitchComponent.defaultProps = {
  display: "col-md-12 mb-3"
};

InputSwitchComponent.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  display: PropTypes.string,
  helpText: PropTypes.string,
  handleChange: PropTypes.isRequired
};

export { InputSwitchComponent };
