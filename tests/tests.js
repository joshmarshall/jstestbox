var testCase = require('domtest').domTest;

module.exports = testCase({

    html: "test.htm",
    scripts: ["js/jquery.min.js"],

    testH1Value: function(test) {
        var title = this.$("h1");
        test.equals(title.text(), "Testing");
        test.done();
    },

});
