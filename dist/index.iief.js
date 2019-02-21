var Poll = (function(exports) {
  "use strict";

  function createStore(reducer) {
    var initialState =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var enhancer = arguments.length > 2 ? arguments[2] : undefined;

    if (typeof initialState === "function" && typeof enhancer === "undefined") {
      enhancer = initialState;
      initialState = undefined;
    }

    var store = {};
    var state = initialState;
    var listeners = [];

    store.getState = function() {
      return state;
    };

    store.dispatch = function(action) {
      state = reducer(state, action);
      listeners.forEach(function(listener) {
        return listener(store);
      });
    };

    store.subscribe = function(listener) {
      listeners.push(listener);
      return function() {
        var index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    };

    return store;
  }

  var applyMiddleware = function() {
    for (
      var _len = arguments.length,
        middlewareFactories = new Array(_len),
        _key = 0;
      _key < _len;
      _key++
    ) {
      middlewareFactories[_key] = arguments[_key];
    }

    return function(createStore) {
      return function() {
        var store = createStore.apply(void 0, arguments);
        var dispatch = store.dispatch;
        middlewareFactories.forEach(function(factory) {
          dispatch = factory(store)(dispatch);
        });
        store.dispatch = dispatch;
        return store;
      };
    };
  };

  var tagsList = [
    "a",
    "abbr",
    "acronym",
    "address",
    "applet",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "basefont",
    "bdi",
    "bdo",
    "bgsound",
    "big",
    "blink",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "center",
    "cite",
    "code",
    "col",
    "colgroup",
    "command",
    "content",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "element",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "font",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "image",
    "img",
    "input",
    "ins",
    "isindex",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "listing",
    "main",
    "map",
    "mark",
    "marquee",
    "math",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "multicol",
    "nav",
    "nextid",
    "nobr",
    "noembed",
    "noframes",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "plaintext",
    "pre",
    "progress",
    "q",
    "rb",
    "rbc",
    "rp",
    "rt",
    "rtc",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "shadow",
    "slot",
    "small",
    "source",
    "spacer",
    "span",
    "strike",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "svg",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "tt",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
    "xmp"
  ];

  var Element = function(tag) {
    return function(attributes) {
      var element = document.createElement(tag);
      var events = [
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
          var fragment = document.createDocumentFragment();
          children.forEach(function(child) {
            fragment.appendChild(child);
          });
          element.appendChild(fragment);
        }

        return element;
      };
    };
  };

  var tags = tagsList.reduce(function(acc, next) {
    acc[next] = Element(next);
    return acc;
  }, {});

  var h1 = tags.h1;

  var viewTitle = function viewTitle(state) {
    return h1({
      class: "c-survey__title"
    })({
      text: state.title
    });
  };

  var submitForm = function submitForm(dispatch) {
    return function(e) {
      e.preventDefault();
      var elements =
        e.target && e.target.elements
          ? Array.prototype.slice.call(e.target.elements)
          : [];
      elements.reduce(function(element, next) {
        return next.nodeName === "INPUT" &&
          (next.checked || next.type === "text") &&
          next.value
          ? element.concat(next.value)
          : element;
      }, []);

      if (elements.length > 0) {
        dispatch({
          type: "VOTE",
          payload: {
            vote: elements.join(", ")
          }
        });
      }
    };
  };
  var registerVote = function registerVote(state) {
    var votes = JSON.parse(localStorage.getItem("mago-polls")) || [];
    votes.push(state.doi);
    localStorage.setItem("mago-polls", JSON.stringify(votes));
  };
  var sendEventToGa = function sendEventToGa(state, cb) {
    if (window.ga && typeof window.ga === "function") {
      window.ga("send", "event", {
        eventCategory: state.vote,
        eventAction: state.id,
        eventLabel: state.doi + ":" + state.articleType,
        hitCallback: cb
      });
    }
  };
  var isPollVoted = function isPollVoted(doi) {
    var votes = JSON.parse(localStorage.getItem("mago-polls")) || [];
    return votes.indexOf(doi) > -1 ? true : false;
  };
  var limitCharacters = function limitCharacters(e) {
    var max_chars = 60;

    if (e.target.value.length > max_chars) {
      e.target.value = e.target.value.substr(0, max_chars);
    }
  };

  var noop = function noop() {};
  var shuffle = function shuffle(arr) {
    var options = arr.slice();
    return options
      .map(function(a) {
        return [Math.random(), a];
      })
      .sort(function(a, b) {
        return a[0] - b[0];
      })
      .map(function(a) {
        return a[1];
      });
  };
  var slugify = function slugify(string) {
    var a = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
    var b = "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
    var p = new RegExp(a.split("").join("|"), "g");
    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with
      .replace(p, function(c) {
        return b.charAt(a.indexOf(c));
      }) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with ‘and’
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple — with single -
      .replace(/^-+/, ""); // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
  };

  var label = tags.label,
    input = tags.input,
    li = tags.li,
    ul = tags.ul;

  var checkClosestRadio = function checkClosestRadio(e) {
    var parent = e.target.closest(".c-survey__options-container");
    parent.querySelector(".opt-more").checked = true;
  };

  var focusClosestInputText = function focusClosestInputText(e) {
    var parent = e.target.closest(".c-survey__options-container");

    if (e.target.checked && e.target.classList.contains("opt-more")) {
      parent.querySelector(".opt-more-text").focus();
    } else {
      parent.querySelector(".opt-more-text").value = "";
    }
  };

  var viewMoreOption = function viewMoreOption(state) {
    return li({
      class: "c-survey__item c-survey__checkbox"
    })([
      input({
        class: "opt-more",
        type: state.multiple ? "checkbox" : "radio",
        name: "option-".concat(state.id),
        value: "opt-more",
        change: focusClosestInputText
      })(),
      label()([
        input({
          class: "opt-more-text",
          type: "text",
          name: "opt-more-text-".concat(state.id),
          keypress: limitCharacters,
          focus: checkClosestRadio
        })()
      ])
    ]);
  };

  var viewOptions = function viewOptions(state) {
    var options = state.shuffle
      ? shuffle(state.options.split(", "))
      : state.options.split(", ");
    var optionList = options.map(function(option) {
      return li({
        class: "c-survey__item c-survey__checkbox"
      })([
        input({
          id: "opt-" + slugify(option),
          type: state.multiple ? "checkbox" : "radio",
          name: "option-".concat(state.id),
          value: option,
          change: state.moreOption ? focusClosestInputText : noop
        })(),
        label({
          for: "opt-" + slugify(option)
        })({
          text: option
        })
      ]);
    });

    if (state.moreOption) {
      optionList.push(viewMoreOption(state));
    }

    return ul({
      class: "c-survey__options-container u-clean-list"
    })(optionList);
  };

  var div = tags.div,
    p = tags.p;

  var viewQuestion = function viewQuestion(state) {
    var questions = state.questions;
    var result = questions.map(function(question) {
      return div({
        class: "".concat(question.shuffle ? "c-survey--shuffled" : "")
      })([
        p({
          class: "c-survey__question"
        })({
          text: question.text
        }),
        viewOptions(question)
      ]);
    });
    return div()(result);
  };

  var button = tags.button;

  var viewSubmitButton = function viewSubmitButton() {
    return button({
      class: "c-survey__submit",
      type: "submit"
    })({
      text: "Confirm"
    });
  };

  var div$1 = tags.div,
    form = tags.form;

  var viewForm = function viewForm(state, dispatch) {
    var children =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (
      state.questions &&
      state.questions.length > 0 &&
      typeof dispatch === "function"
    ) {
      return div$1({
        class: "c-survey"
      })([
        form({
          id: "survey-form",
          submit: submitForm(dispatch)
        })(
          children.map(function(child) {
            return child(state, dispatch);
          })
        )
      ]);
    } else {
      return div$1({
        class: "c-survey"
      })({
        text: "No questions added."
      });
    }
  };

  var div$2 = tags.div,
    a = tags.a,
    span = tags.span,
    p$1 = tags.p;

  var viewFeedback = function viewFeedback(state) {
    return div$2({
      class: "c-survey"
    })([
      div$2({
        class: "c-survey__feedback"
      })([
        viewTitle({
          title: state.thankYouMessageTitle
        }),
        p$1()([
          span()({
            text: "".concat(state.thankYouMessageText, " ")
          }),
          a({
            href: state.thankYouCtaLink,
            rel: "noreferrer noopener",
            target: "_blank"
          })({
            text: state.thankYouCtaText
          })
        ])
      ])
    ]);
  };

  var reducer = function(registerVote, sendEventToGa) {
    return function() {
      var state =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var action = arguments.length > 1 ? arguments[1] : undefined;
      var newState;

      switch (action.type) {
        case "INIT":
          newState = Object.assign({}, state, action.payload);
          return newState;

        case "VOTE":
          newState = Object.assign({}, state, action.payload);
          sendEventToGa(newState);
          registerVote(newState);
          return newState;

        default:
          return state;
      }
    };
  };

  var logger = function logger(store) {
    return function(dispatch) {
      return function(action) {
        console.group(action.type);
        console.info("previous", store.getState());
        var result = dispatch(action);
        console.log("next state", store.getState());
        console.groupEnd();
        return result;
      };
    };
  };

  var render = function render(container) {
    return function(store) {
      if (container) {
        var getState = store.getState,
          dispatch = store.dispatch;

        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        if (!getState().vote) {
          container.appendChild(
            viewForm(getState(), dispatch, [
              viewTitle,
              viewQuestion,
              viewSubmitButton
            ])
          );
        } else {
          container.appendChild(viewFeedback(getState()));
        }
      }
    };
  };

  var Polls = function Polls(options) {
    var defaultSettings = {
      data: {}
    };
    var settings = Object.assign({}, defaultSettings, options);
    var container = document.getElementById(settings.data.id);
    return {
      create: function create() {
        var store = applyMiddleware(logger)(createStore)(
          reducer(registerVote, sendEventToGa)
        );
        store.subscribe(render(container));
        store.dispatch({
          type: "INIT",
          payload: settings.data
        });
      }
    };
  };

  window.pollsList.polls.forEach(function(poll) {
    poll.data.vote = isPollVoted(poll.data.doi);
    Polls(poll).create();
  });

  exports.Polls = Polls;

  return exports;
})({});
//# sourceMappingURL=index.iief.js.map
