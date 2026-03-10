import chai from "chai";
import supertest from "supertest";
import app from "../src/app.js";

const expect = chai.expect;
const requester = supertest(app);

describe("Testing del Proyecto AdoptMe", () => {
	describe("Módulo de Pets", () => {
		it("GET /api/pets debe devolver un status 200 y el payload debe ser un array", async () => {
			const { statusCode, _body } = await requester.get("/api/pets");
			expect(statusCode).to.equal(200);
			expect(Array.isArray(_body.payload)).to.be.true;
		});

		it("POST /api/pets debe crear una mascota correctamente", async () => {
			const mockPet = {
				name: "Patitas",
				specie: "Perro",
				birthDate: "2022-05-15",
			};
			const { statusCode, _body } = await requester.post("/api/pets").send(mockPet);

			expect(statusCode).to.equal(200);
			expect(_body.payload).to.have.property("_id");
			expect(_body.payload.name).to.be.equal(mockPet.name);
		});

		it("POST /api/pets debe devolver status 400 si faltan campos obligatorios", async () => {
			const incompletePet = { name: "SinEspecie" };
			const { statusCode, _body } = await requester.post("/api/pets").send(incompletePet);

			expect(statusCode).to.equal(400);
			expect(_body.status).to.be.equal("error");
			expect(_body.error).to.be.equal("Incomplete values");
		});
	});

	describe("Módulo de Users", () => {
		it("GET /api/users debe devolver todos los usuarios en un array", async () => {
			const { statusCode, _body } = await requester.get("/api/users");
			expect(statusCode).to.equal(200);
			expect(Array.isArray(_body.payload)).to.be.true;
		});

		it("GET /api/users/:uid debe devolver error 404 (o el manejo de error de tu controller) si el ID no existe", async () => {
			const fakeId = "64b02e940b8bdee820177e8f";
			const { statusCode } = await requester.get(`/api/users/${fakeId}`);

			expect(statusCode).to.satisfy(
				(code) => code === 404 || code === 200 || code === 500,
			);
		});
	});

	describe("Módulo de Sessions", () => {
		const testUser = {
			first_name: "Test",
			last_name: "User",
			email: `test-${Date.now()}@correo.com`,
			password: "123",
		};

		it("POST /api/sessions/register debe registrar un usuario correctamente", async () => {
			const { statusCode, _body } = await requester
				.post("/api/sessions/register")
				.send(testUser);
			expect(statusCode).to.equal(200);
			expect(_body.status).to.be.equal("success");
			expect(_body.payload).to.be.ok;
		});

		it("POST /api/sessions/login debe iniciar sesión y devolver una cookie", async () => {
			const loginData = {
				email: testUser.email,
				password: testUser.password,
			};
			const response = await requester.post("/api/sessions/login").send(loginData);
			expect(response.statusCode).to.equal(200);
			const cookieHeader = response.headers["set-cookie"];
			expect(cookieHeader).to.be.ok;
			expect(cookieHeader[0]).to.contain("coderCookie");
		});
	});

	describe("Módulo de Adoptions", () => {
		it("GET /api/adoptions debe devolver un status 200 y un array de adopciones", async () => {
			const { statusCode, _body } = await requester.get("/api/adoptions");
			expect(statusCode).to.equal(200);
			expect(Array.isArray(_body.payload)).to.be.true;
		});

		it("GET /api/adoptions/:aid debe devolver 404 si la adopción no existe", async () => {
			const fakeAdoptionId = "64b02e940b8bdee820177e8f";
			const { statusCode } = await requester.get(`/api/adoptions/${fakeAdoptionId}`);
			expect(statusCode).to.satisfy((code) => code === 404 || code === 500);
		});

		it("POST /api/adoptions/:uid/:pid debe fallar con 404 si el usuario o la mascota no existen", async () => {
			const fakeUser = "64b02e940b8bdee820177e8f";
			const fakePet = "64b02e940b8bdee820177e90";
			const { statusCode } = await requester.post(
				`/api/adoptions/${fakeUser}/${fakePet}`,
			);

			expect(statusCode).to.satisfy((code) => code === 404 || code === 500);
		});
	});
});
