// alert('works')

const zipUrl = "https://api.zippopotam.us/us/";
const weatherUrl = "https://api.open-meteo.com/v1/forecast";

const form = document.getElementById("zip-form");
const message = document.getElementById("message");
const result = document.getElementById("result");


const uvLevels = [
	{
		max: 2,
		name: "Low",
		cssClass: "low",
		advice: "UV is low today. SPF 30 recommended."
	},
	{
		max: 5,
		name: "Moderate",
		cssClass: "moderate",
		advice: "UV is moderate today. Wear SPF 30+ and seek shade around midday."
	},
	{
		max: 7,
		name: "High",
		cssClass: "high",
		advice: "UV is high today. Wear SPF 30+ and reapply every 2 hours."
	},
	{
		max: 10,
		name: "Very High",
		cssClass: "very-high",
		advice: "UV is very high today. Wear SPF 50 and avoid the sun between 10am and 4pm."
	},
	{
		max: 100,
		name: "Extreme",
		cssClass: "extreme",
		advice: "UV is very high. Stay in the shade when possible and wear SPF 50+."
	}
];


form.addEventListener("submit", function (event) {

	event.preventDefault();

	const zip = document.getElementById("zip").value.trim();


	if (zip.length !== 5 || isNaN(zip)) {
		showMessage("Please enter a 5-digit zip code.", true);
		return;
	}

	checkUv(zip);
});

function checkUv(zip) {

	showMessage("Checking today's UV...", false);
	result.classList.add("hidden");


	fetch(zipUrl + zip)

		.then(function (response) {

			if (!response.ok) {
				throw new Error("zip not found");
			}
			return response.json();
		})

		.then(function (zipData) {
			const place = zipData.places[0];

			const latitude = place.latitude;
			const longitude = place.longitude;
			const placeName = place["place name"] + ", " + place["state abbreviation"];


			const params = new URLSearchParams({
				latitude: latitude,
				longitude: longitude,
				daily: "uv_index_max",
				timezone: "auto",
				forecast_days: 1
			});

			return fetch(weatherUrl + "?" + params)

				.then(function (response) {
					return response.json();
				})

				.then(function (weatherData) {
	
					const uv = weatherData.daily.uv_index_max[0];
					showResult(uv, placeName);
					showMessage("", false);
				});
		})

		.catch(function (error) {
			if (error.message === "zip not found") {
				showMessage("no zip code found, please try again", true);
			} else {
				showMessage("something went wrong, please try again", true);
			}
			console.error(error);
		});
}

function showResult(uv, placeName) {

	const level = findLevel(uv);

	document.getElementById("place").textContent = "Today's peak UV in " + placeName;

	const uvNumber = document.getElementById("uv-number");
	uvNumber.textContent = uv.toFixed(1);
	uvNumber.className = "uv-number " + level.cssClass;

	const uvLevel = document.getElementById("uv-level");
	uvLevel.textContent = level.name;
	uvLevel.className = "uv-level " + level.cssClass;

	document.getElementById("uv-advice").textContent = level.advice;

	let tip = "Skin can be extra sensitive after treatments like peels, lasers, or microneedling. Follow your provider's aftercare instructions.";

	if (uv >= 3) {
		tip = "Skin can be extra sensitive after treatments like peels, lasers, or microneedling. Use SPF 50, stay out of direct sun, and follow your provider's aftercare instructions.";
	}

	document.getElementById("aftercare-tip").textContent = tip;

	result.classList.remove("hidden");
}

function findLevel(uv) {
	for (let i = 0; i < uvLevels.length; i++) {
		if (uv <= uvLevels[i].max) {
			return uvLevels[i];
		}
	}
}

function showMessage(text, isError) {
	message.textContent = text;
	message.classList.toggle("error", isError);
}