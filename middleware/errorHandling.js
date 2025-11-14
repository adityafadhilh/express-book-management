const errorHandling = (err, req, res, next) => {
    return res.status(err.status || 500).json({
        status: "error",
        message: err.message
    });
};

module.exports = errorHandling;