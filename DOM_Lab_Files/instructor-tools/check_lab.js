// DOM Manipulation Lab - automated behavior checks (runs pages in a simulated browser)
//
// Setup (once, in this folder):   npm install jsdom
// Run:                            node check_lab.js <folder>
//   <folder> holds the six exercise folders (ex1-trail-cards, ...).
//   With no folder given, it checks ../solutions.
//
// Notes for grading:
//   - This checks BEHAVIOR only. It can't judge technique (createElement instead of
//     innerHTML, event delegation, etc.) or code quality. Read the code too.
//   - It depends on the ids and classes in the starter HTML. If a student renamed
//     one, the check fails even if the feature works; look before deducting.
//   - Error-message WORDING is not checked, only whether a message appears/clears.
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const ROOT = path.resolve(process.argv[2] || path.join(__dirname, "..", "solutions"));

// before: optional function(window) run before app.js (used to watch the page)
function load(folder, before) {
  const dir = path.join(ROOT, folder);
  const html = fs.readFileSync(path.join(dir, "index.html"), "utf8").replace(/<script[^>]*><\/script>/, "");
  const dom = new JSDOM(html, { runScripts: "outside-only", url: "https://example.com/" + folder + "/" });
  if (before) dom.window.__observer = before(dom.window);
  const js = fs.readFileSync(path.join(dir, "app.js"), "utf8");
  dom.window.eval(js);
  const w = dom.window;
  return { w, d: w.document, js, $: (s) => w.document.querySelector(s), $$: (s) => [...w.document.querySelectorAll(s)] };
}
const fire = (w, el, type) => el.dispatchEvent(new w.Event(type, { bubbles: true, cancelable: true }));
const key = (w, el, k) => { const e = new w.KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true }); el.dispatchEvent(e); return e; };
const submit = (w, form) => form.dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
const codeOnly = (js) => js.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

let passed = 0;
function check(name, fn) {
  try { fn(); passed++; console.log("PASS", name); }
  catch (err) { console.log("FAIL", name, "->", String(err.message).split("\n")[0]); }
}

check("ex1 Trail Cards", () => {
  const { w, $, $$ } = load("ex1-trail-cards", (w) => {
    // count how many times the script changes #cards' children
    const obs = new w.MutationObserver(() => {});
    obs.observe(w.document.querySelector("#cards"), { childList: true });
    return obs;
  });
  const cardText = (c) => [c.querySelector("h3").textContent, c.querySelector("p").textContent];
  const cards = $$("#cards > .card");
  assert.deepEqual(cards.map(cardText), [
    ["Bear Creek Loop", "2.4 miles, easy"], ["Pine Ridge Trail", "5.1 miles, moderate"],
    ["Summit Lake Trail", "8.7 miles, hard"], ["Cedar Falls Trail", "3.2 miles, easy"],
    ["Elk Meadow Trail", "6.5 miles, moderate"]], "#cards needs all five cards, in order, with h3 and p");
  assert.ok(cards[2].classList.contains("hard") && cards[0].classList.contains("easy"), "each card has its level as a class");
  assert.equal(w.__observer.takeRecords().length, 1, "attach all the cards in ONE step (a DocumentFragment)");
  const featured = $$("#featured > .card");
  assert.equal(featured.length, 1, "#featured needs one card");
  assert.deepEqual(cardText(featured[0]), ["Summit Lake Trail", "8.7 miles, hard"], "featured = the longest trail");
  assert.equal($("#totalMiles").textContent, "Total: 25.9 miles");
});

check("ex2 Packing List", () => {
  const { w, $, $$, js } = load("ex2-packing-list");
  const items = () => $$("#packList li").map((li) => li.querySelector(".item-name").textContent);
  const add = (t) => { $("#itemInput").value = t; submit(w, $("#packForm")); };
  assert.equal($("#emptyMsg").hidden, false, "empty message visible at start");
  add("  Tent ");
  assert.deepEqual(items(), ["Tent"], "adds a trimmed item");
  assert.equal($("#itemInput").value, "", "input cleared");
  assert.equal($("#emptyMsg").hidden, true, "empty message hidden once there's an item");
  add("   ");
  assert.deepEqual(items(), ["Tent"], "blank item ignored");
  add("Water"); add("<b>Snacks</b>");
  assert.deepEqual(items(), ["Tent", "Water", "<b>Snacks</b>"]);
  assert.equal($$("#packList b").length, 0, "user text must stay text");
  $$("#packList .remove")[1].click();
  assert.deepEqual(items(), ["Tent", "<b>Snacks</b>"], "Remove deletes its own item");
  $("#clearAll").click();
  assert.equal($$("#packList li").length, 0, "Clear all");
  assert.equal($("#emptyMsg").hidden, false, "empty message back after Clear all");
  add("Map");
  $(".remove").click();
  assert.equal($("#emptyMsg").hidden, false, "empty message back after removing the last item");
  assert.ok(!/innerHTML/.test(codeOnly(js)), "app.js must not use innerHTML");
});

