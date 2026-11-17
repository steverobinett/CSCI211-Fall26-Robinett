// Exercise 6: Extend the Hike Log (SOLUTION)
// ----- 1. Elements -----
const form = document.querySelector("#hikeForm");
const trailInput = document.querySelector("#trail");
const milesInput = document.querySelector("#miles");
const difficultySelect = document.querySelector("#difficulty");
const favoriteBox = document.querySelector("#favorite");
const hikeList = document.querySelector("#hikeList");
const summary = document.querySelector("#summary");
const sortBtn = document.querySelector("#sortMiles");        // NEW
const filterLevel = document.querySelector("#filterLevel");  // NEW

// ----- 2. Data: the array is the source of truth -----
const hikes = [];

// ----- 3. Functions -----
function showError(field, message) {
  const errorBox = field.nextElementSibling;   // the <p class="error">
  errorBox.textContent = message;
  field.classList.toggle("invalid", message !== "");
}

function validate() {
  const trailError = trailInput.value.trim() === ""
    ? "Enter a trail name."
    : "";
  const miles = Number(milesInput.value);
  const milesError = milesInput.value.trim() === "" || !(miles > 0)
    ? "Miles must be a number greater than 0."
    : "";

  showError(trailInput, trailError);
  showError(milesInput, milesError);
  return trailError === "" && milesError === "";
}

function createHikeItem(hike, index) {
  const li = document.createElement("li");
  li.classList.add("hike", hike.difficulty);
  li.classList.toggle("favorite", hike.favorite);
  // index is the position in the FULL hikes array, even when filtered
  li.dataset.index = index;

  // NEW: star button shows and toggles the favorite setting
  const starBtn = document.createElement("button");
  starBtn.type = "button";
  starBtn.className = "star";
  starBtn.textContent = hike.favorite ? "★" : "☆";
  starBtn.setAttribute("aria-label", "Toggle favorite");

  const name = document.createElement("span");
  name.className = "name";
  // user input: textContent only
  name.textContent = hike.trail;

  const details = document.createElement("span");
  details.textContent = `${hike.miles} mi, ${hike.difficulty}`;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove";
  removeBtn.textContent = "Remove";

  li.append(starBtn, name, details, removeBtn);
  return li;
}

function render() {
  // NEW: "all" or a difficulty
  const level = filterLevel.value;
  const fragment = document.createDocumentFragment();
  let shown = 0;
  let total = 0;

  hikes.forEach((hike, i) => {
    if (level === "all" || hike.difficulty === level) {
      fragment.appendChild(createHikeItem(hike, i));
      shown++;
      // summary counts shown hikes only
      total += hike.miles;
    }
  });
  hikeList.replaceChildren(fragment);       // one update to the page

  if (hikes.length === 0) {
    summary.textContent = "No hikes logged yet.";
  } else if (shown === 0) {
    summary.textContent = "No hikes match this filter.";
  } else {
    summary.textContent =
      `${shown} hike(s), ${total.toFixed(1)} miles total`;
  }
}

// ----- 4. Event listeners -----
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validate()) {
    return;
  }
  hikes.push({
    trail: trailInput.value.trim(),
    miles: Number(milesInput.value),        // a string until converted!
    difficulty: difficultySelect.value,
    favorite: favoriteBox.checked
  });
  form.reset();                             // clear every field
  trailInput.focus();
  render();
});

// One listener on the list handles Remove AND the stars
hikeList.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li) {
    return;
  }
  const index = Number(li.dataset.index);
  if (e.target.classList.contains("remove")) {
    hikes.splice(index, 1);
  } else if (e.target.classList.contains("star")) {
    hikes[index].favorite = !hikes[index].favorite;   // change the DATA
  } else {
    return;                                 // clicked somewhere else
  }
  render();
});

// NEW Feature 1: longest first. Without a compare function, sort()
// compares items as text: the numbers 10, 9, 2 would sort as 10, 2, 9.
// b.miles - a.miles is positive when b is longer, so b goes first.
sortBtn.addEventListener("click", function () {
  hikes.sort((a, b) => b.miles - a.miles);
  render();
});

// NEW Feature 3: redraw whenever the filter changes
filterLevel.addEventListener("change", render);

// Clear a field's error as soon as the user starts fixing it
for (const field of [trailInput, milesInput]) {
  field.addEventListener("input", () => showError(field, ""));
}

// ----- 5. Startup -----
render();
