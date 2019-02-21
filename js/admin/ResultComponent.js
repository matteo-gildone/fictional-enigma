import React from "react";
import PropTypes from "prop-types";

import { TextAreaComponent } from "./TextAreaComponent";

class ResultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.generateCode = this.generateCode.bind(this);
  }
  generateCode() {
    return `<div id="${this.props.poll.id}"></div>
    <script>
      if (typeof window.pollsList !== "function") {
        window.pollsList = function(poll) {
          pollsList.polls.push(poll);
        };
        pollsList.polls = [];
        pollsList.l = +new Date();
      }
      pollsList({
        data:
            ${JSON.stringify(this.props.poll, null, 8)}
      });
    </script>
    <script type="module" src="./dist/index.iief.js" async defer></script>`;
  }
  render() {
    return (
      <div className="row">
        <TextAreaComponent
          label="Code"
          id="code"
          value={this.generateCode()}
          disabled="true"
        />
      </div>
    );
  }
}

ResultComponent.defaultProps = {
  display: "col-md-12 mb-3"
};

ResultComponent.propTypes = {
  display: PropTypes.string.isRequired,
  poll: PropTypes.isRequired
};

export { ResultComponent };
