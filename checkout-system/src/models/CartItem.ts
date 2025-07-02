// src/models/CartItem.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize';
import { Cart } from './Cart';
import { Product } from './Product';

export class CartItem extends Model {
  public id!: number;
  public cart_id!: number;
  public product_id!: number;
  public quantity!: number;
  public product!: Product;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cart_id: {
      type: DataTypes.INTEGER,
      references: { model: 'carts', key: 'id' }
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: { model: 'products', key: 'id' }
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },
  {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cart_items',
    timestamps: false
  }
);

Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });
