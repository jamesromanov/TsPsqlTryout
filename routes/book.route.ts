import express from "express";
import {
  addBooks,
  deleteById,
  getBooks,
  updateBooksById,
} from "../controllers/books.controller";

const bookRouter = express.Router();

/**
 * @swagger
 * /api/books:
 *  get:
 *    summary: Returns books
 *    tags: [Books]
 *    description: This returns books by pagination
 *    parameters:
 *      - in: query
 *        name: page
 *      - in: query
 *        name: limit
 *    responses:
 *         200:
 *          description: Returns books by limit
 *         500:
 *          description: Server error!
 *
 *
 *
 */
bookRouter.route("/books").get(getBooks);
/**
 * @swagger
 * /api/books:
 *   post:
 *    summary: Adds a book
 *    tags: [Books]
 *    description: This adds a books
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Books'
 *    responses:
 *       201:
 *        description: Book added!
 *       500:
 *        description: Server error!
 */
bookRouter.route("/books").post(addBooks);
/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *    summary: Updates a book by id!
 *    tags: [Books]
 *    description: This updates the book by their id!
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Books'
 *    parameters:
 *      - in: path
 *        name: id
 *    responses:
 *         200:
 *          description: Successfully updated!
 *         404:
 *          description: Book not found!
 *         400:
 *          description: Invalid data entered!
 *         500:
 *          description: Internal server error!
 */
bookRouter.route("/books/:id").put(updateBooksById);
/**
 * @swagger
 * /api/books/{id}:
 *  delete:
 *   summary: Deletes a books by id!
 *   tags: [Books]
 *   description: Deletes a books by their id!
 *   parameters:
 *     - in: path
 *       name: id
 *   responses:
 *        204:
 *         description: Successfully deleted!
 *        404:
 *         description: Book not found at this provided id!
 *        500:
 *         description: Internal server error
 *        409:
 *         description: Invalid id!
 */
bookRouter.route("/books/:id").delete(deleteById);

export default bookRouter;
