// JSON Weather Lab
// Name: ____________________
//
// CHECKPOINT: Parts 1-1 are done. Copy this over your app.js to catch up.
// We'll build this page together, one part at a time. Each part starts with
// a short demo; then it's your turn. Don't change the ids in index.html.
//
// The data is a 4-day Open-Meteo forecast for the Great Falls area. It's in
// the <script id="weatherData"> element at the bottom of index.html (and in
// weatherData.json, which is the same text).
//
// Keep the Console open the whole time (F12).

// ===== Part 1: Load the JSON (Sections 4.1.1, 4.1.2)
const dataText = document.querySelector("#weatherData").textContent;
console.log(typeof dataText);   // "string": still just text
const data = JSON.parse(dataText);
console.log(typeof data);       // "object": now we can use it
console.log(data);

document.querySelector("#location").textContent =
  `Location: ${data.latitude}, ${data.longitude} (${data.timezone})`;

// ===== Part 2: Read values from nested data (Sections 3.2.3, 5.1.1, 5.1.3)
// TODO 2 (your turn): Show today's weather in #today, like this:
//   Today (2026-11-23): high 32.2°F, low 3.3°F, wind 2.8 mp/h
// Every value and unit must come from data (units are in data.daily_units).

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
// TODO 3 (your turn): Add one <li> to #forecast for each day, like this:
//   2026-11-23: Fog, low 3.3°F, high 32.2°F
// Look up each day's description in WEATHER_CODES. Codes that aren't
// in the list show "Unknown".

// ===== Part 4: Build and display new JSON (Sections 3.2.2, 4.2.1, 4.2.2)
// TODO 4a (your turn): Build an array named days with one object per day:
//   { date: "2026-11-23", conditions: "Fog", low: 3.3, high: 32.2, wind: 2.8 }
// TODO 4b: Show it with console.table(days).
// TODO 4c (your turn): Use filter() to count the days with wind of 10 or
//   more, and show "Windy days (10+ mph): 2" in #windy.
// TODO 4d (your turn): Show days in #output as JSON indented by 2 spaces.
