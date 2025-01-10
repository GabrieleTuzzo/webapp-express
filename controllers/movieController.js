const connection = require('../data/db.js');

function index(_, res) {
    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database query failed' });
        }

        const updatedResults = results.map((movie) => ({
            ...movie,
            image: `/movies_cover/${movie.image}`,
        }));

        res.json(updatedResults);
    });
}

function show(req, res) {
    const id = req.params.id;
    const sql = 'SELECT * FROM movies WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Movie not found' });
        }
        results[0].image = `/movies_cover/${results[0].image}`;

        res.json(results[0]);
    });
}

module.exports = { index, show };