check("ex3 Reorder the Trails", () => {
  const { w, $, $$ } = load("ex3-reorder-trails");
  const names = () => $$("#trailList .trail .name").map((n) => n.textContent);
  const ups = () => $$("#trailList .up").map((b) => b.disabled);
  const downs = () => $$("#trailList .down").map((b) => b.disabled);
  const btn = (name, cls) => $$("#trailList .trail").find((t) => t.querySelector(".name").textContent === name).querySelector(cls);
  const start = ["Bear Creek Loop", "Pine Ridge Trail", "Summit Lake Trail", "Cedar Falls Trail", "Elk Meadow Trail"];
  assert.deepEqual(names(), start);
  assert.deepEqual(ups(), [true, false, false, false, false], "Up disabled on the first trail only, at load");
  assert.deepEqual(downs(), [false, false, false, false, true], "Down disabled on the last trail only, at load");
  btn("Bear Creek Loop", ".down").click();
  assert.deepEqual(names(), ["Pine Ridge Trail", "Bear Creek Loop", "Summit Lake Trail", "Cedar Falls Trail", "Elk Meadow Trail"], "Down");
  assert.deepEqual(ups(), [true, false, false, false, false], "buttons updated after a move");
  btn("Elk Meadow Trail", ".up").click();
  assert.deepEqual(names(), ["Pine Ridge Trail", "Bear Creek Loop", "Summit Lake Trail", "Elk Meadow Trail", "Cedar Falls Trail"], "Up");
  assert.deepEqual(downs(), [false, false, false, false, true], "buttons updated after a move");
  btn("Bear Creek Loop", ".up").click();
  assert.deepEqual(names().slice(0, 2), ["Bear Creek Loop", "Pine Ridge Trail"], "Up to the top");
  assert.deepEqual(ups(), [true, false, false, false, false]);
  $$("#trailList .name")[2].click();                    // a click that isn't on a button
  assert.deepEqual(names(), ["Bear Creek Loop", "Pine Ridge Trail", "Summit Lake Trail", "Elk Meadow Trail", "Cedar Falls Trail"], "clicking a name changes nothing");
});

check("ex4 FAQ Accordion", () => {
  const { w, d, $$ } = load("ex4-faq-accordion");
  const q = $$(".question");
  const open = () => $$(".answer").map((a) => !a.classList.contains("hidden"));
  const qOpen = () => q.map((x) => x.classList.contains("open"));
  q[0].click();
  assert.deepEqual(open(), [true, false, false, false], "first answer opens");
  assert.deepEqual(qOpen(), [true, false, false, false], "first question has class open");
  q[2].click();
  assert.deepEqual(open(), [false, false, true, false], "opening another closes the first");
  assert.deepEqual(qOpen(), [false, false, true, false]);
  q[2].click();
  assert.deepEqual(open(), [false, false, false, false], "clicking an open question closes it");
  assert.deepEqual(qOpen(), [false, false, false, false]);
  q[0].focus();
  let e = key(w, q[0], "ArrowDown");
  assert.equal(d.activeElement, q[1], "ArrowDown moves to the next QUESTION (not its answer)");
  assert.equal(e.defaultPrevented, true, "ArrowDown must not scroll");
  key(w, q[1], "ArrowDown"); key(w, q[2], "ArrowDown");
  assert.equal(d.activeElement, q[3]);
  key(w, q[3], "ArrowDown");
  assert.equal(d.activeElement, q[3], "ArrowDown on the last question stays put");
  key(w, q[3], "ArrowUp");
  assert.equal(d.activeElement, q[2], "ArrowUp moves to the previous question");
  q[0].focus(); key(w, q[0], "ArrowUp");
  assert.equal(d.activeElement, q[0], "ArrowUp on the first question stays put");
  e = key(w, q[0], "a");
  assert.equal(e.defaultPrevented, false, "other keys must not be blocked");
});

