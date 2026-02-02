import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import { addLogger } from "./utils/logger.js";
import errorHandler from "./middlewares/error.js";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mocksRouter from "./routes/mocks.router.js";

const app = express();

const PORT = config.port;
const connection = mongoose.connect(config.mongo_url);

app.use(express.json());
app.use(cookieParser());
app.use(addLogger);

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);

app.get("/loggerTest", (req, res) => {
	req.logger.debug("Mensaje de Debug");
	req.logger.http("Mensaje HTTP");
	req.logger.info("Mensaje de Info");
	req.logger.warning("Mensaje de Warning");
	req.logger.error("Mensaje de Error");
	req.logger.fatal("Mensaje Fatal");
	res.send("Logs generados. Revisa tu consola y el archivo errors.log");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
