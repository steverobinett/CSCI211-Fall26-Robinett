// Exercise 3: Reorder the Trails
// Your name:
//
// TODO list (chapter sections in brackets):
//   1. Select #trailList.
//   2. Add ONE click listener to the list that handles every Up and Down
//      button (event delegation).
//   3. Find the trail a clicked button belongs to with closest(). [3.1.1]
//   4. Up moves the trail above the trail before it. [3.2.2, Table 2]
//   5. Down moves the trail below the trail after it. [3.2.1, Table 2]
//   6. Disable Up on the first trail and Down on the last. Update the
//      buttons when the page loads AND after every move.

//1.
const trailList = document.querySelector("#trailList");

//6.
function updateButtons() {
  for (const trail of trailList.children) {
    trail.querySelector(".up").disabled = trail === trailList.firstElementChild;
    trail.querySelector(".down").disabled = trail === trail.lastElementChild;
  }
}

trailList.addEventListener("click", function (e) {
  const button = e.target.closest("button");
  if (!button) {
    return;
  }
  const trail = button.closest(".trail");

  if (button.classList.contains("up")) {
    const above = trail.previousElementSibling;
    if (above) {
      above.before(trail);
    }
  } else if (button.classList.contains("down")) {
    const below = trail.nextElementSibling;
    if (below) {
      below.after(trail);
    }
  }

  updateButtons();
});

updateButtons();
