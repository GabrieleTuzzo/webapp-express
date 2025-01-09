const express = require('express');
const cors = require('cors');
const app = express();
// Import custom middlewares
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
// Router import
const moviesRouter = require('./routers/movies.js');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/movies', moviesRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(process.env.PORT, function () {
    console.log('Server started on port ' + process.env.PORT);
});
