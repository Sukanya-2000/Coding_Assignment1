// src/controllers/CartController.ts
import { Request, Response } from 'express';
import { Cart } from '../models/Cart';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';
import { CheckoutService } from '../services/CheckoutServices';


export class CartController {
  static async createCart(req: Request, res: Response) {
    const cart = await Cart.create();
    res.json(cart);
  }

  static async addItem(req: Request, res: Response) {
    const { cartId } = req.params;
    const { product_id, quantity } = req.body;
    const item = await CartItem.create({ cart_id: Number(cartId), product_id, quantity });
    await CheckoutService.calculateCart(Number(cartId));
    res.json(item);
  }

  static async getCart(req: Request, res: Response) {
    const { cartId } = req.params;
    const items = await CartItem.findAll({
      where: { cart_id: cartId },
      include: [Product]
    });
    const cart = await Cart.findByPk(cartId);
    res.json({
      cart_id: cart?.id,
      total_price: cart?.total_price,
      total_discount: cart?.total_discount,
      items: items.map(i => ({
        product: i.product?.name,
        quantity: i.quantity,
        price: i.product?.price
      }))
    });
  }
}
