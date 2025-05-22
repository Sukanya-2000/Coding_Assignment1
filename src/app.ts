import express from "express";
import bodyParser from "body-parser";
import contactRoutes from "./routes/contactRoutes";
import { sequelize, testConnection } from "./databases/index";
import { Contact } from "./models/Contact";

const app = express();

app.use(bodyParser.json());

// Routes
app.use("/", contactRoutes);

// Sync DB and start server
(async () => {
  try {
    await testConnection();
    await sequelize.sync({ alter: true }); // Create or update tables
    
    app.listen(3000, () => {
      console.log("Server started on http://localhost:3000");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
