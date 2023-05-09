function testAPI() {
	fetch("http://127.0.0.1:8080")
		.then((response) => response.json())
		.then((data) => updateElement("api-test", data.data))
		.catch((error) => console.error(error));
}

function updateElement(id, text) {
	const el = document.getElementById(id);
	el.textContent = text;
}
