import { NextFunction, Request, Response } from "express";
import {
  CreateBlogEntryBody,
  SearchBlogEntryParams,
  createBlogEntryValidator,
} from "./validators";
import { BaseResponse } from "../common";
import {
  createBlogEntryService,
  getBlogEntryService,
  listBlogEntriesService,
} from "./service";

//controlador para crear una publicación en el blog
export const createBlogEntryController = async (
  req: Request<{}, {}, CreateBlogEntryBody>,
  res: Response<BaseResponse>,
  next: NextFunction
) => {
  try {
    if (!req.authData?.id) throw new Error("No hay token de sesión");

    const body = await createBlogEntryValidator.validate(req.body);
    const createdBlogEntry = await createBlogEntryService(
      req.authData.id,
      body
    );

    return res.status(201).json({
      success: true,
      data: { title: createdBlogEntry.getDataValue("title") },
    });
  } catch (error) {
    req.err = error;
    next();
  }
};

//controlador para traer los detalles de una publicación
export const getBlogEntryController = async (
  req: Request<{ blog_entry_id: string }>,
  res: Response<BaseResponse>,
  next: NextFunction
) => {
  try {
    if (!req.params.blog_entry_id)
      throw new Error("Falta identificador de la publicación");

    const blogEntry = await getBlogEntryService(
      req.params.blog_entry_id,
      req.authData?.id
    );
    return res.json({ success: true, data: blogEntry });
  } catch (error) {
    req.err = error;
    next();
  }
};

//controlador para listar o buscar publicaciones
export const listBlogEntriesController = async (
  req: Request<{}, {}, {}, SearchBlogEntryParams>,
  res: Response<BaseResponse>,
  next: NextFunction
) => {
  try {
    const blogEntries = await listBlogEntriesService(req.query);

    return res.json({ success: true, data: { blogEntries } });
  } catch (error) {
    req.err = error;
    next();
  }
};
