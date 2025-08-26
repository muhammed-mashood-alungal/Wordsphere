import express from "express";
import { connectDB, env } from "./configs";
import { errorHandler, routeNotFound } from "./middlewares";

const app = express();
const port = env.PORT;

connectDB();

app.use(errorHandler);
app.use(routeNotFound);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
