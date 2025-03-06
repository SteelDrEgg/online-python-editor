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

.ace-custom_dark .ace_invisible {
    color: #4B4E55
}

.ace-custom_dark .ace_keyword,
.ace-custom_dark .ace_meta,
.ace-custom_dark .ace_storage,
.ace-custom_dark .ace_storage.ace_type,
.ace-custom_dark .ace_support.ace_type {
    color: #cc7832
}

.ace-custom_dark .ace_constant.ace_character,
.ace-custom_dark .ace_constant.ace_language,
.ace-custom_dark .ace_constant.ace_numeric,
.ace-custom_dark .ace_keyword.ace_other.ace_unit,
.ace-custom_dark .ace_support.ace_constant,
.ace-custom_dark .ace_variable.ace_parameter {
    color: #6897bb
}

.ace-custom_dark .ace_constant.ace_other {
    color: #CED1CF
}

.ace-custom_dark .ace_invalid {
    color: #CED2CF;
    background-color: #DF5F5F
}

.ace-custom_dark .ace_invalid.ace_deprecated {
    color: #CED2CF;
    background-color: #B798BF
}

.ace-custom_dark .ace_fold {
    background-color: #81A2BE;
    border-color: #C5C8C6
}

.ace-custom_dark .ace_entity.ace_name.ace_function,
.ace-custom_dark .ace_variable {
    color: #81A2BE
}

/* variable type notation */
[class="ace_support ace_function"] {
    color: #8888c6 !important;
}
/* class */
[class="ace_variable ace_language"] {
    color: #72737a !important;
}

.ace-custom_dark .ace_support.ace_class,
.ace-custom_dark .ace_support.ace_type {
    color: #F0C674
}

.ace-custom_dark .ace_heading,
.ace-custom_dark .ace_markup.ace_heading,
.ace-custom_dark .ace_string {
    color: #6a8759
}

.ace-custom_dark .ace_entity.ace_name.ace_tag,
.ace-custom_dark .ace_entity.ace_other.ace_attribute-name,
.ace-custom_dark .ace_meta.ace_tag,
.ace-custom_dark .ace_string.ace_regexp,
.ace-custom_dark .ace_variable {
    color: #e8bf6a
}

.ace-custom_dark .ace_comment {
    color: #969896
}

/* default */
.ace-custom_dark .ace_keyword.ace_operator,
.ace-custom_dark .ace_function.ace_support,
.ace-custom_dark .ace_identifier {
    color: #a9b7c6
}

.ace-custom_dark .ace_indent-guide {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHB3d/8PAAOIAdULw8qMAAAAAElFTkSuQmCC) right repeat-y
}`;
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
            