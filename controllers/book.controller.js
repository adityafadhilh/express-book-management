const bookServices = require('../services/book.services');

const getBooks = async (req, res) => {
    const result = await bookServices.findAll(req.query);
    return res.json({
        data: result,
        pagination: {
            totalItem: result.length
        }
    });
};

const addBook = async (req, res, next) => {
    try {
        const body = req.body;
        const book = await bookServices.create(body);
        return res.json({
            data: book
        });
    } catch (error) {
       next(error)
    }
};

const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body;
        const book = await bookServices.update(id, body);
        return res.json({
            data: book
        });
    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        await bookServices.deleteById(id);
        return res.json({
            message: "Successfully deleted book"
        });
    } catch (error) {
       next(error)
    }
};

module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook
};