ace.define("ace/theme/custom_dark", ["require", "exports", "module", "ace/lib/dom"], function (e, t, n) {
    t.isDark = !0, t.cssClass = "ace-custom_dark", t.cssText = `.ace-custom_dark .ace_gutter {
    background: #1e1f22;
    color: #4b5059;
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #313438;
    font-family: "Courier New";
}

.ace-custom_dark .ace_gutter .ace_gutter-layer {
    text-align: left;
}

.ace-custom_dark .ace_print-margin {
    width: 0px;
    background: #25282c
}

.ace-custom_dark {
    background-color: #1D1F21;
    color: #C5C8C6
}

.ace-custom_dark .ace_cursor {
    color: #AEAFAD
}

.ace-custom_dark .ace_marker-layer .ace_selection {
    background: #373B41
}

.ace-custom_dark.ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 3px 0px #1D1F21;
}

.ace-custom_dark .ace_marker-layer .ace_step {
    background: rgb(102, 82, 0)
}

.ace-custom_dark .ace_marker-layer .ace_bracket {
    margin: -1px 0 0 -1px;
    border: 1px solid #4B4E55
}

.ace-custom_dark .ace_marker-layer .ace_active-line {
    background: #26282e
}

.ace-custom_dark .ace_gutter-active-line {
    background-color: #26282e;
    color: #a1a3ab;
}

.ace-custom_dark .ace_marker-layer .ace_selected-word {
    border: 1px solid #373B41
}

.ace-custom_dark .ace_fold {
    background-color: #81A2BE;
    border-color: #C5C8C6
}

.ace-custom_dark .ace_indent-guide {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHB3d/8PAAOIAdULw8qMAAAAAElFTkSuQmCC) right repeat-y
}

.ace-custom_dark .ace_python_docstring {
    color: #5f826b;
}

.ace-custom_dark .ace_python_comment {
    color: #7a7e85;
}

.ace-custom_dark .ace_python_exception,
.ace-custom_dark .ace_python_builtinfunc {
    color: #8888c6;
}

.ace-custom_dark .ace_python_number {
    color: #29acb8;
}

.ace-custom_dark .ace_python_string {
    color: #6aab73;
}

.ace-custom_dark .ace_python_comma {
    color: #bcbec4;
}

.ace-custom_dark .ace_python_kwargs {
    color: #aa4926;
}

.ace-custom_dark .ace_python_funcname {
    color: #56a8f5;
}

.ace-custom_dark .ace_python_dunder {
    color: #b200b2;
}

.ace-custom_dark .ace_python_keyword {
    color: #cf8e6d;
}

.ace-custom_dark .ace_python_decorator {
    color: #b3ae60;
}

.ace-custom_dark .ace_escape {
    color: #cf8e6d
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
            