// JSON Weather Lab - automated behavior checks
//
// Runs the page in a simulated browser (jsdom) and checks each part.
//
// Setup (once):   npm install jsdom
// Run:            node check_lab.js <folder>
//   <folder> holds the student's index.html and app.js.
//   With no folder given, it checks ../solutions.
//
// Notes for grading:
//   - Text is compared exactly where the handout gives exact wording.
//   - Parts 3 and 4 also run with a 5-day forecast (with an unknown weather
//     code) to catch a hard-coded 4 and a missing "Unknown" default.
//   - The checker can't judge technique or code quality. Read the code too.
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const ROOT = path.resolve(process.argv[2] || path.join(__dirname, "..", "solutions"));

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const DATA_RE = /(<script id="weatherData" type="application\/json">)([\s\S]*?)(<\/script>)/;
const DATA = JSON.parse(html.match(DATA_RE)[2]);

// a 5-day version with an unknown weather code (99) on the last day
const FIVE = JSON.parse(JSON.stringify(DATA));
FIVE.daily.time.push("2026-11-27");
FIVE.daily.weather_code.push(99);
FIVE.daily.temperature_2m_min.push(30.1);
FIVE.daily.temperature_2m_max.push(50.6);
FIVE.daily.wind_speed_10m_max.push(14);

function load(data = DATA) {
  const page = html
    .replace(DATA_RE, (m, a, b, c) => a + JSON.stringify(data, null, 2) + c)
    .replace(/<script src="app\.js"[^>]*><\/script>/, "");
  const dom = new JSDOM(page, { runScripts: "outside-only", url: "http://localhost/" });
  const w = dom.window;
  w.console.log = () => {};
  w.console.table = () => {};
  w.console.error = () => {};
  w.eval(fs.readFileSync(path.join(ROOT, "app.js"), "utf8"));
  return (s) => w.document.querySelector(s);
}
const items = ($) => [...$("#forecast").querySelectorAll("li")].map((li) => li.textContent);

let passed = 0;
const results = [];
function check(name, fn) {
  try {
    fn(); passed++; results.push(`PASS ${name}`);
  } catch (err) {
    results.push(`FAIL ${name} -> ${String(err.message).split("\n")[0]}`);
  }
}

check("part 1 location", () => {
  const $ = load();
  assert.equal($("#location").textContent, "Location: 47.48983, -111.31442 (America/Denver)");
});

check("part 2 today", () => {
  const $ = load();
  assert.equal($("#today").textContent,
    "Today (2026-11-23): high 32.2°F, low 3.3°F, wind 2.8 mp/h");
});

check("part 3 forecast list", () => {
  const $ = load();
  const li = items($);
  assert.equal(li.length, 4, `expected 4 <li> items, found ${li.length} (data.daily has no length!)`);
  assert.equal(li[0], "2026-11-23: Fog, low 3.3°F, high 32.2°F", `item 1 is "${li[0]}"`);
  assert.equal(li[3], "2026-11-26: Overcast, low 25.4°F, high 43.2°F", `item 4 is "${li[3]}"`);
});
check("part 3 five days and unknown code", () => {
  const li = items(load(FIVE));
  assert.equal(li.length, 5, "the list should follow the data (don't type in 4)");
  assert.equal(li[4], "2026-11-27: Unknown, low 30.1°F, high 50.6°F", `item 5 is "${li[4]}"`);
});

check("part 4 windy days and JSON", () => {
  const $ = load();
  assert.equal($("#windy").textContent, "Windy days (10+ mph): 2");
  const text = $("#output").textContent;
  assert.ok(text.includes('\n  {\n    "'), "indent the JSON by 2 spaces");
  const days = JSON.parse(text);
  assert.equal(days.length, 4);
  assert.deepStrictEqual(days[0], { date: "2026-11-23", conditions: "Fog", low: 3.3, high: 32.2, wind: 2.8 },
    `days[0] is ${JSON.stringify(days[0])}`);
  assert.deepStrictEqual(days[3], { date: "2026-11-26", conditions: "Overcast", low: 25.4, high: 43.2, wind: 23.5 },
    `days[3] is ${JSON.stringify(days[3])}`);
  const $5 = load(FIVE);
  assert.equal($5("#windy").textContent, "Windy days (10+ mph): 3", "count from the data");
});

console.log(`Checking: ${ROOT}\n`);
for (const line of results) console.log(line);
console.log(`\n${passed} of ${results.length} checks passed`);
