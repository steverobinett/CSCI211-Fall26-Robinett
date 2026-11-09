console.log("Hello");

console.log(`Sandbox`);

const roster = ["Heather", "Kaia", "Jesse", 
    "Quinton", "Michael"];

    roster.push('Steve')

for(let i=0; i < roster.length; i++){
    console.log(roster[i]);

}


// Dates
let currentDate = Date()
console.log(`Current date is ${currentDate.toString()}`);

const now = new Date();
console.log("Now:", now);

// From a date string (ISO format is the most reliable)
const isoDate = new Date("2026-12-25");
console.log("From ISO string:", isoDate);

// From year, month, day, hours, minutes, seconds
// NOTE: months are ZERO-based (0 = January, 11 = December)
const holiday = new Date(2026, 11, 25, 9, 30, 0);
console.log("From components:", holiday);

// From milliseconds since Jan 1, 1970 (the Unix epoch)
const epoch = new Date(0);
console.log("Epoch:", epoch);

