import { faker } from "@faker-js/faker";
import { createHash } from "./index.js";

export const generateMockPets = (quantity = 100) => {
	const pets = [];

	for (let i = 0; i < quantity; i++) {
		pets.push({
			name: faker.person.firstName(),
			specie: faker.animal.type(),
			birthDate: faker.date.past(),
			adopted: false,
			image: faker.image.url({ category: "animals" }),
		});
	}

	return pets;
};

export const generateMockUsers = async (quantity = 50) => {
	const users = [];

	const password = await createHash("coder123");

	for (let i = 0; i < quantity; i++) {
		users.push({
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			email: faker.internet.email(),
			password: password,
			role: faker.helpers.arrayElement(["user", "admin"]),
			pets: [],
		});
	}

	return users;
};
