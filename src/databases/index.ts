import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
}
