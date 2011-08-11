var jsdom = require("jsdom")
var nodeunit = require("nodeunit");
var fs = require("fs");

// stub for default boilerplate methods
var passThrough = function(callback) { callback(); };
// sane defaults (jQuery, underscore)
var defaultGlobals = ["$", "jQuery", "_"];

// the main function used for tests
exports.domTest = function(overrideOptions) {

    var baseTestOptions = {

        // default setUp function, wraps the override setUp function
        setUp: function(callback) {
            var testObj = this;

            // set up default (empty) HTML or override
            var htmlPath = overrideOptions.html;
            var html = "<html><body></body></html>";
            if (htmlPath) {
                html = fs.readFileSync(htmlPath).toString();
            }

            // Automatically retrieve Javascript source files from the
            // HTML page.
            // TODO: Get rid of this hunting garbage, do TheRightThing
            var scriptRe = /(<script\s+.*src=")([^"]+)(")/gmi;
            var scripts = html.match(scriptRe);
            scripts = (scripts) ? scripts : [];

            // a relative or absolute path to the javascript directory
            var scriptPath = overrideOptions.scriptPath;
            scriptPath = (scriptPath) ? scriptPath : "";

            // strip html from script tag paths
            for (var i=0; i<scripts.length; i++) {
                var script = scripts[i];
                script = script.replace(/^<script\s+.*src="/i, "");
                script = script.replace(/"$/i, "");
                scripts[i] = script;
            }

            // include any "manual" script paths
            if (overrideOptions.scripts) {
                scripts = scripts.concat(overrideOptions.scripts);
            }

            // load Javascript as string (there has to be a better way)
            for (i=0; i<scripts.length; i++) {
                script = scriptPath + scripts[i];
                scripts[i] = fs.readFileSync(script).toString();
            }

            // the window "globals" (like $ for jQuery) to make available
            // on the test object
            var exportGlobals = overrideOptions.exportGlobals;
            exportGlobals = (exportGlobals) ? exportGlobals : [];
            // some sane defaults (jQuery, underscore)
            exportGlobals = exportGlobals.concat(defaultGlobals);

            jsdom.env({
                html: html,
                src: scripts,
                done: function(errors, window) {
                    testObj.window = window;
                    // attach window globals to the test object
                    for (var i=0; i<exportGlobals.length; i++) {
                        var exportGlobal = exportGlobals[i];
                        if (window.hasOwnProperty(exportGlobal)) {
                            testObj[exportGlobal] = window[exportGlobal];
                        }
                    }
                    var setUp = overrideOptions.setUp;
                    if (setUp) {
                        setUp(callback);
                    } else {
                        callback();
                    }
                }
            });
        }
    };

    // look for test methods in the options passed in
    for (var obj in overrideOptions) {
        if (!overrideOptions.hasOwnProperty(obj)) {
            // not sure this is as necessary in node?
            continue;
        }
        if (!obj.match(/test/gi)) {
            // does not start with "test"
            continue;
        }
        // attach test methods / attributes to domTest object
        baseTestOptions[obj] = overrideOptions[obj];
    }

    // default teardown
    var tearDown = overrideOptions.tearDown;
    tearDown = (tearDown) ? tearDown : passThrough;

    // return new wrapped test case
    return nodeunit.testCase(baseTestOptions);
};

