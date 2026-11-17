DOM Manipulation in JavaScript - Lab Files

starter/    Give these to students. Each exercise folder has index.html,
            styles.css and app.js. Students write their code in app.js
            (Exercise 6 also asks for small HTML additions).
            Don't rename the ids and classes already in the HTML: the
            instructor's checker depends on them.

solutions/  Instructor copies. Open each index.html in a browser to see
            the finished behavior.

instructor-tools/check_lab.js
            Optional automated behavior checks. Run "npm install jsdom"
            once in this folder, then "node check_lab.js <folder>", where
            <folder> holds a student's six exercise folders. With no folder,
            it checks the solutions. See the comments at the top of the file.

Every page loads its script with <script src="app.js" defer>, so students
can open index.html directly. No server is needed.
