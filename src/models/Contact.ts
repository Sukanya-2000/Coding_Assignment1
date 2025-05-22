import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../databases/index";

interface ContactAttributes {
  id: number;
  phoneNumber?: string | null;
  email?: string | null;
  linkedId?: number | null;
  linkPrecedence: "primary" | "secondary";
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface ContactCreationAttributes extends Optional<ContactAttributes, "id" | "linkedId" | "createdAt" | "updatedAt" | "deletedAt"> {}

export class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
  public id!: number;
  public phoneNumber!: string | null;
  public email!: string | null;
  public linkedId!: number | null;
  public linkPrecedence!: "primary" | "secondary";
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    linkPrecedence: {
      type: DataTypes.ENUM("primary", "secondary"),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "Contacts",
    paranoid: true, // enable soft deletes (deletedAt)
    timestamps: true,
  }
);
