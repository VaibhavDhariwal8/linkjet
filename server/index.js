import express from "express";
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";
import userRouter from "./routes/user.routes.js";
import urlRouter from "./routes/url.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(authenticationMiddleware);
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://linkjet-six.vercel.app",
      "https://link.vaibhavdhariwal.site",
    ],
    credentials: true,
  })
);

app.get("/health", (_, res) => res.send("ok"));
app.use("/stats", statsRoutes);

app.get("/", (req, res) => {
  return res.json({ status: "Server is up and running..." });
});

app.use("/user", userRouter);
app.use(urlRouter);

app.listen(PORT, () => {
  console.log(`The server is running on PORT: ${PORT}`);
});
