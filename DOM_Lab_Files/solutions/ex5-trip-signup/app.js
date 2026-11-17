// Exercise 5: Trip Sign-Up Form (SOLUTION)
const form = document.querySelector("#signupForm");
const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const groupSize = document.querySelector("#groupSize");
const trip = document.querySelector("#trip");
const waiver = document.querySelector("#waiver");
const confirmation = document.querySelector("#confirmation");

// ----- One check per field: a message, or "" if it's fine -----
function checkName() {
  return fullName.value.trim() === "" ? "Enter your name." : "";
}

function checkEmail() {
  const text = email.value.trim();
  if (!text.includes("@") || !text.includes(".")) {
    return "Enter an email address like name@example.com.";
  }
  return "";
}

function checkGroupSize() {
  const text = groupSize.value.trim();
  const n = Number(text);
  if (text === "" || !Number.isInteger(n) || n < 1 || n > 12) {
    return "Group size must be a whole number from 1 to 12.";
  }
  return "";
}

function checkTrip() {
  return trip.value === "" ? "Choose a trip." : "";
}

function checkWaiver() {
  // checked, not value: value is always "on" (Section 4.1.2)
  return waiver.checked ? "" : "You must accept the waiver.";
}

// Each field paired with its check, like a Python list of tuples
const rules = [
  [fullName, checkName],
  [email, checkEmail],
  [groupSize, checkGroupSize],
  [trip, checkTrip],
  [waiver, checkWaiver]
];

// The error box for a field has the field's id plus "Error"
function showError(field, message) {
  const errorBox = document.querySelector(`#${field.id}Error`);
  errorBox.textContent = message;
  field.classList.toggle("invalid", message !== "");
}

// Add one "Label: value" line to the confirmation card
function addLine(label, value) {
  const line = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = label + ": ";
  line.append(strong, value);   // a plain string becomes safe text
  confirmation.appendChild(line);
}

function showConfirmation() {
  const levelRadio =
    document.querySelector('input[name="level"]:checked');
  // The radio sits inside its <label>, so the label holds the words
  const levelText = levelRadio.parentElement.textContent.trim();
  const tripText = trip.options[trip.selectedIndex].text;

  const heading = document.createElement("h2");
  heading.textContent = "You're signed up!";
  confirmation.replaceChildren(heading);

  addLine("Name", fullName.value.trim());
  addLine("Email", email.value.trim());
  addLine("Group size", String(Number(groupSize.value)));
  addLine("Trip", tripText);
  addLine("Experience", levelText);

  form.hidden = true;
  confirmation.hidden = false;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let allGood = true;
  // [field, check] unpacks each pair, like Python's:
  //   for field, check in rules:
  for (const [field, check] of rules) {
    const message = check();
    showError(field, message);
    if (message !== "") {
      allGood = false;
    }
  }
  if (allGood) {
    showConfirmation();
  }
});

// Clear a field's message as soon as the user starts fixing it
for (const [field] of rules) {
  const isChoice =
    field.tagName === "SELECT" || field.type === "checkbox";
  field.addEventListener(isChoice ? "change" : "input", function () {
    showError(field, "");
  });
}
