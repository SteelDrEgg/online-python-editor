ace.define("ace/theme/custom_darcula", ["require", "exports", "module", "ace/lib/dom"], function (e, t, n) {
    t.isDark = !0, t.cssClass = "ace-custom_darcula", t.cssText = `.ace-custom_darcula .ace_gutter {
    background: #2b2b2b;
    color: #606366;
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #373737;
    font-family: "Courier New";
}

.ace-custom_darcula .ace_gutter .ace_gutter-layer {
    text-align: left;
}

.ace-custom_darcula .ace_print-margin {
    width: 0px;
    background: #25282c
}

.ace-custom_darcula {
    background-color: #2b2b2b;
    color: #a9b7c6
}

.ace-custom_darcula .ace_cursor {
    color: #AEAFAD
}

.ace-custom_darcula .ace_marker-layer .ace_selection {
    background: #373B41
}

.ace-custom_darcula.ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 3px 0px #1D1F21;
}

.ace-custom_darcula .ace_marker-layer .ace_step {
    background: rgb(102, 82, 0)
}

.ace-custom_darcula .ace_marker-layer .ace_bracket {
    margin: -1px 0 0 -1px;
    border: 1px solid #4B4E55
}

.ace-custom_darcula .ace_marker-layer .ace_active-line {
    background: #323232
}

.ace-custom_darcula .ace_gutter-active-line {
    background-color: #323232;
    color: #a1a3ab;
}

.ace-custom_darcula .ace_marker-layer .ace_selected-word {
    border: 1px solid #373B41
}

.ace-custom_darcula .ace_fold {
    background-color: #81A2BE;
    border-color: #C5C8C6
}

.ace-custom_darcula .ace_indent-guide {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHB3d/8PAAOIAdULw8qMAAAAAElFTkSuQmCC) right repeat-y
}

.ace-custom_darcula .ace_python_docstring {
    color: #629755;
}

.ace-custom_darcula .ace_python_comment {
    color: #808080;
}

.ace-custom_darcula .ace_python_exception,
.ace-custom_darcula .ace_python_builtinfunc {
    color: #8888c6;
}

.ace-custom_darcula .ace_python_number {
    color: #6897ba;
}

.ace-custom_darcula .ace_python_string {
    color: #6a8759;
}

.ace-custom_darcula .ace_python_comma {
    color: #cc7832;
}

.ace-custom_darcula .ace_python_kwargs {
    color: #aa4926;
}

.ace-custom_darcula .ace_python_funcname {
    color: #ffc66d;
}

.ace-custom_darcula .ace_python_dunder {
    color: #b200b2;
}

.ace-custom_darcula .ace_python_keyword {
    color: #cc7832;
}

.ace-custom_darcula .ace_python_decorator {
    color: #bbb52a;
}

.ace-custom_darcula .ace_escape {
    color: #b46a2c
}
`;
    var r = e("../lib/dom");
    r.importCssString(t.cssText, t.cssClass, !1)
});
(function () {
    ace.require(["ace/theme/tomorrow_night"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
            