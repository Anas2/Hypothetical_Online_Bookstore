const express = require('express');
const route = express.Router();
const BookController = require('../Controller/bookController');

/**
 * @swagger
 * '/api/books':
 *  get:
 *      summery: Get All Books
 *      description: This api is used to get all books data
 *      responses:
 *         200:
 *           description: List of books
 */
route.get('/', BookController.getAllBooks);


/**
 * @swagger
 * /api/books/{id}:
 *  get:
 *      summery: Get a book by ID
 *      description: This api is used to get specific book by id
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *         200:
 *           description: Book details
 */
route.get('/:id', BookController.getSingleBookById);


/**
 * @swagger
 * '/api/books':
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       description: Book details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: number
 *                 unique: true
 *               publicationDate:
 *                 type: string
 *                 format: date
 *               price:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Book created successfully
 */
route.post('/', BookController.createBook)

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update book details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated book details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *                 unique: true
 *               publicationDate:
 *                 type: string
 *                 format: date
 *               price:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Book updated successfully
 */
route.put('/:id', BookController.updateBook)

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Book deleted successfully
 */
route.delete('/:id', BookController.deleteBook)

module.exports = route; 