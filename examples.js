// ============================================================
// Basic Examples: Working with Date in JavaScript
// Run with:  node date-examples.js   (or paste into a browser console)
// ============================================================


// ------------------------------------------------------------
// 1. Creating Dates
// ------------------------------------------------------------

// Current date and time
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

// Calling Date() WITHOUT "new" returns a string, not a Date object
console.log("Date() without new:", typeof Date());      // "string"
console.log("new Date() type:", typeof new Date());      // "object"


// ------------------------------------------------------------
// 2. Getting Parts of a Date
// ------------------------------------------------------------

const d = new Date(2026, 10, 4, 14, 5, 30);  // Nov 4, 2026, 2:05:30 PM

console.log("Full year:", d.getFullYear());   // 2026
console.log("Month (0-11):", d.getMonth());   // 10  -> November
console.log("Month (1-12):", d.getMonth() + 1); // 11
console.log("Day of month:", d.getDate());    // 4
console.log("Day of week:", d.getDay());      // 0 = Sunday ... 6 = Saturday
console.log("Hours:", d.getHours());          // 14
console.log("Minutes:", d.getMinutes());      // 5
console.log("Seconds:", d.getSeconds());      // 30
console.log("Timestamp (ms):", d.getTime());  // ms since epoch

// Turning the day number into a name
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday",
                  "Thursday", "Friday", "Saturday"];
console.log("Day name:", dayNames[d.getDay()]); // Wednesday


// ------------------------------------------------------------
// 3. Setting Parts of a Date
// ------------------------------------------------------------

const meeting = new Date(2026, 0, 15);   // Jan 15, 2026
meeting.setFullYear(2027);
meeting.setMonth(5);                     // June
meeting.setDate(20);
meeting.setHours(13, 0, 0);              // 1:00:00 PM
console.log("Updated meeting:", meeting.toString());


// ------------------------------------------------------------
// 4. Formatting Dates for Display
// ------------------------------------------------------------

const f = new Date(2026, 10, 4, 14, 5);

console.log("toString():          ", f.toString());
console.log("toDateString():      ", f.toDateString());
console.log("toTimeString():      ", f.toTimeString());
console.log("toISOString():       ", f.toISOString());   // always UTC
console.log("toLocaleDateString():", f.toLocaleDateString("en-US"));
console.log("toLocaleTimeString():", f.toLocaleTimeString("en-US"));

// Custom formatting with options
console.log("Long format:", f.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
}));  // Wednesday, November 4, 2026

// Other locales
console.log("UK format:     ", f.toLocaleDateString("en-GB"));  // 04/11/2026
console.log("German format: ", f.toLocaleDateString("de-DE"));  // 4.11.2026

// Manual formatting: MM/DD/YYYY with leading zeros
const mm = String(f.getMonth() + 1).padStart(2, "0");
const dd = String(f.getDate()).padStart(2, "0");
const yyyy = f.getFullYear();
console.log("Manual MM/DD/YYYY:", `${mm}/${dd}/${yyyy}`);


// ------------------------------------------------------------
// 5. Date Math
// ------------------------------------------------------------

// Add days (setDate handles rolling over months/years for you)
const start = new Date(2026, 10, 25);    // Nov 25, 2026
const later = new Date(start);           // copy so we don't change start
later.setDate(later.getDate() + 10);
console.log("10 days after Nov 25:", later.toDateString()); // Dec 5

// Difference between two dates in days
const semesterStart = new Date(2026, 7, 24);   // Aug 24, 2026
const semesterEnd   = new Date(2026, 11, 11);  // Dec 11, 2026
const msPerDay = 1000 * 60 * 60 * 24;
const daysLong = Math.round((semesterEnd - semesterStart) / msPerDay);
console.log("Semester length (days):", daysLong);

// Countdown to a date
const today = new Date();
const newYear = new Date(today.getFullYear() + 1, 0, 1);
const daysLeft = Math.ceil((newYear - today) / msPerDay);
console.log("Days until New Year:", daysLeft);


// ------------------------------------------------------------
// 6. Comparing Dates
// ------------------------------------------------------------

const a = new Date(2026, 10, 4);
const b = new Date(2026, 10, 4);
const c = new Date(2026, 11, 1);

console.log("a < c:", a < c);                          // true
console.log("a === b:", a === b);                      // false! (different objects)
console.log("a.getTime() === b.getTime():", a.getTime() === b.getTime()); // true


// ------------------------------------------------------------
// 7. Practical Mini-Examples
// ------------------------------------------------------------

// Calculate age from a birth date
function getAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
     today.getDate() >= birthDate.getDate());
  if (!hadBirthday) age--;
  return age;
}
console.log("Age:", getAge(new Date(2000, 4, 15)));

// Is an assignment late?
function isLate(dueDate, submittedDate) {
  return submittedDate > dueDate;
}
const due = new Date(2026, 10, 6, 23, 59);
const submitted = new Date(2026, 10, 7, 8, 15);
console.log("Late submission?", isLate(due, submitted)); // true

// Time-based greeting
function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  if (hour < 18) return "Good afternoon!";
  return "Good evening!";
}
console.log(greeting());

// Measure how long code takes to run
const t0 = Date.now();                 // shortcut for new Date().getTime()
let total = 0;
for (let i = 0; i < 1_000_000; i++) total += i;
console.log(`Loop took ${Date.now() - t0} ms`);


// ------------------------------------------------------------
// 8. Common Gotchas
// ------------------------------------------------------------

// Gotcha 1: Months are zero-based
console.log(new Date(2026, 1, 1).toDateString()); // Feb 1, NOT Jan 1

// Gotcha 2: Date-only ISO strings are parsed as UTC,
// so they can display as the previous day in US time zones
console.log(new Date("2026-11-04").toString());        // may show Nov 3 (evening)
console.log(new Date("2026-11-04T00:00").toString());  // local midnight Nov 4

// Gotcha 3: Invalid dates don't throw an error
const bad = new Date("not a date");
console.log(bad);                      // Invalid Date
console.log(isNaN(bad.getTime()));     // true -> use this to validate

// Gotcha 4: Overflow rolls over silently
console.log(new Date(2026, 1, 30).toDateString()); // Feb 30 -> Mar 2