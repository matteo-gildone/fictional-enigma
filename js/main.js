"use strict";
(function() {
  const Element = function(tag) {
    return function(attributes) {
      const element = document.createElement(tag);
      const events = [
        "click",
        "submit",
        "focus",
        "keydown",
        "keyup",
        "change",
        "keypress"
      ];
      if (attributes) {
        Object.keys(attributes).forEach(function(attribute) {
          if (events.indexOf(attribute) < 0) {
            element.setAttribute(attribute, attributes[attribute]);
          } else {
            element.addEventListener(attribute, attributes[attribute], false);
          }
        });
      }
      return function(children) {
        if (children && children.text) {
          element.textContent = children.text;
        }
        if (children && children.length) {
          const fragment = document.createDocumentFragment();
          children.forEach(function(child) {
            fragment.appendChild(child);
          });
          element.appendChild(fragment);
        }
        return element;
      };
    };
  };

  const div = Element("div");
  const h1 = Element("h1");
  const p = Element("p");
  const ul = Element("ul");
  const li = Element("li");
  const input = Element("input");
  const label = Element("label");
  const button = Element("button");
  const form = Element("form");
  const span = Element("span");
  const a = Element("a");

  const registerVote = function(state) {
    const votes = JSON.parse(localStorage.getItem("mago-polls")) || [];
    votes.push(state.survey.doi);
    localStorage.setItem("mago-polls", JSON.stringify(votes));
  };

  const isPollVoted = function(doi) {
    const votes = JSON.parse(localStorage.getItem("mago-polls")) || [];
    return votes.indexOf(doi) > -1 ? true : false;
  };

  const slugify = function(string) {
    const a = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
    const b = "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
    const p = new RegExp(a.split("").join("|"), "g");
    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with ‘and’
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple — with single -
      .replace(/^-+/, ""); // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
  };

  const limitCharacters = function(e) {
    var max_chars = 60;
    if (e.target.value.length > max_chars) {
      e.target.value = e.target.value.substr(0, max_chars);
    }
  };

  const noop = function() {};

  const checkClosestRadio = function(e) {
    const parent = e.target.closest(".c-survey__options-container");
    parent.querySelector("#opt-more").checked = true;
  };

  const focusClosestInputText = function(e) {
    const parent = e.target.closest(".c-survey__options-container");
    if (e.target.checked && e.target.id === "opt-more") {
      parent.querySelector("#opt-more-text").focus();
    } else {
      parent.querySelector("#opt-more-text").value = "";
    }
  };

  const onChange = (objToWatch, onChangeFunction) => {
    const handler = {
      set(target, property, value) {
        Reflect.set(target, property, value);
        onChangeFunction(target);
        return true;
      }
    };
    return new Proxy(objToWatch, handler);
  };

  const shuffle = function(arr) {
    const options = arr.slice();
    return options
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  };

  const Survey = function(options) {
    const defaultSettings = {
      survey: {
        shuffle: false,
        multiple: false,
        moreOption: false
      }
    };
    const settings = Object.assign({}, defaultSettings, options);
    const container =
      typeof settings.container === "string"
        ? document.getElementById(settings.container)
        : settings.container;

    const submitForm = function(e) {
      e.preventDefault();
      const elements = Array.prototype.slice
        .call(e.target.elements)
        .reduce(
          (element, next) =>
            next.nodeName === "INPUT" &&
            (next.checked || next.type === "text") &&
            next.value
              ? element.concat(next.value)
              : element,
          []
        );

      state.survey = Object.assign({}, state.survey, {
        vote: elements.join(", ")
      });

      console.log(
        `gtag("event", ${state.survey.id}, { event_category: ${elements.join(
          ", "
        )}, event_label: ${state.survey.doi}:${state.survey.articleType} })`
      );
      registerVote(state);
      window.gtag("event", "survey-1", {
        event_category: elements.join(", "),
        event_label: `${state.survey.doi}:${state.survey.articleType}`
      });
    };
    const viewTitle = function(state) {
      return h1({ class: "c-survey__title" })({
        text: state.survey.title
      });
    };

    const viewQuestion = function(state) {
      return p({ class: "c-survey__question" })({
        text: state.survey.question
      });
    };

    const viewMoreOption = function(state) {
      return li({ class: "c-survey__item c-survey__checkbox" })([
        input({
          id: "opt-more",
          type: state.survey.multiple ? "checkbox" : "radio",
          name: "option",
          value: "opt-more",
          change: focusClosestInputText
        })(),
        label({ for: "opt-more" })([
          input({
            id: "opt-more-text",
            type: "text",
            name: "option-text",
            keypress: limitCharacters,
            focus: checkClosestRadio
          })()
        ])
      ]);
    };

    const viewOptions = function(state) {
      const optionList = state.survey.options.map(function(option) {
        return li({ class: "c-survey__item c-survey__checkbox" })([
          input({
            id: "opt-" + slugify(option),
            type: state.survey.multiple ? "checkbox" : "radio",
            name: "option",
            value: option,
            change: state.survey.moreOption ? focusClosestInputText : noop
          })(),
          label({ for: "opt-" + slugify(option) })({ text: option })
        ]);
      });
      if (state.survey.moreOption) {
        optionList.push(viewMoreOption(state));
      }
      return ul({ class: "c-survey__options-container u-clean-list" })(
        optionList
      );
    };

    const viewSubmitButton = function() {
      return button({ class: "c-survey__submit", type: "submit" })({
        text: "Confirm"
      });
    };

    const viewSurvey = function(state) {
      return div({ class: "c-survey" })([
        form({ id: "survey-form", submit: submitForm })([
          viewTitle(state),
          viewQuestion(state),
          viewOptions(state),
          viewSubmitButton(state)
        ])
      ]);
    };

    const viewFeedBack = function() {
      return div({ class: "c-survey" })([
        div({ class: "c-survey__feedback" })([
          viewTitle({
            survey: {
              title: "Thanks for your answer, we value your contribution."
            }
          }),
          p()([
            span()({
              text:
                "If you would like to help us continue to improve, we encourage you to "
            }),
            a({
              href:
                "https://sndigital.springernature.com/usertesting/#how-to-participate",
              rel: "noreferrer noopener",
              target: "_blank"
            })({ text: "sign up to our user panel." })
          ])
        ])
      ]);
    };

    const renderSurvey = function(state) {
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        if (!state.survey.vote) {
          container.appendChild(viewSurvey(state));
          state.survey.height = container.offsetHeight + "px";
        } else {
          container.appendChild(viewFeedBack());
        }
      }
    };

    const state = onChange({}, renderSurvey);

    return {
      create: function() {
        if (settings.survey.shuffle) {
          const shuffled = shuffle(settings.survey.options);
          state.survey = Object.assign({}, settings.survey, {
            options: shuffled
          });
        } else {
          state.survey = Object.assign({}, settings.survey);
        }
      }
    };
  };
  if ("Proxy" in window) {
    window.surveyList.forEach(function(survey) {
      survey.survey.vote = isPollVoted(survey.survey.doi)
        ? survey.survey.doi
        : "";
      Survey(survey).create();
    });
  }
})();
