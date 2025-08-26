import express from "express";
import { connectDB, env, connectRedis } from "./configs";
import { errorHandler, routeNotFound } from "./middlewares";
import { authRouter ,userRouter} from "./routers";


const app = express();
const port = env.PORT;

connectDB();
connectRedis();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ALL ROUTES
app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(errorHandler);
app.use(routeNotFound);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
 