const BookModel = require('../Model/bookModel');
const Joi = require('joi');
const mongoIdPattern = /^[0-9a-fA-F]{24}$/;

const BookController = {

    async createBook(req, res, next) {
        // Add Book 
        try {


            const bookSchema = Joi.object({
                title: Joi.string().min(1).required(),
                isbn: Joi.number().min(1).required(),
                price: Joi.number().required(),
                publicationDate: Joi.string().required(),
                author: Joi.required(),
            })

            const { error } = bookSchema.validate(req.body);

            if (error) {
                return next(error);
            }

            const { title, isbn, price, publicationDate, author } = req.body;

            try {
                const isbnAlreadyExist = await BookModel.findOne({ isbn: isbn });

                if (isbnAlreadyExist) {
                    const err = {
                        message: "Isbn number is already exist",
                        status: 400,
                        success: false
                    }
                    return next(err);
                }

            } catch (error) {
                return next(error);
            }

            const book = new BookModel({
                title,
                isbn,
                price,
                publicationDate,
                author
            });
            await book.save();
            res.status(201).json({ success: true, data: book });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async getSingleBookById(req, res, next) {

        const getByIdSchema = Joi.object({
            id: Joi.string().regex(mongoIdPattern).required()
        })
        const { error } = getByIdSchema.validate(req.params);
        if (error) {
            return next(error)
        }

        let book;
        let { id } = req.params;
        try {
            book = await BookModel.findOne({ _id: id });
        } catch (error) {
            return next(error);
        }

        return res.status(200).json({ book: book });
    },

    async getAllBooks(req, res, next) {
        // Get All Books 
        try {
            const Books = await BookModel.find();

            res.status(200).json({ success: true, data: Books });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async updateBook(req, res, next) {
        try {
            const getByIdSchema = Joi.object({
                id: Joi.string().regex(mongoIdPattern).required()
            })
            const { error } = getByIdSchema.validate(req.params);
            if (error) {
                return next(error)
            }

            const bookId = req.params.id;
            const updatedDetails = req.body; // Request body contain updated book details
            const bodyObjKeys = Object.keys(updatedDetails);

            if (bodyObjKeys.length === 0) {
                const err = {
                    message: "entity not found empty body received!",
                    status: 404,
                    success: false
                }
                return next(err);
            }

            let allowedFields = ["title", "isbn", "publicationDate", "author", "price"];
            let errorArr = [];

            const filteredFields = bodyObjKeys
                .filter(field => allowedFields.includes(field))
                .reduce((obj, key) => {
                    obj[key] = req.body[key];
                    return obj;
                }, {});

            const filteredFieldsKeys = Object.keys(filteredFields);
            filteredFieldsKeys.forEach((x) => {

                if (!filteredFields[x] || (filteredFields[x].trim()).length === 0) {
                    errorArr.push(x);
                }

            });

            if (errorArr.length > 0) {
                res.send({ message: 'field are missing', errorArr }).status(404);
                return;
            }


            // find and update the book by its ID
            const updatedBook = await BookModel.findByIdAndUpdate(bookId, updatedDetails, { new: true });

            if (!updatedBook) {
                return res.status(404).json({ success: false, message: 'Book not found' });
            }
            res.status(200).json({ success: true, message: 'Book updated successfully...' });

        } catch (error) {
            res.status(500).json({ success: false, error: error.message });

        }

    },

    async deleteBook(req, res, next) {
        try {

            const getByIdSchema = Joi.object({
                id: Joi.string().regex(mongoIdPattern).required()
            })
            const { error } = getByIdSchema.validate(req.params);
            if (error) {
                return next(error)
            }

            const bookId = req.params.id;

            const deletedBook = await BookModel.findByIdAndDelete(bookId);

            if (!deletedBook) {
                return res.status(404).json({ success: false, message: 'Book not found' });
            }

            res.status(200).json({ success: true, message: 'Book deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
}

module.exports = BookController;