// Exercise 2: Student Profile Card
// Your name:
//
// TODO list (chapter sections in brackets):
//   1. Parse studentsJSON once into an array [4.1.1, 4.1.2]
//   2. Select the elements on the page [5.2.3]
//   3. Write showStudent(student) to fill #studentName (first + last),
//      #studentEmail and #studentPhone; show "No email on file" or
//      "No phone on file" when missing, using ?. and ?? [5.1.3]
//   4. Fill #courseList with one <li> per course, like
//      CSCI 101 (3 credits): A [5.2.1, 5.2.2]
//   5. Show "N courses" ("1 course" for one) in #courseCount and
//      "N credits" in #totalCredits (add up the credits) [3.2.3]
//   6. When #studentPick changes, show that student; show the first
//      student when the page loads [8.1.1]

// The data arrives as JSON TEXT, the way it would from a server.
const studentsJSON = `[
  {
    "id": "S1024",
    "name": { "first": "Maya", "last": "Running Crane" },
    "contact": {
      "email": "maya@example.edu",
      "phone": "406-555-0142"
    },
    "courses": [
      { "code": "CSCI 101", "credits": 3, "grade": "A" },
      { "code": "MATH 121", "credits": 4, "grade": "B+" }
    ]
  },
  {
    "id": "S1025",
    "name": { "first": "Jordan", "last": "Ellis" },
    "contact": { "email": "jordan@example.edu" },
    "courses": [
      { "code": "CSCI 101", "credits": 3, "grade": "B" },
      { "code": "ENGL 101", "credits": 3, "grade": "A-" },
      { "code": "BIO 108", "credits": 4, "grade": "C+" }
    ]
  },
  {
    "id": "S1026",
    "name": { "first": "Sam", "last": "Ortiz" },
    "courses": [
      { "code": "ARTZ 105", "credits": 3, "grade": "A" }
    ]
  }
]`;

// Write your code below this line.
