var testCase = require('nodeunit').testCase;
var jsdom = require("jsdom");
var fs = require("fs");
var $ = null;

module.exports = testCase({
    setUp: function(callback) {
        var testObj = this;
        jsdom.env({
            html: fs.readFileSync("test.htm").toString(),
            src: [ fs.readFileSync("js/jquery.min.js").toString() ],
            done: function(errors, window) {
                testObj.window = window;
                $ = window.$;
                callback();
            }
        });
    },

    testH1Value: function(test) {
        var title = $("h1");
        test.equals(title.text(), "Testing");
        test.done();
    },

    tearDown: function(callback) {
        callback();
    }
});
