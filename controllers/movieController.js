const connection = require('../data/db.js');

function index(_, res) {
    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

function show(req, res) {
    const id = req.params.id;
    console.log(id);
    const sql = 'SELECT * FROM posts WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err)
            return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0)
            return res.status(404).json({ error: 'Movie not found' });
        res.json(results[0]);
    });
}

module.exports = { index, show };
