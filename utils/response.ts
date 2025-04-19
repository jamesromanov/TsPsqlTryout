import { Response } from "express";

const response = (
  res: Response,
  data: string | object | null,
  sts: number = 200
): void => {
  if (sts > 204 || sts < 200)
    res.status(sts).json({ status: "Failed!", err: data });
  else res.status(sts).json({ status: "Success!", data });
};
export { response };
