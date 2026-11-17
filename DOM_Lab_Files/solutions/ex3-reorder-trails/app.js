// Exercise 3: Reorder the Trails (SOLUTION)
const trailList = document.querySelector("#trailList");

// Up is disabled on the first trail, Down on the last
function updateButtons() {
  for (const trail of trailList.children) {
    trail.querySelector(".up").disabled =
      trail === trailList.firstElementChild;
    trail.querySelector(".down").disabled =
      trail === trailList.lastElementChild;
  }
}

// One listener on the list handles every button (event delegation)
trailList.addEventListener("click", function (e) {
  const button = e.target.closest("button");
  if (!button) {
    return;                        // a click on a name, not a button
  }
  const trail = button.closest(".trail");     // Section 3.1.1

  if (button.classList.contains("up")) {
    const above = trail.previousElementSibling;  // Section 3.2.2
    if (above) {
      above.before(trail);         // moves the trail; doesn't copy it
    }
  } else if (button.classList.contains("down")) {
    const below = trail.nextElementSibling;      // Section 3.2.1
    if (below) {
      below.after(trail);
    }
  }
  updateButtons();
});

updateButtons();
