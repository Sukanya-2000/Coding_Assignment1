import { Cart } from '../models/Cart';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';

export class CheckoutService {
  static async calculateCart(cartId: number): Promise<{ total: number; discount: number }> {
    const items = await CartItem.findAll({
      where: { cart_id: cartId },
      include: [Product]
    });

    let total = 0;
    let discount = 0;

    const itemCounts: Record<string, number> = {};

    for (const item of items) {
      const product = item.product;
      const count = item.quantity;
      const price = product?.price || 0;

      itemCounts[product?.name || ''] = (itemCounts[product?.name || ''] || 0) + count;
    }

    for (const name in itemCounts) {
      const qty = itemCounts[name];
      switch (name) {
        case 'A': {
          const setsOf3 = Math.floor(qty / 3);
          const remaining = qty % 3;
          total += setsOf3 * 85 + remaining * 30;
          discount += setsOf3 * (3 * 30 - 85);
          break;
        }
        case 'B': {
          const setsOf2 = Math.floor(qty / 2);
          const remaining = qty % 2;
          total += setsOf2 * 35 + remaining * 20;
          discount += setsOf2 * (2 * 20 - 35);
          break;
        }
        case 'C':
          total += qty * 50;
          break;
        case 'D':
          total += qty * 15;
          break;
        default:
          break;
      }
    }

    if (total > 150) {
      total -= 20;
      discount += 20;
    }

    await Cart.update(
      { total_price: total, total_discount: discount },
      { where: { id: cartId } }
    );

    return { total, discount };
  }
}
