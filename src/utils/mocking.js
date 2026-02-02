import { faker } from "@faker-js/faker";

export const generateMockPets = (quantity = 100) => {
	const pets = [];

	for (let i = 0; i < quantity; i++) {
		pets.push({
			name: faker.person.firstName(),
			specie: faker.animal.type(),
			birthDate: faker.date.past(),
			adopted: false,
			image: faker.image.urlLoremFlickr({ category: "animals" }),
		});
	}

	return pets;
};
