import React from "react";

class TextAreaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.handleChange(e.target.id, e.target.value);
  }
  render() {
    return (
      <div className={this.props.display}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <textarea
          type="text"
          className="form-control"
          id={this.props.id}
          placeholder=""
          value={this.props.value}
          required=""
          disabled={this.props.disabled}
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

TextAreaComponent.defaultProps = {
  display: "col-md-12 mb-3",
  disabled: false
};

export { TextAreaComponent };
