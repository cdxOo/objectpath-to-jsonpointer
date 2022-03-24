'use strict';
var { expect } = require('chai');
var convert = require('../src/');

describe('convertPathToPointer()', () => {
    it('properly converts valid paths', () => {
        var pairs = [
            [ 'foo', '/foo' ],
            [ 'foo.bar', '/foo/bar' ],
            [ 'foo.bar.baz', '/foo/bar/baz' ],
            [ 'foo.0', '/foo/0' ],
            [ 'foo.1.2.bar', '/foo/1/2/bar' ],
            [ '~foo.bar', '/~0foo/bar' ],
            [ 'foo/.bar', '/foo~1/bar' ],
        ];

        for (var it of pairs) {
            expect(convert(it[0])).to.equal(it[1]);
        }
    });

    it('throws on invalid/unconvertible paths', () => {
        var paths = [
            '',
            'foo..bar'
        ];

        for (var it of paths) {
            var error = undefined;
            try {
                convert(it);
            }
            catch (e) {
                error = e;
            }
            expect(error).to.exist;
            expect(error.message).to.equal(`Empty token in path "${it}"`);
        }
    });
})
