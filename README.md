Here’s the **complete `README.md` file** in a **GitHub-friendly editor format** — just copy and paste it into your repo's `README.md` file:

````markdown
# 🧩 Bitespeed Identity Reconciliation API

This project is part of the Bitespeed backend assignment. It implements an identity reconciliation system to manage and unify customer contacts based on their phone numbers and email addresses.

---

## 🛠 Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Sequelize
- **Database:** PostgreSQL
- **Architecture:** MVC Pattern
- **Package Manager:** Yarn

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bitespeed_assignment.git
cd bitespeed_assignment
````

### 2. Install Dependencies

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
PORT=3000
```

### 4. Run Migrations (if applicable)

If Sequelize migrations are set up:

```bash
npx sequelize-cli db:migrate
```

### 5. Start the Server

```bash
yarn start
```

---

## 📦 API Endpoint

### `POST /identify`

Identifies and reconciles customer contact information by email and/or phone number.

---

### 📤 Request Body

```json
{
  "email": "john@example.com",
  "phoneNumber": "1234567890"
}
```

---

### 📥 Response Body

```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["john@example.com", "johnny@gmail.com"],
    "phoneNumbers": ["1234567890", "9876543210"],
    "secondaryContactIds": [2, 3]
  }
}
```

---

## 🔁 How It Works

* If **no contact exists** → create a new **primary contact**.
* If **one match exists** → link the new info as a **secondary contact**.
* If **multiple matches exist** → merge under the earliest **primary**, updating all links accordingly.

---

## 📸 Screenshots

*Add screenshots of working API responses from Postman here to demonstrate successful identification and reconciliation.*

---

## 👩‍💻 Author

**Sukanya Bhattacharyya**

---

## 📄 License

This project is for demonstration purposes only as part of a technical assignment.

```

Let me know once you've added the Postman screenshots — I can help you embed those with proper markdown image syntax too.
```
