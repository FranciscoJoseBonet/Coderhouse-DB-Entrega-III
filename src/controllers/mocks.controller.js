import { fork } from "child_process";
import { generateMockPets, generateMockUsers } from "../utils/mocking.js";
import User from "../dao/models/User.js";
import Pet from "../dao/models/Pet.js";

export const getMockingPets = async (req, res) => {
	try {
		const pets = generateMockPets(100);
		res.send({ status: "success", payload: pets });
	} catch (error) {
		res.status(500).send({ status: "error", error: error.message });
	}
};

export const getMockingUsers = async (req, res) => {
	try {
		const users = await generateMockUsers(50);
		res.send({ status: "success", payload: users });
	} catch (error) {
		res.status(500).send({ status: "error", error: error.message });
	}
};

export const generateData = async (req, res) => {
	try {
		const { users, pets } = req.body;

		const usersList = users ? await generateMockUsers(users) : [];
		const petsList = pets ? generateMockPets(pets) : [];

		if (usersList.length > 0) await User.insertMany(usersList);
		if (petsList.length > 0) await Pet.insertMany(petsList);

		res.send({
			status: "success",
			message: "Datos generados e insertados correctamente",
			payload: {
				usersInserted: usersList.length,
				petsInserted: petsList.length,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ status: "error", error: error.message });
	}
};

export const getSum = (req, res) => {
	const child = fork("./src/utils/calculation.js");

	child.send("start");
	child.on("message", (result) => {
		res.send({
			status: "success",
			payload: `El resultado de la suma compleja es: ${result}`,
		});
	});
};
