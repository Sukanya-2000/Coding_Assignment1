// src/seeds/productSeeder.ts
import { Product } from '../models/Product';
import sequelize from '../db/sequelize';

const seedProducts = async () => {
  try {
    await sequelize.sync(); // Ensure tables are created

    const products = [
      { name: 'A', price: 30 },
      { name: 'B', price: 20 },
      { name: 'C', price: 50 },
      { name: 'D', price: 15 },
    ];

    await Product.bulkCreate(products, { ignoreDuplicates: true });
    console.log('✅ Products seeded successfully');
  } catch (error) {
    console.error('❌ Failed to seed products:', error);
  } finally {
    await sequelize.close();
  }
};

seedProducts();
