process.on("message", (message) => {
	let result = 0;

	if (message === "start") {
		console.log("Iniciando cálculo complejo en proceso hijo...");
		for (let i = 0; i < 5e8; i++) {
			result += i;
		}
		process.send(result);
	}
});
