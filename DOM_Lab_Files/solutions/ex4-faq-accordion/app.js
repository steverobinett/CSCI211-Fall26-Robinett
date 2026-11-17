// Exercise 4: FAQ Accordion (SOLUTION)
const questions = document.querySelectorAll(".question");

// Close every answer except the one that belongs to `keep`
function closeOthers(keep) {
  questions.forEach(function (question) {
    if (question !== keep) {
      question.classList.remove("open");
      question.nextElementSibling.classList.add("hidden");
    }
  });
}

questions.forEach(function (question) {
  // Click: show or hide this question's answer (Section 3.2.1)
  question.addEventListener("click", function () {
    closeOthers(question);
    const answer = question.nextElementSibling;
    answer.classList.toggle("hidden");
    const isOpen = !answer.classList.contains("hidden");
    question.classList.toggle("open", isOpen);
  });

  // Arrow keys: move focus to the next or previous QUESTION
  question.addEventListener("keydown", function (e) {
    let target;
    if (e.key === "ArrowDown") {
      // The next sibling is this question's own answer,
      // so the next question is two steps away.
      const answer = question.nextElementSibling;
      target = answer.nextElementSibling;
    } else if (e.key === "ArrowUp") {
      // The previous sibling is the answer to the question above.
      const answerAbove = question.previousElementSibling;
      target = answerAbove ? answerAbove.previousElementSibling : null;
    } else {
      return;                 // any other key: leave it alone
    }
    e.preventDefault();       // stop the arrow keys from scrolling
    if (target) {
      target.focus();         // null at the ends: stay put
    }
  });
});
