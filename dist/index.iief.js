var Poll = (function(t) {
  "use strict";
  var o = function() {},
    r = function(t) {
      var e = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;",
        n = new RegExp(e.split("").join("|"), "g");
      return t
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(n, function(t) {
          return "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------".charAt(
            e.indexOf(t)
          );
        })
        .replace(/&/g, "-and-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "");
    };
  function a(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
      n = 2 < arguments.length ? arguments[2] : void 0;
    "function" == typeof t && void 0 === n && ((n = t), (t = void 0));
    var o = {},
      r = t,
      a = [];
    return (
      (o.getState = function() {
        return r;
      }),
      (o.dispatch = function(t) {
        (r = e(r, t)),
          a.forEach(function(t) {
            return t(o);
          });
      }),
      (o.subscribe = function(e) {
        return (
          a.push(e),
          function() {
            var t = a.indexOf(e);
            a.splice(t, 1);
          }
        );
      }),
      o
    );
  }
  var e = [
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
    ].reduce(function(t, e) {
      var r;
      return (
        (t[e] = ((r = e),
        function(e) {
          var n = document.createElement(r),
            o = [
              "click",
              "submit",
              "focus",
              "keydown",
              "keyup",
              "change",
              "keypress"
            ];
          return (
            e &&
              Object.keys(e).forEach(function(t) {
                o.indexOf(t) < 0
                  ? n.setAttribute(t, e[t])
                  : n.addEventListener(t, e[t], !1);
              }),
            function(t) {
              if ((t && t.text && (n.textContent = t.text), t && t.length)) {
                var e = document.createDocumentFragment();
                t.forEach(function(t) {
                  e.appendChild(t);
                }),
                  n.appendChild(e);
              }
              return n;
            }
          );
        })),
        t
      );
    }, {}),
    n = e.h1,
    i = function(t) {
      return n({ class: "c-survey__title" })({ text: t.title });
    },
    c = function(t) {
      var e = JSON.parse(localStorage.getItem("mago-polls")) || [];
      e.push(t.doi), localStorage.setItem("mago-polls", JSON.stringify(e));
    },
    u = function(t, e) {
      window.ga &&
        "function" == typeof window.ga &&
        window.ga("send", "event", {
          eventCategory: t.vote,
          eventAction: t.id,
          eventLabel: t.doi + ":" + t.articleType,
          hitCallback: e
        });
    },
    s = function(t) {
      60 < t.target.value.length &&
        (t.target.value = t.target.value.substr(0, 60));
    },
    l = e.label,
    p = e.input,
    d = e.li,
    f = e.ul,
    m = function(t) {
      t.target
        .closest(".c-survey__options-container")
        .querySelector(".opt-more").checked = !0;
    },
    v = function(t) {
      var e = t.target.closest(".c-survey__options-container");
      t.target.checked && t.target.classList.contains("opt-more")
        ? e.querySelector(".opt-more-text").focus()
        : (e.querySelector(".opt-more-text").value = "");
    },
    g = function(e) {
      var t,
        n = e.options.split(", ").map(function(t) {
          return d({
            class: "c-survey__item c-survey__checkbox"
          })([p({ id: "opt-" + r(t), type: e.multiple ? "checkbox" : "radio", name: "option-".concat(e.id), value: t, change: e.moreOption ? v : o })(), l({ for: "opt-" + r(t) })({ text: t })]);
        });
      return (
        e.moreOption &&
          n.push(
            ((t = e),
            d({ class: "c-survey__item c-survey__checkbox" })([
              p({
                class: "opt-more",
                type: t.multiple ? "checkbox" : "radio",
                name: "option-".concat(t.id),
                value: "opt-more",
                change: v
              })(),
              l()([
                p({
                  class: "opt-more-text",
                  type: "text",
                  name: "opt-more-text-".concat(t.id),
                  keypress: s,
                  focus: m
                })()
              ])
            ]))
          ),
        f({ class: "c-survey__options-container u-clean-list" })(n)
      );
    },
    h = e.div,
    y = e.p,
    b = function(t) {
      var e = t.questions.map(function(t) {
        return h({
          class: "".concat(t.shuffle ? "c-survey--shuffled" : "")
        })([y({ class: "c-survey__question" })({ text: t.text }), g(t)]);
      });
      return h()(e);
    },
    x = e.button,
    k = function() {
      return x({ class: "c-survey__submit", type: "submit" })({
        text: "Confirm"
      });
    },
    _ = e.div,
    w = e.form,
    O = function(e, n) {
      var o,
        t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : [];
      return e.questions && 0 < e.questions.length && "function" == typeof n
        ? _({ class: "c-survey" })([
            w({
              id: "survey-form",
              submit: ((o = n),
              function(t) {
                t.preventDefault();
                var e =
                  t.target && t.target.elements
                    ? Array.prototype.slice.call(t.target.elements)
                    : [];
                e.reduce(function(t, e) {
                  return "INPUT" === e.nodeName &&
                    (e.checked || "text" === e.type) &&
                    e.value
                    ? t.concat(e.value)
                    : t;
                }, []),
                  0 < e.length &&
                    o({ type: "VOTE", payload: { vote: e.join(", ") } });
              })
            })(
              t.map(function(t) {
                return t(e, n);
              })
            )
          ])
        : _({ class: "c-survey" })({ text: "No questions added." });
    },
    C = e.div,
    S = e.a,
    E = e.span,
    q = e.p,
    I = function(o) {
      return function(n) {
        return function(t) {
          console.group(t.type), console.info("previous", o.getState());
          var e = n(t);
          return console.log("next state", o.getState()), console.groupEnd(), e;
        };
      };
    },
    T = function(r) {
      return function(t) {
        if (r) {
          for (var e = t.getState, n = t.dispatch; r.firstChild; )
            r.removeChild(r.firstChild);
          e().vote
            ? r.appendChild(
                ((o = e()),
                C({ class: "c-survey" })([
                  C({ class: "c-survey__feedback" })([
                    i({ title: o.thankYouMessageTitle }),
                    q()([
                      E()({ text: "".concat(o.thankYouMessageText, " ") }),
                      S({
                        href: o.thankYouCtaLink,
                        rel: "noreferrer noopener",
                        target: "_blank"
                      })({ text: o.thankYouCtaText })
                    ])
                  ])
                ]))
              )
            : r.appendChild(O(e(), n, [i, b, k]));
        }
        var o;
      };
    },
    N = function(t) {
      var e = Object.assign({}, { data: {} }, t),
        n = document.getElementById(e.data.id);
      return {
        create: function() {
          var o,
            r,
            t = (function() {
              for (
                var t = arguments.length, o = new Array(t), e = 0;
                e < t;
                e++
              )
                o[e] = arguments[e];
              return function(t) {
                return function() {
                  var e = t.apply(void 0, arguments),
                    n = e.dispatch;
                  return (
                    o.forEach(function(t) {
                      n = t(e)(n);
                    }),
                    (e.dispatch = n),
                    e
                  );
                };
              };
            })(I)(a)(
              ((o = c),
              (r = u),
              function() {
                var t,
                  e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  n = 1 < arguments.length ? arguments[1] : void 0;
                switch (n.type) {
                  case "INIT":
                    return (t = Object.assign({}, e, n.payload));
                  case "VOTE":
                    return (t = Object.assign({}, e, n.payload)), r(t), o(t), t;
                  default:
                    return e;
                }
              })
            );
          t.subscribe(T(n)),
            e.data.shuffle &&
              (e.data.options = e.data.options
                .slice()
                .map(function(t) {
                  return [Math.random(), t];
                })
                .sort(function(t, e) {
                  return t[0] - e[0];
                })
                .map(function(t) {
                  return t[1];
                })),
            t.dispatch({ type: "INIT", payload: e.data });
        }
      };
    };
  return (
    window.pollsList.polls.forEach(function(t) {
      var e;
      (t.data.vote = ((e = t.data.doi),
      -1 < (JSON.parse(localStorage.getItem("mago-polls")) || []).indexOf(e))),
        N(t).create();
    }),
    (t.Polls = N),
    t
  );
})({});
//# sourceMappingURL=index.iief.js.map
