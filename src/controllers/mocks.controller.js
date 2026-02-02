import { generateMockPets } from "../utils/mocking.js";

export const getMockingPets = async (req, res) => {
	try {
		const pets = generateMockPets(100);
		res.send({ status: "success", payload: pets });
	} catch (error) {
		console.log(error);
		res.status(500).send({ status: "error", error: "Error generando mascotas" });
	}
};
