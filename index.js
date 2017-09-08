
var cmd = require('node-cmd')
var fs = require('fs');

const path = require('path');

function findEntry(mod) {
    if (mod.reasons.length > 0 && mod.reasons[0].module.resource) {
        return findEntry(mod.reasons[0].module)
    }
    return mod.resource;
}

module.exports = function (source) {

    console.log(source);
//    console.log(this)
    var entry = findEntry(this._module)
    var name = path.basename(entry, ".py");
    console.log("entry " + name)


    var callback = this.async();

    cmd.get(
        'pwd',
        function(err, data, stderr){
            console.log('the current working dir is : ',data)
        }
    );
    fs.writeFile(name + ".py", source, function(err) {
        if (!err) {

            cmd.get('transcrypt -b -n ' + name + '.py', function(err, data, stderr) {
                if (!err) {
                    js = fs.readFileSync("./__javascript__/" + name + ".js", "utf8")
                    callback(null, js);

                }

            });

        }

    });
    console.log(source);
    return "";
}