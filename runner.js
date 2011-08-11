var nodeunit = require("nodeunit");
var reporter = nodeunit.reporters.default;
var fs = require("fs");
var path = require("path");

var testRe = /^test.*\.js$/i

// recursively check files / directories for test files
var checkFile = function(checkPath) {
    var paths = [];
    var stat = fs.statSync(checkPath);
    if (stat.isDirectory()) {
        var subPaths = fs.readdirSync(checkPath);
        for (var p=0; p<subPaths.length; p++) {
            var subPath = subPaths[p];
            paths = paths.concat(checkFile(path.join(checkPath, subPath)));
        }
    } else if (path.basename(checkPath).match(testRe)) {
        paths.push(checkPath);
    }
    return paths;
}


var argPaths = [];
var args = process.argv;

if (args.length < 3) {
    // default test lookup directory is cwd
    args.push("./");
}

// parse arguments for paths
for (var i=2; i<args.length; i++) {
    var argPath = args[i];
    argPaths = argPaths.concat(checkFile(argPath));
}

// run tests on "discovered" test files
reporter.run(argPaths);
