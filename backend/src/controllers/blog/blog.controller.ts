import { StatusCodes } from "http-status-codes";
import { IBlogService } from "../../services";
import { IFilterOptions } from "../../types";
import { successResponse } from "../../utils";
import { IBlogController } from "./blog.interface";
import { SUCCESS_RESPONSES } from "../../constants";
import { NextFunction, Request, Response } from "express";

export class BlogController implements IBlogController{
    constructor(private _blogService : IBlogService){}

    async getAllBlogs(req: Request, res: Response,next : NextFunction): Promise<void> {
        try {
            const blogs = await this._blogService.getAllBlogs(req.query as IFilterOptions);
            successResponse(res, StatusCodes.OK , SUCCESS_RESPONSES.OK, {blogs});
        } catch (error) {
            next(error);
        }
    }

    async createBlog(req: Request, res: Response,next : NextFunction): Promise<void> {
        try {
            const blog = await this._blogService.createBlog(req.body);
            successResponse(res, StatusCodes.CREATED, SUCCESS_RESPONSES.BLOG_CREATED, {blog});
        } catch (error) {
            next(error);
        }
    }

    async getBlogById(req: Request, res: Response,next : NextFunction): Promise<void> {
        try {
            const blog = await this._blogService.getBlogById(req.params.id);
            successResponse(res, StatusCodes.OK, SUCCESS_RESPONSES.BLOG_FOUND, {blog});
        } catch (error) {
            next(error);
        }
    }

    async updateBlog(req: Request, res: Response,next : NextFunction): Promise<void> {
        try {
            const blog = await this._blogService.updateBlog(req.params.id, req.body);
            successResponse(res, StatusCodes.OK, SUCCESS_RESPONSES.BLOG_UPDATED, {blog});
        } catch (error) {
            next(error);
        }
    }

    async deleteBlog(req: Request, res: Response,next : NextFunction): Promise<void> {
        try {
            const result = await this._blogService.toggleDelete(req.params.id, true);
            successResponse(res, StatusCodes.OK, SUCCESS_RESPONSES.BLOG_DELETED, {result});
        } catch (error) {
            next(error);
        }
    }
    async restoreBlog(req : Request , res : Response,next : NextFunction): Promise<void> {
        try {
            const result = await this._blogService.toggleDelete(req.params.id, false);
            successResponse(res, StatusCodes.OK, SUCCESS_RESPONSES.BLOG_RESTORED, {result});
        } catch (error) {
            next(error);
        }
    }

}