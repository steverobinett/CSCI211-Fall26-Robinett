// Exercise 2: Packing List (SOLUTION)
const packForm = document.querySelector("#packForm");
const itemInput = document.querySelector("#itemInput");
const packList = document.querySelector("#packList");
const emptyMsg = document.querySelector("#emptyMsg");
const clearAllBtn = document.querySelector("#clearAll");

// Show the message only when the list has no items
function updateEmptyMessage() {
  emptyMsg.hidden = packList.children.length > 0;
}

// Build one <li> with createElement (Section 2.1)
function addItem(text) {
  const li = document.createElement("li");

  const name = document.createElement("span");
  name.className = "item-name";
  name.textContent = text;            // user input: textContent only

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove";
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", function () {
    removeBtn.parentElement.remove(); // Sections 2.2.1 and 3.1.1
    updateEmptyMessage();
  });

  li.append(name, removeBtn);
  packList.appendChild(li);
  updateEmptyMessage();
}

packForm.addEventListener("submit", function (e) {
  e.preventDefault();                 // don't reload the page
  const text = itemInput.value.trim();
  if (text === "") {
    return;                           // ignore blank items
  }
  addItem(text);
  itemInput.value = "";
  itemInput.focus();
});

clearAllBtn.addEventListener("click", function () {
  packList.replaceChildren();         // empty the list (Section 2.2.1)
  updateEmptyMessage();
});

updateEmptyMessage();
