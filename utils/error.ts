import { NextFunction, Request, Response } from "express";
import { response } from "./response";

const error = (err: Error, req: Request, res: Response, next: NextFunction) => {
  response(res, "Middle ware error: " + err.message, 500);
};

export default error;
