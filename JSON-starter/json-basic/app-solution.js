/*
Each of these strings (s1 ...s5) contains an error in
JSON construction.In this lab, we will:
  1. take the examples one at a time and see the 
     error in the dev tools console
  2. Identify and repair the error
  3. verify the parsed data in the console
  4. Once fixed, we will add the data to the index page
*/

//In a real-world scenario, these strings would be coming in
// from an extenal call (API call, some other function)
const s1 = `{"course": "CSCI 101", "credits": 3}`;

const s2 = `{"name": "Bear Creek Loop", "miles": 2.4}`;

const s3 = `{"open": true, "closedReason": null, "dogsAllowed": false}`;

const s4 = `{"zip": "07401", "rating": null}`;

const s5 = `[{"item": "tent", "qty": 1},
             {"item": "stove", "qty": 2}]`;
const results = document.querySelector("#results");

// as we fix, just change the s1 to s2, etc
// let obj = JSON.parse(s5);
// for (const v of Object.values(obj)) {
//   console.log(`${v}`);
// }
let allExamples = [s1, s2, s3, s4];
//Construct a string and add as a list item

for (const example of allExamples) {
  let listStr = "";
  let obj = JSON.parse(example);

  let listItem = document.createElement("li");
  for (const [key, value] of Object.entries(obj)) {
    listStr += `${key} --> ${value}`;
    console.log(`${listStr}`);
  }
  listItem.textContent = listStr;
  results.append(listItem);
}