check("ex5 Trip Sign-Up Form", () => {
  const { w, $, $$ } = load("ex5-trip-signup");
  const ids = ["fullName", "email", "groupSize", "trip", "waiver"];
  const errs = () => ids.map((id) => $(`#${id}Error`).textContent.trim() !== "");
  const go = () => submit(w, $("#signupForm"));
  $("#groupSize").value = "";
  go();
  assert.deepEqual(errs(), [true, true, true, true, true], "empty form: every field shows a message");
  assert.equal($("#confirmation").hidden, true);
  $("#fullName").value = "   "; $("#email").value = "ada@example"; $("#groupSize").value = "2.5";
  $("#trip").value = "summit-lake"; $("#waiver").checked = false;
  go();
  assert.deepEqual(errs(), [true, true, true, false, true], "spaces-only name, email without a dot, 2.5, unchecked waiver");
  for (const bad of ["0", "13", "abc"]) {
    $("#groupSize").value = bad; go();
    assert.equal(errs()[2], true, `group size "${bad}" should be rejected`);
  }
  fire(w, $("#fullName"), "input");
  assert.equal(errs()[0], false, "typing in Name clears its message");
  $("#waiver").checked = true; fire(w, $("#waiver"), "change");
  assert.equal(errs()[4], false, "checking the waiver clears its message");
  $("#fullName").value = "<b>Ada</b>"; $("#email").value = "ada@example.com"; $("#groupSize").value = "4";
  $('input[name="level"][value="experienced"]').checked = true;
  go();
  assert.deepEqual(errs(), [false, false, false, false, false], "valid form: no messages");
  assert.equal($("#signupForm").hidden, true, "form hidden after success");
  assert.equal($("#confirmation").hidden, false, "confirmation shown");
  const text = $("#confirmation").textContent;
  for (const want of ["<b>Ada</b>", "ada@example.com", "4", "Summit Lake Trail", "Experienced"]) {
    assert.ok(text.includes(want), `confirmation should include "${want}"`);
  }
  assert.ok(!text.includes("summit-lake"), "show the trip's name, not its value");
  assert.equal($$("#confirmation b").length, 0, "user text must stay text");
});

check("ex6 Extend the Hike Log", () => {
  const { w, $, $$ } = load("ex6-hike-log");
  const add = (trail, miles, level, fav = false) => {
    $("#trail").value = trail; $("#miles").value = miles; $("#difficulty").value = level; $("#favorite").checked = fav;
    submit(w, $("#hikeForm"));
  };
  const names = () => $$("#hikeList li .name").map((n) => n.textContent);
  const favs = () => $$("#hikeList li").map((li) => li.classList.contains("favorite"));
  const filter = (v) => { $("#filterLevel").value = v; fire(w, $("#filterLevel"), "change"); };
  assert.ok($("#sortMiles") && $("#filterLevel"), "needs #sortMiles and #filterLevel");
  add("Short", "2", "easy"); add("Long", "10", "easy"); add("Middle", "9", "hard");
  assert.deepEqual(names(), ["Short", "Long", "Middle"]);
  $("#sortMiles").click();
  assert.deepEqual(names(), ["Long", "Middle", "Short"], "longest first, sorted as NUMBERS");
  $$("#hikeList li .star")[1].click();                  // star Middle
  assert.deepEqual(favs(), [false, true, false], "star marks a favorite");
  add("Extra", "1", "moderate");                       // re-render must keep the favorite
  assert.deepEqual(favs(), [false, true, false, false], "favorite must survive a re-render (change the data)");
  filter("easy");
  assert.deepEqual(names(), ["Long", "Short"], "filter Easy");
  assert.equal($("#summary").textContent, "2 hike(s), 12.0 miles total", "summary counts shown hikes only");
  $$("#hikeList li .star")[1].click();                  // star Short while filtered
  $$("#hikeList li .remove")[0].click();                // remove Long while filtered
  assert.deepEqual(names(), ["Short"], "Remove while filtered removes the right hike");
  filter("all");
  assert.deepEqual(names(), ["Middle", "Short", "Extra"], "the right hike was removed from the data");
  assert.deepEqual(favs(), [true, true, false], "the right hike was starred while filtered");
  filter("hard");
  assert.deepEqual(names(), ["Middle"]);
  $$("#hikeList li .remove")[0].click();
  assert.equal($("#summary").textContent, "No hikes match this filter.");
  filter("all");
  assert.equal($("#summary").textContent, "2 hike(s), 3.0 miles total");
  submit(w, $("#hikeForm"));                            // empty form: original validation still works
  assert.equal($("#trail").nextElementSibling.textContent, "Enter a trail name.", "original validation still works");
});

console.log(`\n${passed} of 6 checks passed`);
