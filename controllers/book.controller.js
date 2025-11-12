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

const addBook = async (req, res) => {
    try {
        const body = req.body;
        const book = await bookServices.create(body);
        return res.json({
            data: book
        });
    } catch (errors) {
        return res.json({
            errors
        });
    }
};

const updateBook = async (req, res) => {
    const { id } = req.params
    const body = req.body;
    const book = await bookServices.update(id, body);
    return res.json({
        data: book
    });
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await bookServices.deleteById(id);
        return res.json({
             message: "Successfully deleted book"
        });
    } catch (errors) {
        return res.json({
           errors
        });
    }
};

module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook
};