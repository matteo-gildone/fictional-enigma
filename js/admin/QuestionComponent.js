import React from "react";
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
        <div className="col-md-12 mb-3">
          <InputSwitchComponent
            label="Randomise the order of answers"
            id={`shuffle-${this.props.index}`}
            handleChange={this.handleChange}
          />
          <InputSwitchComponent
            label="Enable open text option"
            id={`moreOption-${this.props.index}`}
            handleChange={this.handleChange}
          />
          <InputSwitchComponent
            label="Allow multiple answers to be selected"
            id={`multiple-${this.props.index}`}
            handleChange={this.handleChange}
          />
        </div>
        <div className="">
          <InputTextComponent
            label="Question"
            id={`text-${this.props.index}`}
            value={this.props.question.text}
            handleChange={this.handleChange}
          />
          <InputTextComponent
            label="Answers"
            id={`options-${this.props.index}`}
            value={this.props.question.options}
            handleChange={this.handleChange}
            helpText="Insert your options comma separated, eg 'News, Research Analysis, Book & Culture'"
          />
        </div>
      </div>
    );
  }
}

export { QuestionComponent };
