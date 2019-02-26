import React from "react";

import { InputTextComponent } from "./InputTextComponent";
import { TextAreaComponent } from "./TextAreaComponent";
import { QuestionComponent } from "./QuestionComponent";
import { ResultComponent } from "./ResultComponent";
import { Polls } from "../poll/index";
import { guidGenerator } from "../utils";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.state = {
      vote: false,
      doi: "",
      articleType: "",
      id: guidGenerator(),
      questions: [
        {
          text: "",
          options: "",
          shuffle: false,
          moreOption: false
        }
      ],
      title: "",
      thankYouMessageTitle: "",
      thankYouMessageText: "",
      thankYouCtaText: "",
      thankYouCtaLink: ""
    };
  }
  renderPolls() {
    const poll = {};
    poll.data = Object.assign({}, this.state);
    poll.data.id = "preview";
    Polls(poll).create();
    const poll2 = {};
    poll2.data = Object.assign({}, this.state);
    poll2.data.id = "preview-voted";
    poll2.data.vote = true;
    Polls(poll2).create();
  }
  handleChange(id, value) {
    this.setState({ [id]: value }, () => {
      this.renderPolls();
    });
  }
  handleQuestionChange(index, id, value) {
    const list = this.state.questions.slice();
    const key = id.split("-")[0];
    if (key === "shuffle" || key === "moreOption" || key === "multiple") {
      list[index][key] = !list[index][key];
    } else {
      list[index][key] = value;
    }
    this.setState({ questions: list }, () => {
      this.renderPolls();
    });
  }
  render() {
    const questions = this.state.questions.map((question, index) => {
      return (
        <QuestionComponent
          key={index}
          index={index}
          question={question}
          handleChange={this.handleQuestionChange}
        />
      );
    });
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-7">
            <h4 className="mb-3">Polls Creation Tool</h4>
            <form className="needs-validation mb-4" noValidate="">
              <fieldset className="form-group">
                <div className="row">
                  <legend className="col-form-label col-sm-12 pt-0">
                    Poll
                  </legend>
                  <InputTextComponent
                    label="Title/Description"
                    id="title"
                    value={this.state.title}
                    handleChange={this.handleChange}
                  />
                  <TextAreaComponent
                    label="Thank you message"
                    id="thankYouMessageText"
                    value={this.state.thankYouMessageText}
                    handleChange={this.handleChange}
                  />
                  <InputTextComponent
                    label="Thank you message Cta text (Optional)"
                    id="thankYouCtaText"
                    value={this.state.thankYouCtaText}
                    handleChange={this.handleChange}
                    display="col-md-6 mb-3"
                  />
                  <InputTextComponent
                    label="Thank you message Cta link (Optional)"
                    id="thankYouCtaLink"
                    value={this.state.thankYouCtaLink}
                    handleChange={this.handleChange}
                    display="col-md-6 mb-3"
                  />
                </div>
              </fieldset>
              <hr className="mb-4" />
              <fieldset className="form-group">
                <div className="row">
                  <legend className="col-form-label col-sm-12 pt-0">
                    Settings
                  </legend>
                  {questions}
                </div>
              </fieldset>
              <hr className="mb-4" />
            </form>
            <ResultComponent poll={this.state} />
          </div>
          <div className="col-md-5">
            <h4 className="mb-3">Preview</h4>
            <div id="preview" />
            <hr className="mb-4" />
            <div id="preview-voted" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
