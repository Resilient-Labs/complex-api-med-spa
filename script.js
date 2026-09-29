// API 1 turns a ZIP into a city + coordinates, API 2 needs coordinates for the weather
const ZIP_API_URL = "https://api.zippopotam.us/us/";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

const zipForm = document.getElementById("zip-form");
const zipInput = document.getElementById("zip-input");
const checkButton = document.getElementById("check-button");
const messageEl = document.getElementById("message");
const flowEl = document.getElementById("flow");
const flowZip = document.getElementById("flow-zip");
const flowWeather = document.getElementById("flow-weather");
const resultsEl = document.getElementById("results");
const locationInfoEl = document.getElementById("location-info");
const weatherInfoEl = document.getElementById("weather-info");
const adviceEl = document.getElementById("advice");

// ---------- user input ----------
zipForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const zip = zipInput.value.trim();
  console.log("[App] ZIP entered:", zip);

  // zippopotam only knows real 5 digit US zips, so catch typos before wasting a request
  if (!/^\d{5}$/.test(zip)) {
    console.warn("[App] Invalid ZIP, no request sent:", zip);
    showMessage("Please enter a 5-digit US ZIP code (e.g. 19103).", true);
    hideResults();
    return;
  }

  runLookup(zip);
});

// ---------- the chain: ZIP -> coordinates -> weather ----------
async function runLookup(zip) {
  hideResults();
  showMessage("Looking up location...", false);
  // stops double clicks from firing overlapping lookups
  checkButton.disabled = true;

  try {
    const place = await getLocation(zip);
    if (!place) return;

    // these coordinates came from API 1, that's what makes the weather request possible
    console.log(`[App] Using coordinates from Zippopotam: ${place.latitude}, ${place.longitude}`);
    showMessage(`Found ${place.city}, ${place.state}. Checking today's conditions...`, false);

    const weather = await getWeather(place);
    if (!weather) return;

    showResults(place, weather);
    showMessage("", false);
  } finally {
    // runs even after an early return or error so the button never gets stuck disabled
    checkButton.disabled = false;
  }
}

// ---------- API 1: Zippopotam.us ----------
async function getLocation(zip) {
  const url = ZIP_API_URL + zip;
  console.log("[Zippopotam] Request starting:", url);

  let data;
  try {
    const response = await fetch(url);
    console.log(`[Zippopotam] Response status: ${response.status}`);

    // a zip that doesn't exist comes back as 404 with an empty {} body
    if (response.status === 404) {
      console.warn("[Zippopotam] ZIP not found:", zip);
      showMessage(`ZIP code ${zip} wasn't found. Double-check it and try again.`, true);
      return null;
    }
    if (!response.ok) {
      throw new Error(`Zippopotam responded with status ${response.status}`);
    }

    data = await response.json();
    console.log("[Zippopotam] Response data:", data);
  } catch (error) {
    handleFetchError("Zippopotam", "the ZIP code lookup", error);
    return null;
  }

  // lat/long come back as strings, so turn them into numbers and make sure they're real
  const first = data && Array.isArray(data.places) ? data.places[0] : null;
  const latitude = first ? parseFloat(first.latitude) : NaN;
  const longitude = first ? parseFloat(first.longitude) : NaN;

  if (!first || isNaN(latitude) || isNaN(longitude)) {
    console.error("[Zippopotam] Response missing place or coordinates:", data);
    showMessage("The ZIP lookup came back without a location. Try a different ZIP.", true);
    return null;
  }

  return {
    zip: zip,
    city: first["place name"] || "Unknown city",
    state: first["state abbreviation"] || first.state || "",
    latitude: latitude,
    longitude: longitude,
  };
}

