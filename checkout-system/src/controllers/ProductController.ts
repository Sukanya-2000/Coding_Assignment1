// src/controllers/ProductController.ts
import { Request, Response } from 'express';
import { Product } from '../models/Product';

export class ProductController {
  static async getAll(req: Request, res: Response) {
    const products = await Product.findAll();
    res.json(products);
  }
}