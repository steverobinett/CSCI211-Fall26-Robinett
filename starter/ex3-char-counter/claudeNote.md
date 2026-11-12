Step 2: The most likely CSS cause is specificity

If the stylesheet styles the paragraph by its ID, like this:

css
#remaining {
    color: #666;
}

.warning {
    color: orange;
}

then .warning loses. An ID selector always beats a class selector, regardless of which rule comes later in the file. In DevTools, click the element and look at the Styles pane: you’ll see the .warning color crossed out.

The fix is to make the class rules at least as specific:

css
#remaining.warning {
    color: orange;
}

#remaining.over {
    color: red;
}