// ---------- API 2: Open-Meteo ----------
async function getWeather(place) {
  // timezone=auto so "today" matches the client's local day, not UTC
  const url = `${WEATHER_API_URL}?latitude=${place.latitude}&longitude=${place.longitude}` +
    "&current=temperature_2m,relative_humidity_2m,uv_index" +
    "&daily=uv_index_max&temperature_unit=fahrenheit&timezone=auto&forecast_days=1";

  flowZip.innerHTML = "";
  flowZip.append(`Zippopotam turned ZIP ${place.zip} into ${place.city}, ${place.state} at `);
  appendCode(flowZip, `${place.latitude}, ${place.longitude}`);
  flowWeather.innerHTML = "";
  flowWeather.append("Open-Meteo request built from those coordinates: ");
  appendCode(flowWeather, url);
  flowEl.hidden = false;

  console.log("[Open-Meteo] Request starting:", url);

  let data;
  try {
    const response = await fetch(url);
    console.log(`[Open-Meteo] Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`Open-Meteo responded with status ${response.status}`);
    }

    data = await response.json();
    console.log("[Open-Meteo] Response data:", data);
  } catch (error) {
    handleFetchError("Open-Meteo", "the weather lookup", error);
    return null;
  }

  // open-meteo sends { error: true, reason } for bad params
  if (!data || data.error || !data.current || !data.daily || !Array.isArray(data.daily.uv_index_max)) {
    console.error("[Open-Meteo] Unexpected response shape:", data);
    showMessage("The weather service sent back data in an unexpected format. Try again in a moment.", true);
    return null;
  }

  const weather = {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    currentUv: data.current.uv_index,
    peakUv: data.daily.uv_index_max[0],
  };

  // the advice is all based on these two, so without them there's nothing useful to show
  if (typeof weather.peakUv !== "number" || typeof weather.humidity !== "number") {
    console.error("[Open-Meteo] Missing UV or humidity values:", data);
    showMessage("The weather service didn't include UV or humidity for this location.", true);
    return null;
  }

  return weather;
}

// ---------- rendering ----------
function showResults(place, weather) {
  locationInfoEl.innerHTML = "";
  addLine(locationInfoEl, "City", `${place.city}, ${place.state}`);
  addLine(locationInfoEl, "ZIP", place.zip);
  addLine(locationInfoEl, "Coordinates", `${place.latitude}, ${place.longitude}`);

  const uv = getUvLevel(weather.peakUv);

  weatherInfoEl.innerHTML = "";
  const uvLine = addLine(weatherInfoEl, "Today's peak UV", `${weather.peakUv} `);
  const badge = document.createElement("span");
  badge.className = `level level-${uv.key}`;
  badge.textContent = uv.label;
  uvLine.appendChild(badge);
  addLine(weatherInfoEl, "UV right now", weather.currentUv);
  addLine(weatherInfoEl, "Humidity", `${weather.humidity}%`);
  addLine(weatherInfoEl, "Temperature", weather.temperature != null ? `${Math.round(weather.temperature)}°F` : null);

  adviceEl.innerHTML = "";
  const list = document.createElement("ul");
  getAdvice(uv, weather.humidity).forEach(function (tip) {
    const li = document.createElement("li");
    li.textContent = tip;
    list.appendChild(li);
  });
  adviceEl.appendChild(list);

  resultsEl.hidden = false;
}

// standard uv index ranges (0-2 low, 3-5 moderate, 6-7 high, 8-10 very high, 11+ extreme)
function getUvLevel(uv) {
  if (uv < 3) return { key: "low", label: "Low" };
  if (uv < 6) return { key: "moderate", label: "Moderate" };
  if (uv < 8) return { key: "high", label: "High" };
  if (uv < 11) return { key: "very-high", label: "Very High" };
  return { key: "extreme", label: "Extreme" };
}

function getAdvice(uv, humidity) {
  const tips = [];

  if (uv.key === "low") {
    tips.push("Low UV today. Daily SPF 30 is still recommended, especially for clients using retinoids or exfoliating acids.");
  } else if (uv.key === "moderate") {
    tips.push("Moderate UV. Remind clients to wear broad-spectrum SPF 30+ and reapply every 2 hours outdoors.");
    tips.push("Clients recovering from peels or laser should wear a hat and stay in the shade midday.");
  } else {
    tips.push(`${uv.label} UV. Recommend SPF 50, a wide-brimmed hat, and staying out of the sun from 10am to 4pm.`);
    tips.push("Consider rescheduling chemical peels, laser resurfacing, or microneedling if the client will be outdoors in the next few days.");
    tips.push("Post-treatment clients should avoid direct sun completely today.");
  }

  // 30/60 are rough cutoffs for when skin starts feeling dry or oily
  if (humidity < 30) {
    tips.push(`Dry air (${humidity}% humidity). Suggest a richer moisturizer and a hydrating facial or HydraFacial add-on.`);
  } else if (humidity > 60) {
    tips.push(`Humid air (${humidity}% humidity). Suggest lightweight, oil-free products; oily and acne-prone clients may want a clarifying treatment.`);
  } else {
    tips.push(`Comfortable humidity (${humidity}%). Clients can stick with their usual moisturizer.`);
  }

  return tips;
}

// ---------- helpers ----------
// fetch throws a TypeError when it can't connect at all (offline, DNS, blocked)
function handleFetchError(apiName, lookupName, error) {
  if (error instanceof TypeError) {
    console.error(`[${apiName}] Network error, request never got a response:`, error);
    showMessage(`Couldn't connect for ${lookupName}. Check your internet connection and try again.`, true);
  } else {
    console.error(`[${apiName}] Request failed:`, error);
    showMessage(`Something went wrong with ${lookupName}: ${error.message}`, true);
  }
}

// "Not listed" instead of null/undefined showing on the page
function addLine(parent, label, value) {
  const line = document.createElement("p");
  const labelEl = document.createElement("strong");
  labelEl.textContent = `${label}: `;
  line.appendChild(labelEl);
  line.append(value != null && value !== "" ? String(value) : "Not listed");
  parent.appendChild(line);
  return line;
}

function appendCode(parent, text) {
  const code = document.createElement("code");
  code.textContent = text;
  parent.appendChild(code);
}

function hideResults() {
  resultsEl.hidden = true;
  flowEl.hidden = true;
}

function showMessage(text, isError) {
  messageEl.textContent = text;
  messageEl.className = isError ? "error" : "";
}
