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
const s1 = `{'course': 'CSCI 101', 'credits': 3}`;

const s2 = `{"name": "Bear Creek Loop" "miles": 2.4,}`;

const s3 = `{"open": True, "closedReason": None, "dogsAllowed": False}`;

const s4 = `{"zip": "07401", "rating": NaN, "note": undefined}`;


const results = document.querySelector("#results");

// as we fix, just change the s1 to s2, etc
