const cmd = require('node-cmd')
const fs = require('fs');
const path = require('path');

module.exports = function (source) {

    var callback = this.async();

//    console.log(source);
    var entry = this._module.resource;

    var name = path.basename(entry, ".py");
    console.log("entry " + name)

    if (!entry.toLowerCase().endsWith(".py")) {
        console.log("This loader only handles .py files. This could be a problem with your webpack.config.js file. Please add a rule for .py files in your modules entry.");
        callback(null, source);
    }

    cmd.get('transcrypt -b -n ' + entry, function(err, data, stderr) {
        if (!err) {
            js = fs.readFileSync("./__javascript__/" + name + ".js", "utf8")
            callback(null, js);
        }
        else {
            console.log("Some error occurred on Transcrypt compiler execution. Did you have installed Transcrypt? If no, please run `pip install transcrypt`");
            console.log("Error: " + err);
        }

    });
}