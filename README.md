🛒 Checkout System - Cart & Promotions API
A modular backend system built with TypeScript, Node.js, Sequelize, and PostgreSQL, implementing a checkout/cart feature with promotional pricing rules.

📦 Features
✅ Product listing API (A, B, C, D)

✅ Cart creation & item addition

✅ Promotional rules:

Buy 3 of A → ₹85

Buy 2 of B → ₹35

Basket total > ₹150 → ₹20 extra discount

✅ Automatic discount calculation

✅ Clean RESTful JSON API

✅ Extensible, modular service-based architecture

🧱 Tech Stack
Node.js with TypeScript

Express.js for API

Sequelize ORM

PostgreSQL database

ts-node-dev for development

MVC Pattern

🚀 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/checkout-system.git
cd checkout-system
2. Install dependencies
bash
Copy
Edit
yarn install
3. Set up .env
Create a .env file in the root:

ini
Copy
Edit
DB_NAME=sp-purhcase
DB_USER=postgres
DB_PASS=yourpassword
DB_HOST=localhost
Replace yourpassword with your actual PostgreSQL password.

4. Start the server
bash
Copy
Edit
yarn dev
Server will run on:

arduino
Copy
Edit
http://localhost:3000
🔢 API Endpoints
All routes are prefixed with /api

🛍 Products
GET /api/products

Returns all available products.

Response:

json
Copy
Edit
[
  { "id": 1, "name": "A", "price": 30 },
  { "id": 2, "name": "B", "price": 20 },
  ...
]
🧺 Cart
POST /api/cart

Creates a new cart.

Response:

json
Copy
Edit
{
  "id": 1,
  "total_price": 0,
  "total_discount": 0
}
POST /api/cart/:cartId/items

Adds item to cart and recalculates totals.

Body:

json
Copy
Edit
{
  "product_id": 1,
  "quantity": 3
}
GET /api/cart/:cartId

Retrieves cart breakdown with item, quantity, price, total, and discounts.

Response:

json
Copy
Edit
{
  "cart_id": 1,
  "total_price": 165,
  "total_discount": 35,
  "items": [
    { "product": "A", "quantity": 3, "price": 30 },
    { "product": "B", "quantity": 2, "price": 20 },
    ...
  ]
}
🎯 Promotions Implemented
Rule	Description
3 of A → ₹85	Instead of ₹90 (₹5×3)
2 of B → ₹35	Instead of ₹40 (₹20×2)
Total > ₹150 → Extra ₹20 discount	After product discounts applied

🧪 Seeding Products (A, B, C, D)
Run this command:

bash
Copy
Edit
yarn seed:products
Seeds these items:

Name	Price
A	₹30
B	₹20
C	₹50
D	₹15

🧪 Sample Test Cases
Basket Items	Final Price	Discounts
A, B, C	₹100	₹0
B, A, B, A, A	₹120	₹20
C, B, A, A, D, A, B	₹165	₹35
C, A, D, A, A	₹150	₹20

🗃 Database Architecture
Table	Fields
products	id, name, price
carts	id, total_price, total_discount
cart_items	id, cart_id, product_id, quantity

CartItem.belongsTo(Product)

Cart.hasMany(CartItem)

📂 Project Structure
bash
Copy
Edit
src/
├── app.ts                # Entry point
├── db/sequelize.ts       # Sequelize config
├── models/               # Sequelize models
├── controllers/          # Express controllers
├── routes/               # API routes
├── services/             # Checkout logic
└── seeds/                # Product seed script
📬 Postman Collection
✅ Download Postman Collection JSON here (replace with actual link or attach in repo)

🧠 Future Improvements
Add user sessions & authentication

Store orders & invoices

Add unit + integration tests

Admin dashboard to configure promotions dynamically

👨‍💻 Author
Sukanya Bhattacharyya
GitHub | LinkedIn








### Output

![image](https://github.com/user-attachments/assets/f512e728-ec4d-4e47-8a37-492855cf5eab)

![image](https://github.com/user-attachments/assets/8f9f53cf-7897-47ab-8243-bc17cb0c9b75)

![image](https://github.com/user-attachments/assets/05d0cb87-ff8e-4f2d-a91b-f3a1bfadf2dd)

![image](https://github.com/user-attachments/assets/d5e26ef2-7313-463b-80d8-20ff7079e626)

