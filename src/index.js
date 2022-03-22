'use strict';
var matcher = /[\/\.]/g;

function escaper (m) {
    switch (m) {
        case '~': return '~0';
        case '/': return '~1';
    }
}

function convertPathToPointer (path) {
    var tokens = path.split('.');

    var converted = [];
    for (var i = 0; i < tokens.length; i += 1) {
        if (tokens[i]) {
            converted.push(tokens[i].replace(matcher, escaper))
        }
        else {
            throw new Error(
                'Empty token in path ' +
                '"' + path + '"'
            );
        }
    }

    return '/' + converted.join('/');
}

module.exports = convertPathToPointer;
