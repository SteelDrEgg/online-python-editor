ace.define("ace/theme/custom", ["require", "exports", "module", "ace/lib/dom"], function (e, t, n) {
    t.isDark = !1, t.cssClass = "ace-custom", t.cssText = `
    .ace-custom .ace_gutter {
        background: #ffffff;
        color: #adadad;
        border-right: 1px solid #e6e6e6;
        box-sizing: border-box;
        font-family: "Courier New";
    }
    .ace-custom_dark .ace_gutter .ace_gutter-layer {
        text-align: left;
    }
    .ace-custom .ace_print-margin {
        width: 0px;
        background: #e8e8e8
    }
    .ace-custom {
        background-color: #FFFFFF;
        color: #000000
    }
    .ace-custom .ace_cursor {
        color: #000000
    }
    .ace-custom .ace_marker-layer .ace_selection {
        background: #B5D5FF
    }
    .ace-custom.ace_multiselect .ace_selection.ace_start {
        box-shadow: 0 0 3px 0px #FFFFFF;
    }
    .ace-custom .ace_marker-layer .ace_step {
        background: rgb(198, 219, 174)
    }
    .ace-custom .ace_marker-layer .ace_bracket {
        margin: -1px 0 0 -1px;
        border: 1px solid #BFBFBF
    }
    .ace-custom .ace_marker-layer .ace_active-line {
        background: #fcfaed
    }
    .ace-custom .ace_gutter-active-line {
        background-color: #fcfbef
    }
    .ace-custom .ace_marker-layer .ace_selected-word {
        border: 1px solid #B5D5FF
    }
    .ace-custom .ace_constant.ace_language,.ace-custom .ace_keyword,.ace-custom .ace_meta,.ace-custom .ace_variable.ace_language {
        color: #0232b3
    }
    .ace-custom .ace_invisible {
        color: #BFBFBF
    }
    .ace-custom .ace_constant.ace_character,.ace-custom .ace_constant.ace_other {
        color: #275A5E
    }
    .ace-custom .ace_constant.ace_numeric {
        color: #194feb
    }
    .ace-custom .ace_entity.ace_other.ace_attribute-name,.ace-custom .ace_support.ace_constant {
        color: #450084
    }
    .ace-custom .ace_support.ace_function {
        color: #9e880e;
    }
    .ace-custom .ace_fold {
        background-color: #C800A4;
        border-color: #000000
    }
    .ace-custom .ace_entity.ace_name.ace_tag,.ace-custom .ace_support.ace_class,.ace-custom .ace_support.ace_type {
        color: #790EAD
    }
    .ace-custom .ace_storage {
        color: #C900A4
    }
    .ace-custom .ace_string {
        color: #037916
    }
    .ace-custom .ace_comment {
        color: #8c8c8c
    }
    .ace-custom .ace_indent-guide {
        background: url(data:image/png;
        base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==) right repeat-y
    }
    
`; var r = e("../lib/dom"); r.importCssString(t.cssText, t.cssClass, !1)
}); (function () {
    ace.require(["ace/theme/custom"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
