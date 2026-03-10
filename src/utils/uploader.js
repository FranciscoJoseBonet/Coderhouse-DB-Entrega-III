import multer from "multer";
import __dirname from "./index.js";
import fs from "fs";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let folder = "documents";

		if (file.fieldname === "profile") folder = "profiles";
		else if (file.fieldname === "pet") folder = "pets";
		else if (file.fieldname === "documents") folder = "documents";

		const path = `${__dirname}/../public/img/${folder}`;

		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, { recursive: true });
		}
		cb(null, path);
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const uploader = multer({ storage });
export default uploader;
