// Exercise 1: Trail Cards (SOLUTION)
const trails = [
  { name: "Bear Creek Loop", miles: 2.4, level: "easy" },
  { name: "Pine Ridge Trail", miles: 5.1, level: "moderate" },
  { name: "Summit Lake Trail", miles: 8.7, level: "hard" },
  { name: "Cedar Falls Trail", miles: 3.2, level: "easy" },
  { name: "Elk Meadow Trail", miles: 6.5, level: "moderate" }
];

const cardsBox = document.querySelector("#cards");
const featuredBox = document.querySelector("#featured");
const totalMiles = document.querySelector("#totalMiles");

// Build one card from one trail object (Section 2.1.2)
function createTrailCard(trail) {
  const card = document.createElement("div");
  card.classList.add("card", trail.level);

  const heading = document.createElement("h3");
  heading.textContent = trail.name;

  const info = document.createElement("p");
  info.textContent = `${trail.miles} miles, ${trail.level}`;

  card.append(heading, info);
  return card;
}

// Build every card off the page, then attach once (Section 5.1.1)
const fragment = document.createDocumentFragment();
let total = 0;
let longest = trails[0];
for (const trail of trails) {
  fragment.appendChild(createTrailCard(trail));
  total += trail.miles;
  if (trail.miles > longest.miles) {
    longest = trail;
  }
}
cardsBox.appendChild(fragment);

// A NEW card for the featured spot. Appending a card that's already
// in the list would MOVE it out of the list (Section 2.1.2).
featuredBox.appendChild(createTrailCard(longest));

totalMiles.textContent = `Total: ${total.toFixed(1)} miles`;
