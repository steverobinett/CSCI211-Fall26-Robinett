// JSON Weather Lab - reference solution
// Name: Instructor
//
// The data is a 4-day Open-Meteo forecast for the Great Falls area, stored
// as JSON text in the <script id="weatherData"> element of index.html.

// ===== Part 1: Load the JSON (Sections 4.1.1, 4.1.2)
const dataText = document.querySelector("#weatherData").textContent;
console.log(typeof dataText);   // "string": still just text
const data = JSON.parse(dataText);
console.log(typeof data);       // "object": now we can use it
console.log(data);

document.querySelector("#location").textContent =
  `Location: ${data.latitude}, ${data.longitude} (${data.timezone})`;

// ===== Part 2: Read values from nested data (Sections 3.2.3, 5.1.1, 5.1.3)
const daily = data.daily;
const units = data.daily_units;

document.querySelector("#today").textContent =
  `Today (${daily.time[0]}): ` +
  `high ${daily.temperature_2m_max[0]}${units.temperature_2m_max}, ` +
  `low ${daily.temperature_2m_min[0]}${units.temperature_2m_min}, ` +
  `wind ${daily.wind_speed_10m_max[0]} ${units.wind_speed_10m_max}`;

// ===== Part 3: Loop through the days (Sections 5.1.2, 5.2.1, 5.2.3)
// Weather codes used by Open-Meteo, with a description for each
const WEATHER_CODES = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Freezing fog",
  61: "Light rain",
  71: "Light snow"
};

// daily is an object, so it has no length. Use the length of one of its arrays.
const forecastList = document.querySelector("#forecast");
for (let i = 0; i < daily.time.length; i++) {
  const code = daily.weather_code[i];
  const conditions = WEATHER_CODES[code] ?? "Unknown";
  const li = document.createElement("li");
  li.textContent = `${daily.time[i]}: ${conditions}, ` +
    `low ${daily.temperature_2m_min[i]}°F, high ${daily.temperature_2m_max[i]}°F`;
  forecastList.appendChild(li);
}

// ===== Part 4: Build and display new JSON (Sections 3.2.2, 4.2.1, 4.2.2)
// One object per day: easier to work with than five separate arrays.
const days = [];
for (let i = 0; i < daily.time.length; i++) {
  days.push({
    date: daily.time[i],
    conditions: WEATHER_CODES[daily.weather_code[i]] ?? "Unknown",
    low: daily.temperature_2m_min[i],
    high: daily.temperature_2m_max[i],
    wind: daily.wind_speed_10m_max[i]
  });
}
console.table(days);

const windyDays = days.filter((day) => day.wind >= 10);
document.querySelector("#windy").textContent =
  `Windy days (10+ mph): ${windyDays.length}`;

document.querySelector("#output").textContent = JSON.stringify(days, null, 2);
