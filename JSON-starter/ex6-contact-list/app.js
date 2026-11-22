// Exercise 6: Contact List with Import and Export
// Your name:
//
// TODO list (chapter sections in brackets):
//   1. Keep contacts in an array of { id, name, email } objects saved
//      in localStorage under "contacts"; start with [] on a first
//      visit or if the saved data is damaged [8.1.3, 6.2.3]
//   2. Write render(): draw one li.contact per contact (span.name,
//      span.email, button.delete) with data-id set to the contact's
//      id, and show "Showing X of Y contacts" in #contactCount [8.2.2]
//   3. Add: name and email are required (show a message in #formMsg
//      if not). Give each new contact a permanent id that is never
//      reused while it exists, save, and redraw [8.1.3, 9.1.2]
//   4. Delete: remove the contact whose id matches the button's
//      data-id. It must delete the right one during a search [8.2.3]
//   5. Search: show only contacts whose name contains the text in
//      #search, ignoring upper/lower case [5.2.1]
//   6. Export: show the list in #jsonBox as JSON indented 2 spaces,
//      and "Exported N contacts." in #importMsg [4.2.2]
//   7. Import: replace the list with the JSON in #jsonBox ONLY if it
//      parses, is an array, and every item has a non-empty name and
//      email string. Then give the contacts fresh ids, save, redraw,
//      and show "Imported N contacts." Otherwise leave the list
//      alone and show a message starting "Import failed:" [7.2.2]

// Write your code below this line.
