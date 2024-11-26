import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import businessRoutes from "./routes/businessRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import { connectToDb, PORT } from "./db";
import path from "path";

const app = express();
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(express.json());
app.use(cors({
  origin: 'https://frontend-delta-lake-63.vercel.app',
}));

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/businesses", businessRoutes);
app.use("/bookings", bookingRoutes);

connectToDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
