function testAPI() {
	fetch("https://bakalarska-prace.azurewebsites.net/")
		.then((response) => response.json())
		.then((data) => updateElement("api-test", data.data))
		.catch((error) => console.error(error));
}

function updateElement(id, text) {
	const el = document.getElementById(id);
	el.textContent = text;
}
