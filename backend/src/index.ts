import express from "express";
import { connectDB, env, connectRedis } from "./configs";
import { errorHandler, routeNotFound } from "./middlewares";
import { authRouter ,blogRouter,userRouter} from "./routers";
import morgan from 'morgan'
import cors from 'cors'

const app = express();
const port = env.PORT;

connectDB();
connectRedis();

app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ALL ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);

app.use(errorHandler);
app.use(routeNotFound);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
 