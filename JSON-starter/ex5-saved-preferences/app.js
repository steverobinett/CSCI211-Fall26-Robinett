// Exercise 5: Saved Preferences
// Your name:
//
// TODO list (chapter sections in brackets):
//   1. Write loadPrefs(): read STORAGE_KEY from localStorage and parse
//      it. Return a copy of DEFAULTS on a first visit (null) and if
//      the saved text is damaged [6.2.1, 6.2.3]
//   2. Write savePrefs(prefs): store prefs as JSON [6.2.2]
//   3. Write applyPrefs(prefs): fill the form, set body class
//      theme-light or theme-dark, set the body font size in px,
//      show "Welcome back, NAME!" (or "Welcome!") in #greeting,
//      and hide #tip when showTips is false [8.2.3]
//   4. Save: read the form with the right TYPES (fontSize a number,
//      showTips a boolean), save, apply, and show "Saved." in
//      #status [6.2.2, 2.2.1]
//   5. Reset: remove the saved item, apply DEFAULTS, and show
//      "Settings reset." in #status [6.2.1]
//   6. Apply the loaded preferences when the page opens [6.2.3]

const STORAGE_KEY = "trailPrefs";
const DEFAULTS = {
  displayName: "", theme: "light", fontSize: 16, showTips: true
};

// Write your code below this line.
