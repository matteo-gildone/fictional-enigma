(function() {
  "use strict";

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

  var div = tags.div,
    label = tags.label,
    input = tags.input,
    small = tags.small; //type_ t, placeholder p, value v, onInput toMsg

  var viewHelperInput = function viewHelperInput() {
    var id =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var type =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : "text";
    var labelText =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var value =
      arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
    var mutedText =
      arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
    var onChange =
      arguments.length > 5 && arguments[5] !== undefined
        ? arguments[5]
        : function() {};
    return div({
      class: "col-md-12 mb-3"
    })([
      label({
        for: id
      })({
        text: labelText
      }),
      input({
        type: type,
        class: "form-control",
        id: id,
        value: value,
        change: onChange
      })(),
      small({
        class: "form-text text-muted"
      })({
        text: mutedText
      })
    ]);
  };

  var div$1 = tags.div,
    fieldset = tags.fieldset;

  var viewQuestion = function viewQuestion() {
    return fieldset({
      class: "form-group"
    })([
      div$1({
        class: "row"
      })([
        viewHelperInput("question", "text", "Question"),
        viewHelperInput(
          "options",
          "text",
          "Options",
          "",
          "Insert your options comma separated, eg 'News, Research Analysis, Book & Culture'"
        )
      ])
    ]);
  };

  var div$2 = tags.div,
    h4 = tags.h4,
    form = tags.form,
    fieldset$1 = tags.fieldset,
    hr = tags.hr;

  var viewForm = function viewForm() {
    return div$2()([
      h4({
        class: "mb-3"
      })({
        text: "Polls Creation Tool"
      }),
      form({
        class: "needs-validation mb-4",
        novalidate: "novalidate"
      })([
        fieldset$1({
          class: "form-group"
        })([
          div$2({
            class: "row"
          })([viewHelperInput("title", "text", "Title")])
        ]),
        hr()(),
        viewQuestion(),
        hr()(),
        fieldset$1({
          class: "form-group"
        })([
          div$2({
            class: "row"
          })([
            viewHelperInput(
              "doi",
              "text",
              "Thank you message Cta text (Optional)"
            ),
            viewHelperInput(
              "tidtle",
              "text",
              "Thank you message Cta Link (Optional)"
            )
          ])
        ]),
        hr()()
      ])
    ]);
  };

  var div$3 = tags.div,
    h4$1 = tags.h4;

  var viewAdmin = function viewAdmin() {
    return div$3({
      class: "container mt-5"
    })([
      div$3({
        class: "row"
      })([
        div$3({
          class: "col-md-7"
        })([viewForm()]),
        div$3({
          class: "col-md-5"
        })([
          h4$1({
            class: "mb-3"
          })({
            text: "Preview"
          }),
          div$3({
            id: "poll-preview"
          })(),
          div$3({
            id: "poll-preview-voted"
          })()
        ])
      ])
    ]);
  };

  var render = function render(container) {
    return function(store) {
      if (container) {
        container.appendChild(viewAdmin(store));
      }
    };
  };

  render(document.getElementById("admin"))({});
})();
//# sourceMappingURL=admin.iief.js.map
