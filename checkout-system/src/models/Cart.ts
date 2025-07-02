// src/models/Cart.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize';

export class Cart extends Model {
  public id!: number;
  public total_price!: number;
  public total_discount!: number;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    total_discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: false
  }
);
