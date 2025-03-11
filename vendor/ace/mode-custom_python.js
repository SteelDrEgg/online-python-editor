ace.define("ace/mode/custom_python_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (require, exports, module) {
    "use strict";
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    
    var CustomPythonHighlightRules = function () {

        // Python keywords as defined in the reference document
        var pythonKeywords = (
            "and|as|assert|async|await|break|class|continue|def|del|elif|else|" +
            "except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|" +
            "or|pass|raise|return|try|while|with|yield|True|False|None|match|case"
        );
        
        // Python built-in functions and types combined
        var pythonBuiltinFunctions = (
            "str|int|float|complex|list|tuple|range|dict|set|frozenset|bool|bytes|bytearray|memoryview|type|" +
            "abs|all|any|ascii|bin|bool|bytearray|bytes|callable|chr|classmethod|compile|complex|" +
            "delattr|dict|dir|divmod|enumerate|eval|exec|filter|float|format|frozenset|getattr|" +
            "globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|" +
            "locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|" +
            "repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|" +
            "vars|zip"
        );


        // Python exceptions
        var pythonExceptions = (
            "ArithmeticError|AssertionError|AttributeError|BaseException|" +
            "BlockingIOError|BrokenPipeError|BufferError|BytesWarning|" +
            "ChildProcessError|ConnectionAbortedError|ConnectionError|" +
            "ConnectionRefusedError|ConnectionResetError|DeprecationWarning|" +
            "EOFError|EnvironmentError|Exception|FileExistsError|" +
            "FileNotFoundError|FloatingPointError|FutureWarning|GeneratorExit|" +
            "IOError|ImportError|ImportWarning|IndentationError|IndexError|" +
            "InterruptedError|IsADirectoryError|KeyError|KeyboardInterrupt|" +
            "LookupError|MemoryError|ModuleNotFoundError|NameError|" +
            "NotADirectoryError|NotImplementedError|OSError|OverflowError|" +
            "PendingDeprecationWarning|PermissionError|ProcessLookupError|" +
            "RecursionError|ReferenceError|ResourceWarning|RuntimeError|" +
            "RuntimeWarning|StopAsyncIteration|StopIteration|SyntaxError|" +
            "SyntaxWarning|SystemError|SystemExit|TabError|TimeoutError|" +
            "TypeError|UnboundLocalError|UnicodeDecodeError|UnicodeEncodeError|" +
            "UnicodeError|UnicodeTranslateError|UnicodeWarning|UserWarning|" +
            "ValueError|Warning|ZeroDivisionError|ExceptionGroup"
        );
        
        // Python types are now integrated into pythonBuiltinFunctions
        
        // String prefixes
        var unicodePrefix = "[uU]?";
        var rawPrefix = "[rR]";
        var formatPrefix = "[fF]";
        var rawFormatPrefix = "(?:[rR][fF]|[fF][rR])";
        
        // Number patterns
        var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
        var octalInteger = "(?:0[oO]?[0-7]+)";
        var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
        var binaryInteger = "(?:0[bB][01]+)";
        var integerPattern = "(?:" + decimalInteger + "|" + octalInteger + "|" + hexInteger + "|" + binaryInteger + ")";
        
        var exponentPart = "(?:[eE][+-]?\\d+)";
        var fractionalPart = "(?:\\.\\d+)";
        var integerPart = "(?:\\d+)";
        var floatPattern1 = "(?:(?:" + integerPart + "?" + fractionalPart + ")|(?:" + integerPart + "\\.))";
        var floatPattern2 = "(?:(?:" + floatPattern1 + "|" + integerPart + ")" + exponentPart + ")";
        var floatPattern = "(?:" + floatPattern2 + "|" + floatPattern1 + ")";
        
        // Escape sequences
        var escapeSequence = "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";

        this.$rules = {
            "start": [
                // Docstrings
                {
                    token: "python_docstring",
                    regex: "^\\s*(?:'''|\"\"\")",
                    next: "docstring"
                },
                
                // Comments
                {
                    token: "python_comment",
                    regex: "#.*$"
                },
                
                // Decorators
                {
                    token: "python_decorator",
                    regex: "^\\s*@[a-zA-Z_][a-zA-Z0-9_]*(?:\\.[a-zA-Z_][a-zA-Z0-9_]*)*"
                },
                // Decorator with arguments (capture only the decorator name)
                {
                    token: ["python_decorator", "lparen"],
                    regex: "(^\\s*@[a-zA-Z_][a-zA-Z0-9_]*(?:\\.[a-zA-Z_][a-zA-Z0-9_]*)*)\\s*(\\()",
                    push: "functionCallContext"
                },
                
                // Function definitions (capture the function name)
                {
                    token: ["python_keyword", "text", "python_funcname"],
                    regex: "(def)(\\s+)(?!__[a-zA-Z0-9_]+__)([a-zA-Z_][a-zA-Z0-9_]*)"
                },
                
                // Dunder method definitions
                {
                    token: ["python_keyword", "text", "python_dunder"],
                    regex: "(def)(\\s+)((?:__[a-zA-Z0-9_]+__))"
                },
                
                // Class definitions
                {
                    token: ["python_keyword", "text", "entity"],
                    regex: "(class)(\\s+)([a-zA-Z_][a-zA-Z0-9_]*)"
                },
                
                // Type annotations (now use the built-in function token)
                {
                    token: ["operator", "text", "python_builtinfunc"],
                    regex: "(:)(\\s*)([a-zA-Z_][a-zA-Z0-9_]*)"
                },
                
                // Return type annotations (now use the built-in function token)
                {
                    token: ["operator", "text", "python_builtinfunc"],
                    regex: "(->)(\\s*)([a-zA-Z_][a-zA-Z0-9_]*)"
                },
                
                // Exception handling
                {
                    token: ["python_keyword", "text", "python_exception"],
                    regex: "(except)(\\s+)(" + pythonExceptions + ")"
                },
                
                // Strings
                {
                    token: "python_string",
                    regex: unicodePrefix + '"{3}',
                    next: "trippleQuotedString"
                },
                {
                    token: "python_string",
                    regex: unicodePrefix + '"(?=.)',
                    next: "doubleQuotedString"
                },
                {
                    token: "python_string",
                    regex: unicodePrefix + "'{3}",
                    next: "trippleSingleQuotedString"
                },
                {
                    token: "python_string",
                    regex: unicodePrefix + "'(?=.)",
                    next: "singleQuotedString"
                },
                
                // Raw strings
                {
                    token: "python_string",
                    regex: rawPrefix + '"{3}',
                    next: "rawTrippleQuotedString"
                },
                {
                    token: "python_string",
                    regex: rawPrefix + '"(?=.)',
                    next: "rawDoubleQuotedString"
                },
                {
                    token: "python_string",
                    regex: rawPrefix + "'{3}",
                    next: "rawTrippleSingleQuotedString"
                },
                {
                    token: "python_string",
                    regex: rawPrefix + "'(?=.)",
                    next: "rawSingleQuotedString"
                },
                
                // Format strings
                {
                    token: "python_string",
                    regex: formatPrefix + '"{3}',
                    next: "formatTrippleQuotedString"
                },
                {
                    token: "python_string",
                    regex: formatPrefix + '"(?=.)',
                    next: "formatDoubleQuotedString"
                },
                {
                    token: "python_string",
                    regex: formatPrefix + "'{3}",
                    next: "formatTrippleSingleQuotedString"
                },
                {
                    token: "python_string",
                    regex: formatPrefix + "'(?=.)",
                    next: "formatSingleQuotedString"
                },
                
                // Raw format strings
                {
                    token: "python_string",
                    regex: rawFormatPrefix + '"{3}',
                    next: "rawFormatTrippleQuotedString"
                },
                {
                    token: "python_string",
                    regex: rawFormatPrefix + '"(?=.)',
                    next: "rawFormatDoubleQuotedString"
                },
                {
                    token: "python_string",
                    regex: rawFormatPrefix + "'{3}",
                    next: "rawFormatTrippleSingleQuotedString"
                },
                {
                    token: "python_string",
                    regex: rawFormatPrefix + "'(?=.)",
                    next: "rawFormatSingleQuotedString"
                },
                
                // Built-in functions and types
                {
                    token: "python_builtinfunc",
                    regex: "\\b(" + pythonBuiltinFunctions + ")\\b"
                },
                
                // Numbers
                {
                    token: "python_number",
                    regex: "(?:" + floatPattern + "|\\d+)[jJ]\\b"
                },
                {
                    token: "python_number",
                    regex: floatPattern
                },
                {
                    token: "python_number",
                    regex: integerPattern + "[lL]\\b"
                },
                {
                    token: "python_number",
                    regex: integerPattern + "\\b"
                },
                
                // Comma
                {
                    token: "python_comma",
                    regex: ","
                },
                
                // Dunder method calls
                {
                    token: "python_dunder",
                    regex: "\\b(__[a-zA-Z0-9_]+__)\\b"
                },
                
                // Parenthesis (for determining function call context)
                {
                    token: "lparen",
                    regex: "\\(",
                    push: "functionCallContext"
                },
                
                // Keywords
                {
                    token: "python_keyword",
                    regex: "\\b(" + pythonKeywords + ")\\b"
                },
                
                // Operators and delimiters
                // {
                //     token: "operator",
                //     regex: "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|@|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
                // },
                // {
                //     token: "operator",
                //     regex: ":|;|\\->|\\+=|\\-=|\\*=|\\/=|\\/\\/=|%=|@=|&=|\\|=|^=|>>=|<<=|\\*\\*="
                // },
                {
                    token: "lparen",
                    regex: "[\\[\\{]"
                },
                {
                    token: "rparen",
                    regex: "[\\]\\)\\}]"
                },
                
                // Whitespace and general text
                // {
                //     token: "text",
                //     regex: "\\s+"
                // },
                // {
                //     token: "text",
                //     regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                // }
            ],
            
            "docstring": [
                {
                    token: "python_docstring",
                    regex: "\\s*(?:'''|\"\"\")\\s*$",
                    next: "start"
                },
                {
                    token: "python_docstring",
                    regex: "\\s*(?:'''|\"\"\")",
                    next: "start"
                },
                {
                    defaultToken: "python_docstring"
                }
            ],
            
            "trippleQuotedString": [
                {
                    token: "escape",
                    regex: escapeSequence
                },
                {
                    token: "python_string",
                    regex: '"{3}',
                    next: "start"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "trippleSingleQuotedString": [
                {
                    token: "escape",
                    regex: escapeSequence
                },
                {
                    token: "python_string",
                    regex: "'{3}",
                    next: "start"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "doubleQuotedString": [
                {
                    token: "escape",
                    regex: escapeSequence
                },
                {
                    token: "python_string",
                    regex: "\\\\$",
                    next: "doubleQuotedString"
                },
                {
                    token: "python_string",
                    regex: '"|$',
                    next: "start"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "singleQuotedString": [
                {
                    token: "escape",
                    regex: escapeSequence
                },
                {
                    token: "python_string",
                    regex: "\\\\$",
                    next: "singleQuotedString"
                },
                {
                    token: "python_string",
                    regex: "'|$",
                    next: "start"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "rawTrippleQuotedString": [
                {
                    token: "python_string",
                    regex: '"{3}',
                    next: "start"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "rawTrippleSingleQuotedString": [
                {
                    token: "python_string",
                    regex: "'{3}",
                    next: "start"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "rawDoubleQuotedString": [
                {
                    token: "python_string",
                    regex: "\\\\$",
                    next: "rawDoubleQuotedString"
                },
                {
                    token: "python_string",
                    regex: '"|$',
                    next: "start"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "rawSingleQuotedString": [
                {
                    token: "python_string",
                    regex: "\\\\$",
                    next: "rawSingleQuotedString"
                },
                {
                    token: "python_string",
                    regex: "'|$",
                    next: "start"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "formatTrippleQuotedString": [
                {
                    token: "escape",
                    regex: escapeSequence
                },
                {
                    token: "python_string",
                    regex: '"{3}',
                    next: "start"
                },
                {
                    token: "lparen",
                    regex: "{",
                    push: "formatStringExpressions"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "formatTrippleSingleQuotedString": [
                {
                    token: "escape",
                    regex: escapeSequence
                },
                {
                    token: "python_string",
                    regex: "'{3}",
                    next: "start"
                },
                {
                    token: "lparen",
                    regex: "{",
                    push: "formatStringExpressions"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "formatDoubleQuotedString": [
                {
                    token: "escape",
                    regex: escapeSequence
                },
                {
                    token: "python_string",
                    regex: "\\\\$",
                    next: "formatDoubleQuotedString"
                },
                {
                    token: "python_string",
                    regex: '"|$',
                    next: "start"
                },
                {
                    token: "lparen",
                    regex: "{",
                    push: "formatStringExpressions"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "formatSingleQuotedString": [
                {
                    token: "escape",
                    regex: escapeSequence
                },
                {
                    token: "python_string",
                    regex: "'|$",
                    next: "start"
                },
                {
                    token: "lparen",
                    regex: "{",
                    push: "formatStringExpressions"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "rawFormatTrippleQuotedString": [
                {
                    token: "python_string",
                    regex: '"{3}',
                    next: "start"
                },
                {
                    token: "lparen",
                    regex: "{",
                    push: "formatStringExpressions"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "rawFormatTrippleSingleQuotedString": [
                {
                    token: "python_string",
                    regex: "'{3}",
                    next: "start"
                },
                {
                    token: "lparen",
                    regex: "{",
                    push: "formatStringExpressions"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "rawFormatDoubleQuotedString": [
                {
                    token: "python_string",
                    regex: "\\\\$",
                    next: "rawFormatDoubleQuotedString"
                },
                {
                    token: "python_string",
                    regex: '"|$',
                    next: "start"
                },
                {
                    token: "lparen",
                    regex: "{",
                    push: "formatStringExpressions"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "rawFormatSingleQuotedString": [
                {
                    token: "python_string",
                    regex: "'|$",
                    next: "start"
                },
                {
                    token: "lparen",
                    regex: "{",
                    push: "formatStringExpressions"
                },
                {
                    defaultToken: "python_string"
                }
            ],
            
            "functionCallContext": [
                // Handle keyword arguments within function calls (highest priority)
                {
                    // token: "python_kwargs",
                    // regex: "\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*="
                    token: ["text", "python_kwargs", "operator"],
                    regex: "(^|\\s|\\(|,)([a-zA-Z_][a-zA-Z0-9_]*)\\s*(=)"
                },
                // Handle comma - important for chaining keyword args
                {
                    token: "python_comma",
                    regex: ","
                },
                // Handle closing parenthesis
                {
                    token: "rparen",
                    regex: "\\)",
                    next: "pop"
                },
                // Handle nested function calls
                {
                    token: "lparen",
                    regex: "\\(",
                    push: "functionCallContext"
                },
                // Include built-in functions and types (should be higher priority)
                {
                    token: "python_builtinfunc",
                    regex: "\\b(" + pythonBuiltinFunctions + ")\\b"
                },
                // Keywords that might appear inside function calls
                {
                    token: "python_keyword",
                    regex: "\\b(True|False|None|and|as|assert|async|await|break|class|continue|def|del|elif|else|" +
                           "except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|" +
                           "or|pass|raise|return|try|while|with|yield|match|case)\\b"
                },
                // Numbers
                {
                    token: "python_number",
                    regex: "(?:(?:\\d+\\.\\d*|\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?|\\d+)[jJ]\\b|(?:\\d+\\.\\d*|\\.\\d+|\\d+)(?:[eE][+-]?\\d+)?\\b|0[xX][\\da-fA-F]+\\b|0[oO][0-7]+\\b|0[bB][01]+\\b|\\d+[lL]?\\b"
                },
                // Strings
                {
                    token: "python_string",
                    regex: '"""',
                    next: "trippleQuotedString"
                },
                {
                    token: "python_string",
                    regex: "'''",
                    next: "trippleSingleQuotedString"
                },
                {
                    token: "python_string",
                    regex: '"(?=.)',
                    next: "doubleQuotedString"
                },
                {
                    token: "python_string",
                    regex: "'(?=.)",
                    next: "singleQuotedString"
                },
                // General text and identifiers
                {
                    token: "text",
                    regex: "\\s+"
                },
                {
                    token: "text",
                    // regex: "\\w+"
                    regex: "\\\\w+(?!\\\\s*=)"
                },
                // Operators that might appear in function calls
                {
                    token: "operator",
                    regex: "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
                }
            ],
            
            "formatStringExpressions": [
                {
                    token: "lparen",
                    regex: "[\\[\\(]"
                },
                {
                    token: "rparen",
                    regex: "[\\]\\)]"
                },
                {
                    token: "text",
                    regex: "\\s+"
                },
                {
                    token: "python_string",
                    regex: "'[^']*'"
                },
                {
                    token: "python_string",
                    regex: '"[^"]*"'
                },
                {
                    token: "format_spec",
                    regex: "(!s|!r|!a)"
                },
                {
                    token: "python_builtinfunc",
                    regex: "\\b(" + pythonBuiltinFunctions + ")\\b"
                },
                {
                    token: "lparen",
                    regex: "\\(",
                    push: "functionCallContext"
                },
                {
                    token: "python_keyword",
                    regex: "\\b(" + pythonKeywords + ")\\b"
                },
                {
                    token: "python_dunder",
                    regex: "\\b(__[a-zA-Z0-9_]+__)\\b"
                },
                {
                    token: "python_number",
                    regex: "(?:" + floatPattern + "|\\d+)[jJ]\\b"
                },
                {
                    token: "python_number",
                    regex: floatPattern
                },
                {
                    token: "python_number",
                    regex: integerPattern + "[lL]\\b"
                },
                {
                    token: "python_number",
                    regex: integerPattern + "\\b"
                },
                {
                    token: "rparen",
                    regex: "}",
                    next: "pop"
                },
                {
                    token: "lparen",
                    regex: "{",
                    push: "formatStringExpressions"
                }
            ]
        };
        
        this.normalizeRules();
    };
    
    oop.inherits(CustomPythonHighlightRules, TextHighlightRules);
    exports.CustomPythonHighlightRules = CustomPythonHighlightRules;
});

ace.define("ace/mode/folding/pythonic", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode"], function (require, exports, module) {
    "use strict";
    var oop = require("../../lib/oop");
    var FoldMode = require("./fold_mode").FoldMode;
    
    var PythonicFoldMode = exports.FoldMode = function (foldingStartMarker) {
        this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + foldingStartMarker + ")(?:\\s*)(?:#.*)?$");
    };
    
    oop.inherits(PythonicFoldMode, FoldMode);
    
    (function () {
        this.getFoldWidgetRange = function (session, foldStyle, row) {
            var line = session.getLine(row);
            var match = line.match(this.foldingStartMarker);
            
            if (match) {
                if (match[1]) { // If matched a bracket
                    return this.openingBracketBlock(session, match[1], row, match.index);
                } else if (match[2]) { // If matched the custom marker (usually ':')
                    return this.indentationBlock(session, row, match.index + match[2].length);
                } else {
                    return this.indentationBlock(session, row);
                }
            }
        };
    }).call(PythonicFoldMode.prototype);
});

ace.define("ace/mode/custom_python", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/custom_python_highlight_rules", "ace/mode/folding/pythonic", "ace/range"], function (require, exports, module) {
    "use strict";
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var CustomPythonHighlightRules = require("./custom_python_highlight_rules").CustomPythonHighlightRules;
    var PythonicFoldMode = require("./folding/pythonic").FoldMode;
    var Range = require("../range").Range;
    
    var CustomPythonMode = function () {
        this.HighlightRules = CustomPythonHighlightRules;
        this.foldingRules = new PythonicFoldMode("\\:");
        this.$behaviour = this.$defaultBehaviour;
    };
    
    oop.inherits(CustomPythonMode, TextMode);
    
    (function () {
        this.lineCommentStart = "#";
        
        this.getNextLineIndent = function (state, line, tab) {
            var indent = this.$getIndent(line);
            var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
            var tokens = tokenizedLine.tokens;
            
            if (tokens.length && tokens[tokens.length - 1].type == "python_comment") {
                // If the line ends with a comment, don't change the indentation
                return indent;
            }
            
            if (state == "start") {
                // If the line ends with a colon or opening bracket, add one indentation level
                var match = line.match(/^.*[\{\(\[:]\s*$/);
                if (match) {
                    indent += tab;
                }
            }
            
            return indent;
        };
        
        // Outdent after keywords like 'pass', 'return', 'raise', 'break', 'continue'
        var outdentKeywords = {
            "pass": 1,
            "return": 1,
            "raise": 1,
            "break": 1,
            "continue": 1
        };
        
        this.checkOutdent = function (state, line, input) {
            if (input !== "\r\n" && input !== "\r" && input !== "\n") {
                return false;
            }
            
            var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;
            
            if (!tokens) {
                return false;
            }
            
            // Ignore comments and whitespace
            do {
                var lastToken = tokens.pop();
            } while (lastToken && (lastToken.type == "python_comment" || 
                                 (lastToken.type == "text" && lastToken.value.match(/^\s+$/))));
            
            // Check if the last meaningful token is an outdent keyword
            return lastToken ? (lastToken.type == "python_keyword" && outdentKeywords[lastToken.value]) : false;
        };
        
        this.autoOutdent = function (state, session, row) {
            row += 1; // Get the next line
            var indent = this.$getIndent(session.getLine(row));
            var tabString = session.getTabString();
            
            // If the line has an extra tab, remove it
            if (indent.slice(-tabString.length) == tabString) {
                session.remove(new Range(row, indent.length - tabString.length, row, indent.length));
            }
        };
        
        this.$id = "ace/mode/custom_python";
        this.snippetFileId = "ace/snippets/python";
    }).call(CustomPythonMode.prototype);
    
    exports.Mode = CustomPythonMode;
});

(function () {
    ace.require(["ace/mode/custom_python"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();