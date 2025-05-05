import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js"; // Corrected the import path
import cardRoutes from "./routes/card.route.js";

const app = express();
const corsOptions = {
  origin: [process.env.CLIENT_URI_PUBLIC, process.env.CLIENT_URI_LOCAL],
  methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
  credentials: true, // allows cookies and authorization headers
};

// Apply CORS with the specified options
app.use(cors(corsOptions));
app.use(cookieParser());
//.options("*", cors(corsOptions)); // handle preflight requests

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Test route to check CORS configuration
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is configured correctly!" });
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Use the corrected user routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cards", cardRoutes); // Use the card routes


export { app };