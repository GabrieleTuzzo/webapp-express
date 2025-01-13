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

        const movie = results[0];
        movie.image = `/movies_cover/${movie.image}`;

        const sql = `SELECT * FROM reviews WHERE movie_id = ?`;
        connection.query(sql, [id], (err, results) => {
            if (err) {
                res.status(500).json({ message: err.message });
            }

            movie.reviews = results;
            res.json(movie);
        });
    });
}

function storeReview(req, res) {
    const id = req.params.id;
    const body = req.body;
    const sql =
        'INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)';
    connection.query(
        sql,
        [id, body.name, body.vote, body.text],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Database query failed' });
            }
            res.status(201).json({
                message: 'Review added successfully',
                id: result.insertId,
            });
        }
    );
}

module.exports = { index, show, storeReview };
