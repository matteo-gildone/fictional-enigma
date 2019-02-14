!(function() {
  "use strict";
  var e,
    t = [
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
    ].reduce(function(e, t) {
      var n;
      return (
        (e[t] = ((n = t),
        function(t) {
          var a = document.createElement(n),
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
            t &&
              Object.keys(t).forEach(function(e) {
                o.indexOf(e) < 0
                  ? a.setAttribute(e, t[e])
                  : a.addEventListener(e, t[e], !1);
              }),
            function(e) {
              if ((e && e.text && (a.textContent = e.text), e && e.length)) {
                var t = document.createDocumentFragment();
                e.forEach(function(e) {
                  t.appendChild(e);
                }),
                  a.appendChild(t);
              }
              return a;
            }
          );
        })),
        e
      );
    }, {}),
    i = t.div,
    r = t.label,
    l = t.input,
    a = function() {
      var e =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
        t =
          1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : "text",
        a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "",
        o = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "",
        n =
          4 < arguments.length && void 0 !== arguments[4]
            ? arguments[4]
            : function() {};
      return i({ class: "col-md-12 mb-3" })([
        r({ for: e })({ text: a }),
        l({ type: t, class: "form-control", id: e, value: o, change: n })()
      ]);
    },
    o = t.div,
    n = t.h4,
    s = t.form,
    d = t.fieldset,
    c = t.hr,
    m = t.div,
    u = t.h4,
    p = function() {
      return m({ class: "container mt-5" })([
        m({ class: "row" })([
          m({ class: "col-md-7" })([
            o()([
              n({ class: "mb-3" })({ text: "Polls Creation Tool" }),
              s({ class: "needs-validation mb-4", novalidate: "novalidate" })([
                d({ class: "form-group" })([
                  o({ class: "row" })([a("title", "text", "Title")])
                ]),
                c()(),
                d({ class: "form-group" })([
                  o({ class: "row" })([
                    a("doi", "text", "Thank you message Cta text (Optional)"),
                    a("tidtle", "text", "Thank you message Cta Link (Optional)")
                  ])
                ]),
                c()()
              ])
            ])
          ]),
          m({ class: "col-md-5" })([
            u({ class: "mb-3" })({ text: "Preview" }),
            m({ id: "poll-preview" })(),
            m({ id: "poll-preview-voted" })()
          ])
        ])
      ]);
    };
  (e = document.getElementById("admin")) && e.appendChild(p());
})();
//# sourceMappingURL=admin.iief.js.map
