import { NextFunction, Response, Request } from "express";
import errorHandler from "../utils/errorHandler";
import pool from "../config/db";
import { response } from "../utils/response";
import Joi from "joi";
import Book from "../types/Book";

const getBooks = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let page: number = Number(req.query.page as string) || 1;
    let limit: number = Number(req.query.limit as string) || 10;
    if (page < 1 || limit < 1)
      return response(res, `${!page ? "Page" : "Limit"} is invalid!`, 400);
    let offset = (page - 1) * limit;
    let allData: number = (await pool.query("SELECT count(*) from books;"))
      .rows[0].count;
    let totalPages: number = Math.ceil(allData / limit);

    let query = "SELECT * from books limit $1 offset $2;";
    let books: Book[] = (await pool.query(query, [limit, offset])).rows;
    response(res, {
      totalPages,
      totalDataCount: allData,
      hasNextPage: page < totalPages,
      data: books,
    });
  }
);
const bookValidator = Joi.object({
  title: Joi.string().min(3).required(),
  author_id: Joi.number().min(1),
  published_year: Joi.string().min(5).required(),
});
const addBooks = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error: bodyErr, value: validatedBody } = bookValidator.validate(
      req.body
    );
    if (bodyErr) return response(res, bodyErr.details[0].message, 409);

    let query: string =
      "insert into books(title, author_id,published_year) values($1, $2, $3) returning *;";
    let book: object = (
      await pool.query(query, [
        validatedBody.title,
        validatedBody.author_id,
        validatedBody.published_year,
      ])
    ).rows;
    response(res, book, 201);
  }
);
const updateValidator = Joi.object({
  title: Joi.string().min(3),
  author_id: Joi.number().min(2),
  published_year: Joi.string().min(4),
});
const idValidator = Joi.number().min(1);
const updateBooksById = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let updateFields: Partial<Book> = {};
    let { error: idErr, value: id } = idValidator.validate(+req.params.id);
    if (idErr) return response(res, idErr.details[0].message, 409);
    const { error: bodyErr, value: body } = updateValidator.validate(req.body);
    if (bodyErr) return response(res, bodyErr.details[0].message, 409);
    let { title, published_year, author_id } = body;
    if (title) updateFields["title"] = title as string;
    if (author_id) updateFields["author_id"] = author_id as number;
    if (published_year)
      updateFields["published_year"] = published_year as string;
    let bookExist = (
      await pool.query("SELECT * from books where id = $1", [id])
    ).rows;
    if (!bookExist[0]) return response(res, "No books found!", 404);
    let setFields = Object.keys(updateFields).map(
      (field, idx) => `${field} = $${idx + 1}`
    );
    let values: Array<string | number> = Object.values(updateFields).map(
      (val) => val
    );
    values.push(id);
    if (setFields.length === 0 || values.length === 0)
      return response(res, "No data to update!", 400);
    let query = `update books set ${setFields.join(", ")} where id = $${
      setFields.length + 1
    } returning *`;
    let book: Book = (await pool.query(query, values)).rows[0];
    response(res, book);
  }
);
const deleteById = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let { error: idErr, value: id } = idValidator.validate(+req.params.id);
    if (idErr) return response(res, idErr.details[0].message, 409);
    let checkBook: Book | undefined = (
      await pool.query("SELECT * from books where id = $1", [id])
    ).rows[0];
    if (!checkBook) return response(res, "Book not found!", 404);

    await pool.query("delete from books where id = $1 returning *", [id]);

    response(res, null, 204);
  }
);
export { getBooks, addBooks, updateBooksById, deleteById };
