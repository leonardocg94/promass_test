import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "../../common";
import { toggleBlogLikeService } from "./service";

//controlador para manejar los likes de una entrada del blog
export const toggleBlogLikeController = async (
  req: Request<{}, {}, { blog_entry_id: string }>,
  res: Response<BaseResponse>,
  next: NextFunction
) => {
  try {
    if (!req.authData?.id || !req.body.blog_entry_id)
      throw new Error("Faltan identificadores");

    await toggleBlogLikeService(req.authData.id, req.body.blog_entry_id);

    return res.json({ success: true });
  } catch (error) {
    req.err = error;
    next();
  }
};
