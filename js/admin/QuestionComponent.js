import React from "react";
import PropTypes from "prop-types";
import { InputTextComponent } from "./InputTextComponent";
import { InputSwitchComponent } from "./InputSwitchComponent";

class QuestionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(id, value) {
    this.props.handleChange(this.props.index, id, value);
  }
  render() {
    return (
      <div>
        <div className="col-sm-12">
          <InputSwitchComponent
            label="Shuffle options"
            id={`shuffle-${this.props.index}`}
            handleChange={this.handleChange}
          />
          <InputSwitchComponent
            label="Enable open text option"
            id={`moreOption-${this.props.index}`}
            handleChange={this.handleChange}
          />
          <InputSwitchComponent
            label="Multiple choice"
            id={`multiple-${this.props.index}`}
            handleChange={this.handleChange}
          />
        </div>
        <InputTextComponent
          label="Question"
          id={`text-${this.props.index}`}
          value={this.props.question.text}
          handleChange={this.handleChange}
        />
        <InputTextComponent
          label="Options"
          id={`options-${this.props.index}`}
          value={this.props.question.options}
          handleChange={this.handleChange}
          helpText="Insert your options comma separated, eg 'News, Research Analysis, Book & Culture'"
        />
      </div>
    );
  }
}

QuestionComponent.defaultProps = {
  display: "col-md-12 mb-3"
};

QuestionComponent.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  display: PropTypes.string,
  helpText: PropTypes.string,
  handleChange: PropTypes.isRequired,
  options: PropTypes.string,
  question: PropTypes.string,
  index: PropTypes.string
};

export { QuestionComponent };
