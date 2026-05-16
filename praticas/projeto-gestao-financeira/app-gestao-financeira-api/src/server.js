import "dotenv/config";
import express from "express";
import cors from "cors";
import { execSync } from "child_process";

import categoriesRouter from "./routes/categories.js";
import transactionsRouter from "./routes/transactions.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    name: "gestao-financeira-api",
  });
});

app.use("/categories", categoriesRouter);
app.use("/transactions", transactionsRouter);

app.use(errorHandler);

const port = process.env.PORT ?? 3000;

async function startServer() {
  try {
    console.log("Running migrations...");

    execSync("npx prisma migrate deploy", {
      stdio: "inherit",
    });

    console.log("Running seeds...");

    execSync("npx prisma db seed", {
      stdio: "inherit",
    });

    app.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting application:", error);
    process.exit(1);
  }
}

startServer();
