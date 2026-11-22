// Exercise 1: JSON Repair Shop
// Your name:
//
// TODO list (chapter sections in brackets):
//   1. Fix the five JSON strings in samples so each one parses and
//      holds exactly the data its comment describes [7.1.1-7.1.3, 2.2.1]
//   2. Write checkJSON(text): return { ok: true, data } when JSON.parse
//      works, or { ok: false, message } from the caught error [4.1.3]
//   3. For each sample, add an <li> to #results with the label in a
//      <strong> and a span.status (classes valid/invalid) showing
//      "Valid" or the error message [5.2.3]
//   4. For valid samples, also add a <pre class="data"> with the parsed
//      data pretty-printed using 2 spaces [4.2.2]
//   5. The Check button runs checkJSON on #tryInput and shows the result
//      in #tryResult the same way [7.2.1]

// Each sample describes the data it SHOULD hold. Fix the JSON text.
// (Every sample is broken right now. Don't change the labels.)
const samples = [
  {
    label: "1. A course",
    // course: the text CSCI 101; credits: the number 3
    text: `{'course': 'CSCI 101', credits: 3}`
  },
  {
    label: "2. A trail",
    // name: Bear Creek Loop; miles: the number 2.4
    text: `{"name": "Bear Creek Loop" "miles": 2.4,}`
  },
  {
    label: "3. Trail status",
    // open: yes; closedReason: no value; dogsAllowed: no
    text: `{"open": True, "closedReason": None, "dogsAllowed": False}`
  },
  {
    label: "4. A trailhead",
    // zip: the text 07401 (keep the leading zero); rating: no value;
    // note: leave it out completely
    text: `{"zip": 07401, "rating": NaN, "note": undefined}`
  },
  {
    label: "5. A gear list",
    // a list of two items: tent (qty 1) and stove (qty 2)
    text: `[
  {"item": "tent", "qty": 1}
  {"item": "stove", "qty": 2},
`
  }
];

const results = document.querySelector("#results");
const tryInput = document.querySelector("#tryInput");
const tryBtn = document.querySelector("#tryBtn");
const tryResult = document.querySelector("#tryResult");

// Write checkJSON(text) here


// Show each sample's result here


// Wire up the Check button here
