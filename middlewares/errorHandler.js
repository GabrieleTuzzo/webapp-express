function errorHandler(err, _, res, _) {
    res.status(500).json({
        error: err.message,
    });
}

module.exports = errorHandler;
