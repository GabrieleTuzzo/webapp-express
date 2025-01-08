const connection = require('../data/db.js');

function index(_, res) {
    console.log('hello world!');
}

function show(req, res) {
    console.log('hello world!');
}

module.exports = { index, show };
