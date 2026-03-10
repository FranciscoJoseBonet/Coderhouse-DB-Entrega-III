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

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

process.on("exit", (code) => {
	console.log("El proceso ha finalizado con código:", code);
});
process.on("uncaughtException", (exception) => {
	console.log("Ha ocurrido una excepción no controlada:", exception);
});
process.on("message", (message) => {
	console.log("Mensaje recibido del proceso padre:", message);
});

const swaggerOptions = {
	definition: {
		openapi: "3.0.1",
		info: {
			title: "Documentación de la API Coderhouse backend III",
			description: "API para la gestión de adopciones de mascotas, usuarios y sesiones.",
		},
	},
	apis: [`${__dirname}/docs/**/*.yaml`],
};

const PORT = config.port;
const connection = mongoose.connect(config.mongo_url);
const specs = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use(cookieParser());
app.use(addLogger);

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

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

export default app;
