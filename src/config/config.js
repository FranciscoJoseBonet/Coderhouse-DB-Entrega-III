import dotenv from "dotenv";
dotenv.config();

export default {
	port: process.env.PORT || 8080,
	mongo_url: process.env.MONGO_URL,
	environment: process.env.NODE_ENV || "development",
};
