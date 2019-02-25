import React from "react";

class InputTextComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { id, value } = e.target;
    this.props.handleChange(id, value);
  }
  render() {
    return (
      <div className={this.props.display}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          type="text"
          className="form-control"
          id={this.props.id}
          placeholder=""
          value={this.props.value}
          required=""
          onChange={this.handleChange}
        />
        <div className="invalid-feedback">
          Valid {this.props.label} is required.
        </div>
        {this.props.helpText ? (
          <small id="passwordHelpBlock" className="form-text text-muted">
            {this.props.helpText}
          </small>
        ) : (
          ""
        )}
      </div>
    );
  }
}

InputTextComponent.defaultProps = {
  display: "col-md-12 mb-3",
  handleChange: () => {}
};

export { InputTextComponent };
