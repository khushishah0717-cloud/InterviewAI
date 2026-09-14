// src/data/questionsData.js

export const questionsData = {
  'Technical Interview': {
    'Programming': [
      { id: 1, type: 'MCQ', question: 'Which of the following is NOT a programming paradigm?', options: ['Object-Oriented', 'Functional', 'Procedural', 'Compilation'], answer: 'Compilation' },
      { id: 2, type: 'MCQ', question: 'What is the purpose of a variable in programming?', options: ['To run code faster', 'To store data values', 'To connect to the internet', 'To execute loops'], answer: 'To store data values' },
      { id: 3, type: 'MCQ', question: 'Which data structure follows the LIFO principle?', options: ['Queue', 'Array', 'Stack', 'Tree'], answer: 'Stack' },
      { id: 4, type: 'Short Answer', question: 'What is the difference between a compiler and an interpreter?' },
      { id: 5, type: 'Short Answer', question: 'What is a function and why is it useful?' },
      { id: 6, type: 'Short Answer', question: 'What is recursion?' },
      { id: 7, type: 'MCQ', question: 'Which operator is commonly used to compare two values for equality without type coercion?', options: ['==', '=', '===', '!='], answer: '===' },
      { id: 8, type: 'Short Answer', question: 'What is the difference between a syntax error and a logical error?' },
      { id: 9, type: 'Open-Ended', question: 'Explain how you would approach solving a programming problem you have never seen before.' },
      { id: 10, type: 'Open-Ended', question: 'Describe a programming project you have worked on and the main challenge you faced.' }
    ],
    'DSA': [
      { id: 1, type: 'MCQ', question: 'Which data structure follows FIFO?', options: ['Stack', 'Queue', 'Graph', 'Tree'], answer: 'Queue' },
      { id: 2, type: 'MCQ', question: 'What is the average time complexity of searching in a hash table?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], answer: 'O(1)' },
      { id: 3, type: 'MCQ', question: 'Which traversal of a Binary Search Tree produces sorted output?', options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'], answer: 'In-order' },
      { id: 4, type: 'Short Answer', question: 'What is the difference between an array and a linked list?' },
      { id: 5, type: 'Short Answer', question: 'What is a stack and where is it used?' },
      { id: 6, type: 'Short Answer', question: 'What is a queue?' },
      { id: 7, type: 'Short Answer', question: 'What is the time complexity of binary search?' },
      { id: 8, type: 'Short Answer', question: 'What is recursion and where can it be useful in DSA?' },
      { id: 9, type: 'Open-Ended', question: 'How would you approach finding duplicate elements in an array?' },
      { id: 10, type: 'Open-Ended', question: 'Explain how you would choose between an array, stack, queue, and linked list for a problem.' }
    ],
    'JavaScript': [
      { id: 1, type: 'MCQ', question: 'Which keyword is used to declare a block-scoped variable?', options: ['var', 'let', 'global', 'define'], answer: 'let' },
      { id: 2, type: 'MCQ', question: 'What does === check in JavaScript?', options: ['Value only', 'Type only', 'Both value and type', 'Memory reference only'], answer: 'Both value and type' },
      { id: 3, type: 'MCQ', question: 'Which method adds an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 'push()' },
      { id: 4, type: 'Short Answer', question: 'What is the difference between let, const, and var?' },
      { id: 5, type: 'Short Answer', question: 'What is a callback function?' },
      { id: 6, type: 'Short Answer', question: 'What is an arrow function?' },
      { id: 7, type: 'Short Answer', question: 'What is the difference between == and ===?' },
      { id: 8, type: 'Short Answer', question: 'What is the purpose of map() in JavaScript?' },
      { id: 9, type: 'Open-Ended', question: 'Explain how you would handle an asynchronous API request in JavaScript.' },
      { id: 10, type: 'Open-Ended', question: 'Explain a JavaScript concept that you found difficult and how you learned it.' }
    ],
    'React': [
      { id: 1, type: 'MCQ', question: 'What is React primarily used for?', options: ['Database Management', 'Building User Interfaces', 'Server-side Routing', 'Styling CSS'], answer: 'Building User Interfaces' },
      { id: 2, type: 'MCQ', question: 'Which hook is commonly used to manage state?', options: ['useEffect', 'useContext', 'useState', 'useReducer'], answer: 'useState' },
      { id: 3, type: 'MCQ', question: 'Which hook is commonly used for side effects?', options: ['useState', 'useEffect', 'useMemo', 'useCallback'], answer: 'useEffect' },
      { id: 4, type: 'Short Answer', question: 'What is a React component?' },
      { id: 5, type: 'Short Answer', question: 'What are props in React?' },
      { id: 6, type: 'Short Answer', question: 'What is state in React?' },
      { id: 7, type: 'Short Answer', question: 'What is the purpose of useState()?' },
      { id: 8, type: 'Short Answer', question: 'What is the purpose of useEffect()?' },
      { id: 9, type: 'Open-Ended', question: 'Explain how you would manage a form with multiple input fields in React.' },
      { id: 10, type: 'Open-Ended', question: 'Explain how data flows between components in React.' }
    ],
    'Databases': [
      { id: 1, type: 'MCQ', question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Question Language', 'System Query Logic', 'Sequential Query Language'], answer: 'Structured Query Language' },
      { id: 2, type: 'MCQ', question: 'Which SQL command is used to retrieve data?', options: ['GET', 'FETCH', 'SELECT', 'EXTRACT'], answer: 'SELECT' },
      { id: 3, type: 'MCQ', question: 'Which key uniquely identifies a record in a table?', options: ['Foreign Key', 'Primary Key', 'Secondary Key', 'Unique Index'], answer: 'Primary Key' },
      { id: 4, type: 'Short Answer', question: 'What is a primary key?' },
      { id: 5, type: 'Short Answer', question: 'What is a foreign key?' },
      { id: 6, type: 'Short Answer', question: 'What is normalization?' },
      { id: 7, type: 'Short Answer', question: 'What is the difference between DELETE and DROP?' },
      { id: 8, type: 'Short Answer', question: 'What is a JOIN in SQL?' },
      { id: 9, type: 'Open-Ended', question: 'Explain how you would design a database for an online shopping application.' },
      { id: 10, type: 'Open-Ended', question: 'Explain how you would prevent duplicate or inconsistent data in a database.' }
    ],
    'System Design': [
      { id: 1, type: 'MCQ', question: 'What is scalability?', options: ['System speed under zero load', 'Ability to handle growing work by adding resources', 'Writing clean code', 'Securing user passwords'], answer: 'Ability to handle growing work by adding resources' },
      { id: 2, type: 'MCQ', question: 'What is the purpose of a load balancer?', options: ['To store user session tokens', 'To distribute traffic evenly across multiple servers', 'To host database files', 'To compile code'], answer: 'To distribute traffic evenly across multiple servers' },
      { id: 3, type: 'MCQ', question: 'Which component is commonly used to store frequently accessed data?', options: ['Database Server', 'CDN', 'Cache', 'Load Balancer'], answer: 'Cache' },
      { id: 4, type: 'Short Answer', question: 'What is an API?' },
      { id: 5, type: 'Short Answer', question: 'What is the difference between frontend and backend?' },
      { id: 6, type: 'Short Answer', question: 'What is a database server?' },
      { id: 7, type: 'Short Answer', question: 'What is caching?' },
      { id: 8, type: 'Short Answer', question: 'What is horizontal scaling?' },
      { id: 9, type: 'Open-Ended', question: 'How would you design a simple URL-shortening service?' },
      { id: 10, type: 'Open-Ended', question: 'How would you design a basic online interview platform?' }
    ],
    'Git/GitHub': [
      { id: 1, type: 'MCQ', question: 'Which command is used to create a Git repository?', options: ['git make', 'git init', 'git new', 'git start'], answer: 'git init' },
      { id: 2, type: 'MCQ', question: 'Which command is used to upload local commits to a remote repository?', options: ['git upload', 'git send', 'git push', 'git export'], answer: 'git push' },
      { id: 3, type: 'MCQ', question: 'Which command downloads changes from a remote repository?', options: ['git pull', 'git download', 'git clone', 'git sync'], answer: 'git pull' },
      { id: 4, type: 'Short Answer', question: 'What is Git?' },
      { id: 5, type: 'Short Answer', question: 'What is GitHub?' },
      { id: 6, type: 'Short Answer', question: 'What is a Git commit?' },
      { id: 7, type: 'Short Answer', question: 'What is a branch in Git?' },
      { id: 8, type: 'Short Answer', question: 'What is the difference between git pull and git fetch?' },
      { id: 9, type: 'Open-Ended', question: 'Explain how you would use Git while working on a team project.' },
      { id: 10, type: 'Open-Ended', question: 'Describe the Git workflow you normally follow when making a new feature.' }
    ]
  },
  'Behavioral & HR': {
    'Introduction': [
      { id: 1, type: 'Open-Ended', question: 'Tell me about yourself.' },
      { id: 2, type: 'Open-Ended', question: 'Walk me through your educational background.' },
      { id: 3, type: 'Open-Ended', question: 'Why did you choose your current field of study?' },
      { id: 4, type: 'Open-Ended', question: 'How would you describe yourself in three words?' },
      { id: 5, type: 'Open-Ended', question: 'What are you currently learning or working on?' },
      { id: 6, type: 'Open-Ended', question: 'What interests you most about the technology field?' },
      { id: 7, type: 'Open-Ended', question: 'Tell me about a project you are particularly proud of.' },
      { id: 8, type: 'Open-Ended', question: 'What has been your most valuable learning experience so far?' },
      { id: 9, type: 'Open-Ended', question: 'What do you enjoy doing outside of your academic work?' },
      { id: 10, type: 'Open-Ended', question: 'Why should we consider you for this internship?' }
    ],
    'Strengths & Weaknesses': [
      { id: 1, type: 'Open-Ended', question: 'What are your greatest strengths?' },
      { id: 2, type: 'Open-Ended', question: 'What is one weakness you are currently working on?' },
      { id: 3, type: 'Open-Ended', question: 'Which skill are you most confident in?' },
      { id: 4, type: 'Open-Ended', question: 'What is one technical skill you would like to improve?' },
      { id: 5, type: 'Open-Ended', question: 'How do you respond to constructive criticism?' },
      { id: 6, type: 'Open-Ended', question: 'Tell me about a time when one of your strengths helped you complete a task successfully.' },
      { id: 7, type: 'Open-Ended', question: 'Tell me about a situation where one of your weaknesses affected your work. What did you learn from it?' },
      { id: 8, type: 'Open-Ended', question: 'How do you handle situations where you don\'t know the answer to a problem?' },
      { id: 9, type: 'Open-Ended', question: 'What is one habit or behavior you are trying to improve?' },
      { id: 10, type: 'Open-Ended', question: 'What do you think makes you different from other candidates?' }
    ],
    'Situational Questions': [
      { id: 1, type: 'Open-Ended', question: 'What would you do if you were assigned a task you had never done before?' },
      { id: 2, type: 'Open-Ended', question: 'What would you do if you were given a deadline that seemed difficult to meet?' },
      { id: 3, type: 'Open-Ended', question: 'How would you handle multiple tasks with the same deadline?' },
      { id: 4, type: 'Open-Ended', question: 'What would you do if you made a mistake in an important project?' },
      { id: 5, type: 'Open-Ended', question: 'What would you do if you were stuck on a problem for several hours?' },
      { id: 6, type: 'Open-Ended', question: 'How would you handle a situation where you did not understand your manager\'s instructions?' },
      { id: 7, type: 'Open-Ended', question: 'What would you do if the requirements of a project suddenly changed?' },
      { id: 8, type: 'Open-Ended', question: 'What would you do if you realized that you were going to miss an important deadline?' },
      { id: 9, type: 'Open-Ended', question: 'How would you respond if your first solution to a problem did not work?' },
      { id: 10, type: 'Open-Ended', question: 'What would you do if you were asked to complete a task but did not have all the information you needed?' }
    ],
    'Teamwork': [
      { id: 1, type: 'Open-Ended', question: 'Tell me about a time when you worked successfully as part of a team.' },
      { id: 2, type: 'Open-Ended', question: 'What role do you usually take when working in a team?' },
      { id: 3, type: 'Open-Ended', question: 'How do you make sure your teammates understand your ideas?' },
      { id: 4, type: 'Open-Ended', question: 'Tell me about a time when you helped a teammate.' },
      { id: 5, type: 'Open-Ended', question: 'What would you do if a teammate was not completing their assigned work?' },
      { id: 6, type: 'Open-Ended', question: 'How do you handle situations where team members have different opinions?' },
      { id: 7, type: 'Open-Ended', question: 'Tell me about a team project that did not go as planned.' },
      { id: 8, type: 'Open-Ended', question: 'How do you handle receiving feedback from your teammates?' },
      { id: 9, type: 'Open-Ended', question: 'What do you think makes a team successful?' },
      { id: 10, type: 'Open-Ended', question: 'Tell me about a time when you had to adapt your approach to work effectively with a team.' }
    ],
    'Conflict Resolution': [
      { id: 1, type: 'Open-Ended', question: 'Tell me about a time when you disagreed with a teammate.' },
      { id: 2, type: 'Open-Ended', question: 'How would you handle a disagreement with a teammate about how to complete a task?' },
      { id: 3, type: 'Open-Ended', question: 'What would you do if a teammate strongly disagreed with your idea?' },
      { id: 4, type: 'Open-Ended', question: 'Tell me about a time when you had to resolve a conflict.' },
      { id: 5, type: 'Open-Ended', question: 'How would you handle a misunderstanding between you and a teammate?' },
      { id: 6, type: 'Open-Ended', question: 'What would you do if two members of your team were having a conflict that affected the project?' },
      { id: 7, type: 'Open-Ended', question: 'How do you respond when someone criticizes your work?' },
      { id: 8, type: 'Open-Ended', question: 'What would you do if you believed your manager\'s decision was not the best approach?' },
      { id: 9, type: 'Open-Ended', question: 'Tell me about a time when you had to compromise to reach an agreement.' },
      { id: 10, type: 'Open-Ended', question: 'What steps would you take to prevent a disagreement from becoming a serious conflict?' }
    ],
    'STAR Method': [
      { id: 1, type: 'Open-Ended', question: 'Tell me about a time when you faced a challenging problem and how you solved it.' },
      { id: 2, type: 'Open-Ended', question: 'Tell me about a time when you had to meet a difficult deadline.' },
      { id: 3, type: 'Open-Ended', question: 'Tell me about a time when you made a mistake and what you learned from it.' },
      { id: 4, type: 'Open-Ended', question: 'Tell me about a time when you took initiative without being asked.' },
      { id: 5, type: 'Open-Ended', question: 'Tell me about a time when you worked successfully as part of a team.' },
      { id: 6, type: 'Open-Ended', question: 'Tell me about a time when you faced a disagreement with someone and how you handled it.' },
      { id: 7, type: 'Open-Ended', question: 'Tell me about a time when you had to learn something new in a short amount of time.' },
      { id: 8, type: 'Open-Ended', question: 'Tell me about a time when you failed at something and how you responded.' },
      { id: 9, type: 'Open-Ended', question: 'Tell me about a time when you helped someone solve a problem.' },
      { id: 10, type: 'Open-Ended', question: 'Tell me about an accomplishment that you are proud of and explain how you achieved it.' }
    ],
    'Career/Motivation Questions': [
      { id: 1, type: 'Open-Ended', question: 'Why are you interested in this internship?' },
      { id: 2, type: 'Open-Ended', question: 'Why did you choose your current field of study?' },
      { id: 3, type: 'Open-Ended', question: 'What are your short-term career goals?' },
      { id: 4, type: 'Open-Ended', question: 'Where do you see yourself in the next three years?' },
      { id: 5, type: 'Open-Ended', question: 'What skills do you hope to develop during this internship?' },
      { id: 6, type: 'Open-Ended', question: 'Why are you interested in this particular role?' },
      { id: 7, type: 'Open-Ended', question: 'What motivates you to learn new technologies?' },
      { id: 8, type: 'Open-Ended', question: 'What type of work environment helps you perform your best?' },
      { id: 9, type: 'Open-Ended', question: 'What are you looking for in your first internship?' },
      { id: 10, type: 'Open-Ended', question: 'What do you hope to achieve during the next year?' }
    ]
  },
  'Role-Specific': {
    'Frontend Developer': {
      'HTML/CSS': [
        { id: 1, type: 'MCQ', question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Markup Language', 'Hyper Transfer Markup Logic', 'Home Tool Markup Language'], answer: 'Hyper Text Markup Language' },
        { id: 2, type: 'MCQ', question: 'Which HTML element is used to create a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], answer: '<a>' },
        { id: 3, type: 'MCQ', question: 'Which CSS property is used to change the text color?', options: ['font-color', 'text-color', 'color', 'background-color'], answer: 'color' },
        { id: 4, type: 'Short Answer', question: 'What is semantic HTML?' },
        { id: 5, type: 'Short Answer', question: 'What is the CSS box model?' },
        { id: 6, type: 'Short Answer', question: 'What is the difference between id and class in HTML?' },
        { id: 7, type: 'Short Answer', question: 'What is CSS specificity?' },
        { id: 8, type: 'Short Answer', question: 'What is the difference between inline, internal, and external CSS?' },
        { id: 9, type: 'Open-Ended', question: 'How would you structure the HTML and CSS for a responsive navigation bar?' },
        { id: 10, type: 'Open-Ended', question: 'How would you improve the accessibility of a webpage using HTML and CSS?' }
      ],
      'JavaScript': [
        { id: 1, type: 'MCQ', question: 'Which keyword declares a block-scoped variable that cannot be reassigned?', options: ['var', 'let', 'const', 'static'], answer: 'const' },
        { id: 2, type: 'MCQ', question: 'What does the === operator check?', options: ['Value only', 'Type only', 'Both value and type', 'Reference identity only'], answer: 'Both value and type' },
        { id: 3, type: 'MCQ', question: 'Which array method creates a new array by transforming each element?', options: ['forEach()', 'map()', 'filter()', 'reduce()'], answer: 'map()' },
        { id: 4, type: 'Short Answer', question: 'What is the difference between let, const, and var?' },
        { id: 5, type: 'Short Answer', question: 'What is a callback function?' },
        { id: 6, type: 'Short Answer', question: 'What is a Promise in JavaScript?' },
        { id: 7, type: 'Short Answer', question: 'What is event bubbling?' },
        { id: 8, type: 'Short Answer', question: 'What is the difference between synchronous and asynchronous JavaScript?' },
        { id: 9, type: 'Open-Ended', question: 'How would you handle an API request in JavaScript?' },
        { id: 10, type: 'Open-Ended', question: 'Explain how you would debug a JavaScript function that is not producing the expected result.' }
      ],
      'React': [
        { id: 1, type: 'MCQ', question: 'What is React primarily used for?', options: ['Database Management', 'Building User Interfaces', 'Server Configuration', 'CSS Preprocessing'], answer: 'Building User Interfaces' },
        { id: 2, type: 'MCQ', question: 'Which Hook is used to manage state in a functional component?', options: ['useEffect', 'useState', 'useReducer', 'useContext'], answer: 'useState' },
        { id: 3, type: 'MCQ', question: 'Which Hook is commonly used to perform side effects?', options: ['useState', 'useMemo', 'useEffect', 'useCallback'], answer: 'useEffect' },
        { id: 4, type: 'Short Answer', question: 'What is a React component?' },
        { id: 5, type: 'Short Answer', question: 'What are props in React?' },
        { id: 6, type: 'Short Answer', question: 'What is state in React?' },
        { id: 7, type: 'Short Answer', question: 'What is the purpose of useState()?' },
        { id: 8, type: 'Short Answer', question: 'What is the purpose of useEffect()?' },
        { id: 9, type: 'Open-Ended', question: 'How would you manage a form with multiple input fields in React?' },
        { id: 10, type: 'Open-Ended', question: 'How would you structure a React application to make its components reusable?' }
      ],
      'Web APIs': [
        { id: 1, type: 'MCQ', question: 'What does API stand for?', options: ['Application Programming Interface', 'Automated Program Integration', 'Applied Process Interface', 'Application Protocol Instruction'], answer: 'Application Programming Interface' },
        { id: 2, type: 'MCQ', question: 'Which HTTP method is commonly used to retrieve data?', options: ['POST', 'GET', 'PUT', 'DELETE'], answer: 'GET' },
        { id: 3, type: 'MCQ', question: 'Which HTTP status code indicates that a resource was not found?', options: ['200', '401', '404', '500'], answer: '404' },
        { id: 4, type: 'Short Answer', question: 'What is a REST API?' },
        { id: 5, type: 'Short Answer', question: 'What is JSON and why is it commonly used with APIs?' },
        { id: 6, type: 'Short Answer', question: 'What is the difference between GET and POST requests?' },
        { id: 7, type: 'Short Answer', question: 'What is an HTTP status code?' },
        { id: 8, type: 'Short Answer', question: 'What is CORS?' },
        { id: 9, type: 'Open-Ended', question: 'How would you fetch data from an API and display it in a React component?' },
        { id: 10, type: 'Open-Ended', question: 'How would you handle loading and error states when consuming an API?' }
      ],
      'Responsive Design': [
        { id: 1, type: 'MCQ', question: 'Which CSS feature is commonly used to create responsive layouts based on screen size?', options: ['CSS Variables', 'Media Queries', 'Flex direction', 'Keyframes'], answer: 'Media Queries' },
        { id: 2, type: 'MCQ', question: 'Which unit is relative to the viewport width?', options: ['vh', 'vw', 'rem', 'em'], answer: 'vw' },
        { id: 3, type: 'MCQ', question: 'Which CSS layout system is designed for one-dimensional layouts?', options: ['CSS Grid', 'Flexbox', 'Table Layout', 'Float Layout'], answer: 'Flexbox' },
        { id: 4, type: 'Short Answer', question: 'What is responsive web design?' },
        { id: 5, type: 'Short Answer', question: 'What are media queries?' },
        { id: 6, type: 'Short Answer', question: 'What is mobile-first design?' },
        { id: 7, type: 'Short Answer', question: 'What is the difference between px, %, em, and rem?' },
        { id: 8, type: 'Short Answer', question: 'What is the purpose of flexible layouts?' },
        { id: 9, type: 'Open-Ended', question: 'How would you make a desktop website responsive for mobile devices?' },
        { id: 10, type: 'Open-Ended', question: 'How would you test whether a website is properly responsive?' }
      ],
      'Git': [
        { id: 1, type: 'MCQ', question: 'Which command initializes a new Git repository?', options: ['git init', 'git start', 'git create', 'git new'], answer: 'git init' },
        { id: 2, type: 'MCQ', question: 'Which command uploads local commits to a remote repository?', options: ['git send', 'git push', 'git upload', 'git commit'], answer: 'git push' },
        { id: 3, type: 'MCQ', question: 'Which command creates a new branch?', options: ['git checkout -b', 'git branch -n', 'git create branch', 'git make branch'], answer: 'git checkout -b' },
        { id: 4, type: 'Short Answer', question: 'What is Git?' },
        { id: 5, type: 'Short Answer', question: 'What is GitHub?' },
        { id: 6, type: 'Short Answer', question: 'What is a Git commit?' },
        { id: 7, type: 'Short Answer', question: 'What is a Git branch?' },
        { id: 8, type: 'Short Answer', question: 'What is the difference between git pull and git fetch?' },
        { id: 9, type: 'Open-Ended', question: 'Explain the Git workflow you would follow when developing a new frontend feature.' },
        { id: 10, type: 'Open-Ended', question: 'How would you resolve a merge conflict in a team project?' }
      ]
    },
    'Backend Developer': {
      'Node.js': [
        { id: 1, type: 'MCQ', question: 'What is Node.js?', options: ['A frontend framework', 'A JavaScript runtime environment', 'A database engine', 'A CSS preprocessor'], answer: 'A JavaScript runtime environment' },
        { id: 2, type: 'MCQ', question: 'Which package manager is commonly used with Node.js?', options: ['pip', 'npm', 'maven', 'composer'], answer: 'npm' },
        { id: 3, type: 'MCQ', question: 'Which module is commonly used to create an HTTP server in Node.js?', options: ['fs', 'http', 'path', 'url'], answer: 'http' },
        { id: 4, type: 'Short Answer', question: 'Why is Node.js commonly used for backend development?' },
        { id: 5, type: 'Short Answer', question: 'What is npm?' },
        { id: 6, type: 'Short Answer', question: 'What is middleware in a Node.js application?' },
        { id: 7, type: 'Short Answer', question: 'What is the Node.js event loop?' },
        { id: 8, type: 'Short Answer', question: 'What is Express.js?' },
        { id: 9, type: 'Open-Ended', question: 'How would you create a basic REST API using Node.js and Express?' },
        { id: 10, type: 'Open-Ended', question: 'How would you structure a Node.js backend project for maintainability?' }
      ],
      'Databases': [
        { id: 1, type: 'MCQ', question: 'Which SQL command is used to retrieve data from a table?', options: ['GET', 'FETCH', 'SELECT', 'EXTRACT'], answer: 'SELECT' },
        { id: 2, type: 'MCQ', question: 'Which key uniquely identifies a record in a table?', options: ['Foreign Key', 'Primary Key', 'Unique Index', 'Secondary Key'], answer: 'Primary Key' },
        { id: 3, type: 'MCQ', question: 'Which SQL clause is used to filter grouped results?', options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'], answer: 'HAVING' },
        { id: 4, type: 'Short Answer', question: 'What is a primary key?' },
        { id: 5, type: 'Short Answer', question: 'What is a foreign key?' },
        { id: 6, type: 'Short Answer', question: 'What is normalization?' },
        { id: 7, type: 'Short Answer', question: 'What is a database JOIN?' },
        { id: 8, type: 'Short Answer', question: 'What is the difference between SQL and NoSQL databases?' },
        { id: 9, type: 'Open-Ended', question: 'How would you design a database for an e-commerce application?' },
        { id: 10, type: 'Open-Ended', question: 'How would you improve the performance of a slow database query?' }
      ],
      'REST APIs': [
        { id: 1, type: 'MCQ', question: 'Which HTTP method is commonly used to create a resource?', options: ['GET', 'POST', 'PUT', 'DELETE'], answer: 'POST' },
        { id: 2, type: 'MCQ', question: 'Which status code usually indicates a successful request?', options: ['200 OK', '301 Moved', '400 Bad Request', '500 Server Error'], answer: '200 OK' },
        { id: 3, type: 'MCQ', question: 'Which HTTP method is commonly used to delete a resource?', options: ['GET', 'POST', 'REMOVE', 'DELETE'], answer: 'DELETE' },
        { id: 4, type: 'Short Answer', question: 'What is REST?' },
        { id: 5, type: 'Short Answer', question: 'What is an endpoint?' },
        { id: 6, type: 'Short Answer', question: 'What is the difference between PUT and PATCH?' },
        { id: 7, type: 'Short Answer', question: 'What are HTTP status codes?' },
        { id: 8, type: 'Short Answer', question: 'What is JSON?' },
        { id: 9, type: 'Open-Ended', question: 'How would you design REST endpoints for a simple online shopping application?' },
        { id: 10, type: 'Open-Ended', question: 'How would you handle errors consistently across a REST API?' }
      ],
      'System Design': [
        { id: 1, type: 'MCQ', question: 'What is scalability?', options: ['System response time', 'Ability to handle increased load', 'Code readability', 'Data encryption speed'], answer: 'Ability to handle increased load' },
        { id: 2, type: 'MCQ', question: 'What is the primary purpose of a load balancer?', options: ['To encrypt requests', 'To distribute traffic across multiple servers', 'To host static assets', 'To manage database indices'], answer: 'To distribute traffic across multiple servers' },
        { id: 3, type: 'MCQ', question: 'What is caching mainly used for?', options: ['Long-term backups', 'Faster data retrieval', 'Data migration', 'Password hashing'], answer: 'Faster data retrieval' },
        { id: 4, type: 'Short Answer', question: 'What is horizontal scaling?' },
        { id: 5, type: 'Short Answer', question: 'What is vertical scaling?' },
        { id: 6, type: 'Short Answer', question: 'What is caching?' },
        { id: 7, type: 'Short Answer', question: 'What is a load balancer?' },
        { id: 8, type: 'Short Answer', question: 'What is database replication?' },
        { id: 9, type: 'Open-Ended', question: 'How would you design a basic URL-shortening service?' },
        { id: 10, type: 'Open-Ended', question: 'How would you design a scalable backend for an interview practice application?' }
      ],
      'Authentication': [
        { id: 1, type: 'MCQ', question: 'Which HTTP status code indicates that authentication is required or has failed?', options: ['200', '401', '404', '500'], answer: '401' },
        { id: 2, type: 'MCQ', question: 'What is JWT commonly used for?', options: ['Stateless authentication', 'Database indexing', 'UI styling', 'File storage'], answer: 'Stateless authentication' },
        { id: 3, type: 'MCQ', question: 'Which method is generally recommended for securely storing passwords?', options: ['Plain text', 'Base64 encoding', 'Salted Hashing (e.g. bcrypt)', 'Symmetric encryption'], answer: 'Salted Hashing (e.g. bcrypt)' },
        { id: 4, type: 'Short Answer', question: 'What is authentication?' },
        { id: 5, type: 'Short Answer', question: 'What is authorization?' },
        { id: 6, type: 'Short Answer', question: 'What is a JWT?' },
        { id: 7, type: 'Short Answer', question: 'Why should passwords never be stored as plain text?' },
        { id: 8, type: 'Short Answer', question: 'What is session-based authentication?' },
        { id: 9, type: 'Open-Ended', question: 'How would you implement user login and registration in a web application?' },
        { id: 10, type: 'Open-Ended', question: 'How would you protect authenticated API endpoints?' }
      ],
      'Git': [
        { id: 1, type: 'MCQ', question: 'Which command downloads changes from a remote repository and merges them into the current branch?', options: ['git fetch', 'git pull', 'git push', 'git merge'], answer: 'git pull' },
        { id: 2, type: 'MCQ', question: 'Which command is used to view the current state of a Git repository?', options: ['git log', 'git status', 'git check', 'git info'], answer: 'git status' },
        { id: 3, type: 'MCQ', question: 'Which command creates a commit?', options: ['git commit -m', 'git make', 'git save', 'git add'], answer: 'git commit -m' },
        { id: 4, type: 'Short Answer', question: 'Why is Git useful for backend development?' },
        { id: 5, type: 'Short Answer', question: 'What is a remote repository?' },
        { id: 6, type: 'Short Answer', question: 'What is branching?' },
        { id: 7, type: 'Short Answer', question: 'What is a merge conflict?' },
        { id: 8, type: 'Short Answer', question: 'What is a .gitignore file?' },
        { id: 9, type: 'Open-Ended', question: 'How would you use Git when multiple developers are working on the same backend project?' },
        { id: 10, type: 'Open-Ended', question: 'How would you handle a merge conflict before pushing your changes?' }
      ]
    },
    'Full Stack Developer': {
      'Frontend': [
        { id: 1, type: 'MCQ', question: 'What is the purpose of HTML?', options: ['To define webpage structure', 'To program database logic', 'To build web APIs', 'To compile frontend code'], answer: 'To define webpage structure' },
        { id: 2, type: 'MCQ', question: 'Which React Hook is used to manage state?', options: ['useEffect', 'useState', 'useContext', 'useRef'], answer: 'useState' },
        { id: 3, type: 'MCQ', question: 'Which CSS layout system is useful for two-dimensional layouts?', options: ['Flexbox', 'CSS Grid', 'Float', 'Positioning'], answer: 'CSS Grid' },
        { id: 4, type: 'Short Answer', question: 'What is responsive design?' },
        { id: 5, type: 'Short Answer', question: 'What are React props?' },
        { id: 6, type: 'Short Answer', question: 'What is state management?' },
        { id: 7, type: 'Short Answer', question: 'What is the DOM?' },
        { id: 8, type: 'Short Answer', question: 'What is component reusability?' },
        { id: 9, type: 'Open-Ended', question: 'How would you structure the frontend of a full-stack application?' },
        { id: 10, type: 'Open-Ended', question: 'How would you optimize the performance of a React application?' }
      ],
      'Backend': [
        { id: 1, type: 'MCQ', question: 'What is the primary purpose of a backend server?', options: ['To manage application logic, data, and business operations', 'To style client layouts', 'To render HTML tags locally', 'To design UI mockups'], answer: 'To manage application logic, data, and business operations' },
        { id: 2, type: 'MCQ', question: 'Which technology can be used to build a JavaScript backend?', options: ['React', 'Node.js', 'Bootstrap', 'Tailwind'], answer: 'Node.js' },
        { id: 3, type: 'MCQ', question: 'Which HTTP method is commonly used to retrieve data?', options: ['GET', 'POST', 'PUT', 'DELETE'], answer: 'GET' },
        { id: 4, type: 'Short Answer', question: 'What is server-side programming?' },
        { id: 5, type: 'Short Answer', question: 'What is middleware?' },
        { id: 6, type: 'Short Answer', question: 'What is an API endpoint?' },
        { id: 7, type: 'Short Answer', question: 'What is request-response communication?' },
        { id: 8, type: 'Short Answer', question: 'What is error handling in a backend application?' },
        { id: 9, type: 'Open-Ended', question: 'How would you connect a React frontend to a backend API?' },
        { id: 10, type: 'Open-Ended', question: 'How would you structure a full-stack application into frontend and backend layers?' }
      ],
      'Databases': [
        { id: 1, type: 'MCQ', question: 'What is the purpose of a primary key?', options: ['Uniquely identifies each record in a table', 'Links two tables together', 'Encrypts row data', 'Formats output text'], answer: 'Uniquely identifies each record in a table' },
        { id: 2, type: 'MCQ', question: 'Which SQL clause filters rows?', options: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'], answer: 'WHERE' },
        { id: 3, type: 'MCQ', question: 'Which operation combines data from multiple tables?', options: ['JOIN', 'MERGE', 'UNION ALL', 'CONNECT'], answer: 'JOIN' },
        { id: 4, type: 'Short Answer', question: 'What is database normalization?' },
        { id: 5, type: 'Short Answer', question: 'What is a foreign key?' },
        { id: 6, type: 'Short Answer', question: 'What is the difference between SQL and NoSQL?' },
        { id: 7, type: 'Short Answer', question: 'What is an index in a database?' },
        { id: 8, type: 'Short Answer', question: 'What is a database transaction?' },
        { id: 9, type: 'Open-Ended', question: 'How would you design a database for an online shopping platform?' },
        { id: 10, type: 'Open-Ended', question: 'How would you decide which data belongs in the database and which should be handled by the application?' }
      ],
      'DevOps': [
        { id: 1, type: 'MCQ', question: 'What does CI stand for in CI/CD?', options: ['Continuous Integration', 'Code Inspection', 'Centralized Infrastructure', 'Continuous Interaction'], answer: 'Continuous Integration' },
        { id: 2, type: 'MCQ', question: 'What is Docker primarily used for?', options: ['Containerization of applications', 'Database modeling', 'Writing frontend code', 'Network routing'], answer: 'Containerization of applications' },
        { id: 3, type: 'MCQ', question: 'What is deployment?', options: ['Making an application accessible to users on a server', 'Writing automated unit tests', 'Creating Git branches', 'Designing database schemas'], answer: 'Making an application accessible to users on a server' },
        { id: 4, type: 'Short Answer', question: 'What is DevOps?' },
        { id: 5, type: 'Short Answer', question: 'What is CI/CD?' },
        { id: 6, type: 'Short Answer', question: 'What is a Docker container?' },
        { id: 7, type: 'Short Answer', question: 'What is environment configuration?' },
        { id: 8, type: 'Short Answer', question: 'Why are environment variables used?' },
        { id: 9, type: 'Open-Ended', question: 'Describe how you would deploy a full-stack web application.' },
        { id: 10, type: 'Open-Ended', question: 'How would you create a simple CI/CD workflow for a web application?' }
      ],
      'System Design': [
        { id: 1, type: 'MCQ', question: 'What is scalability?', options: ['System adaptability to higher traffic loads', 'Database query speed', 'UI load speed', 'Repository size'], answer: 'System adaptability to higher traffic loads' },
        { id: 2, type: 'MCQ', question: 'What is the purpose of a load balancer?', options: ['Distributes incoming web traffic across server nodes', 'Compiles React components', 'Caches static files', 'Validates passwords'], answer: 'Distributes incoming web traffic across server nodes' },
        { id: 3, type: 'MCQ', question: 'What is caching used for?', options: ['Temporarily storing data for rapid retrieval', 'Encrypting databases', 'Managing source control', 'Minifying JavaScript'], answer: 'Temporarily storing data for rapid retrieval' },
        { id: 4, type: 'Short Answer', question: 'What is horizontal scaling?' },
        { id: 5, type: 'Short Answer', question: 'What is an API gateway?' },
        { id: 6, type: 'Short Answer', question: 'What is caching?' },
        { id: 7, type: 'Short Answer', question: 'What is database replication?' },
        { id: 8, type: 'Short Answer', question: 'What is a bottleneck in a system?' },
        { id: 9, type: 'Open-Ended', question: 'How would you design a simple online interview platform?' },
        { id: 10, type: 'Open-Ended', question: 'How would you design a system that supports a large number of users taking interviews simultaneously?' }
      ],
      'Git': [
        { id: 1, type: 'MCQ', question: 'Which command creates a new Git repository?', options: ['git init', 'git start', 'git create', 'git make'], answer: 'git init' },
        { id: 2, type: 'MCQ', question: 'Which command sends local commits to a remote repository?', options: ['git push', 'git send', 'git upload', 'git export'], answer: 'git push' },
        { id: 3, type: 'MCQ', question: 'Which command creates a new branch?', options: ['git branch', 'git checkout -b', 'git create', 'git new-branch'], answer: 'git checkout -b' },
        { id: 4, type: 'Short Answer', question: 'What is Git?' },
        { id: 5, type: 'Short Answer', question: 'What is a branch?' },
        { id: 6, type: 'Short Answer', question: 'What is a commit?' },
        { id: 7, type: 'Short Answer', question: 'What is a merge conflict?' },
        { id: 8, type: 'Short Answer', question: 'What is .gitignore used for?' },
        { id: 9, type: 'Open-Ended', question: 'Explain how you would manage frontend and backend code using Git.' },
        { id: 10, type: 'Open-Ended', question: 'How would you organize Git branches when working with a team?' }
      ]
    },
    'Data Analyst': {
      'SQL': [
        { id: 1, type: 'MCQ', question: 'Which SQL command is used to retrieve data?', options: ['SELECT', 'GET', 'FETCH', 'PULL'], answer: 'SELECT' },
        { id: 2, type: 'MCQ', question: 'Which clause is used to group rows with the same values?', options: ['GROUP BY', 'ORDER BY', 'CLUSTER BY', 'PARTITION BY'], answer: 'GROUP BY' },
        { id: 3, type: 'MCQ', question: 'Which clause filters grouped results?', options: ['HAVING', 'WHERE', 'FILTER', 'LIMIT'], answer: 'HAVING' },
        { id: 4, type: 'Short Answer', question: 'What is a primary key?' },
        { id: 5, type: 'Short Answer', question: 'What is a JOIN?' },
        { id: 6, type: 'Short Answer', question: 'What is the difference between WHERE and HAVING?' },
        { id: 7, type: 'Short Answer', question: 'What is a subquery?' },
        { id: 8, type: 'Short Answer', question: 'What is the difference between COUNT() and SUM()?' },
        { id: 9, type: 'Open-Ended', question: 'How would you find the top five highest-selling products using SQL?' },
        { id: 10, type: 'Open-Ended', question: 'How would you investigate a query that is taking too long to execute?' }
      ],
      'Python': [
        { id: 1, type: 'MCQ', question: 'Which data type stores key-value pairs in Python?', options: ['dict', 'list', 'tuple', 'set'], answer: 'dict' },
        { id: 2, type: 'MCQ', question: 'Which keyword is used to define a function in Python?', options: ['def', 'func', 'function', 'define'], answer: 'def' },
        { id: 3, type: 'MCQ', question: 'Which library is commonly used for data analysis in Python?', options: ['Pandas', 'Flask', 'Django', 'PyGame'], answer: 'Pandas' },
        { id: 4, type: 'Short Answer', question: 'What is the difference between a list and a tuple?' },
        { id: 5, type: 'Short Answer', question: 'What is a dictionary in Python?' },
        { id: 6, type: 'Short Answer', question: 'What is a function?' },
        { id: 7, type: 'Short Answer', question: 'What is exception handling?' },
        { id: 8, type: 'Short Answer', question: 'Why is Python commonly used for data analysis?' },
        { id: 9, type: 'Open-Ended', question: 'How would you use Python to analyze a dataset?' },
        { id: 10, type: 'Open-Ended', question: 'How would you handle missing or incorrect values in a dataset using Python?' }
      ],
      'Pandas': [
        { id: 1, type: 'MCQ', question: 'What is Pandas primarily used for?', options: ['Data manipulation and analysis', 'Web development', 'Game graphics', 'System administration'], answer: 'Data manipulation and analysis' },
        { id: 2, type: 'MCQ', question: 'Which Pandas object represents a two-dimensional table?', options: ['DataFrame', 'Series', 'Panel', 'Matrix'], answer: 'DataFrame' },
        { id: 3, type: 'MCQ', question: 'Which function can be used to read a CSV file?', options: ['read_csv()', 'open_csv()', 'load_csv()', 'parse_csv()'], answer: 'read_csv()' },
        { id: 4, type: 'Short Answer', question: 'What is a DataFrame?' },
        { id: 5, type: 'Short Answer', question: 'What is a Series in Pandas?' },
        { id: 6, type: 'Short Answer', question: 'How do you check for missing values in a DataFrame?' },
        { id: 7, type: 'Short Answer', question: 'What does dropna() do?' },
        { id: 8, type: 'Short Answer', question: 'What does groupby() do in Pandas?' },
        { id: 9, type: 'Open-Ended', question: 'How would you clean a dataset containing missing values and duplicate records using Pandas?' },
        { id: 10, type: 'Open-Ended', question: 'How would you use Pandas to find trends in a large dataset?' }
      ],
      'Statistics': [
        { id: 1, type: 'MCQ', question: 'Which measure represents the middle value of an ordered dataset?', options: ['Median', 'Mean', 'Mode', 'Variance'], answer: 'Median' },
        { id: 2, type: 'MCQ', question: 'Which measure is most affected by extreme values?', options: ['Mean', 'Median', 'Mode', 'IQR'], answer: 'Mean' },
        { id: 3, type: 'MCQ', question: 'What does standard deviation measure?', options: ['Data dispersion or spread around the mean', 'Central location', 'Total sum', 'Maximum value'], answer: 'Data dispersion or spread around the mean' },
        { id: 4, type: 'Short Answer', question: 'What is mean?' },
        { id: 5, type: 'Short Answer', question: 'What is median?' },
        { id: 6, type: 'Short Answer', question: 'What is mode?' },
        { id: 7, type: 'Short Answer', question: 'What is standard deviation?' },
        { id: 8, type: 'Short Answer', question: 'What is correlation?' },
        { id: 9, type: 'Open-Ended', question: 'How would you explain the difference between correlation and causation?' },
        { id: 10, type: 'Open-Ended', question: 'How would you identify and handle an outlier in a dataset?' }
      ],
      'Data Visualization': [
        { id: 1, type: 'MCQ', question: 'Which chart is commonly used to show trends over time?', options: ['Line Chart', 'Pie Chart', 'Bar Chart', 'Scatter Plot'], answer: 'Line Chart' },
        { id: 2, type: 'MCQ', question: 'Which chart is commonly used to compare categories?', options: ['Bar Chart', 'Line Chart', 'Histogram', 'Boxplot'], answer: 'Bar Chart' },
        { id: 3, type: 'MCQ', question: 'Which chart is useful for showing the distribution of numerical data?', options: ['Histogram', 'Pie Chart', 'Line Chart', 'Tree Map'], answer: 'Histogram' },
        { id: 4, type: 'Short Answer', question: 'What is data visualization?' },
        { id: 5, type: 'Short Answer', question: 'When would you use a bar chart?' },
        { id: 6, type: 'Short Answer', question: 'When would you use a line chart?' },
        { id: 7, type: 'Short Answer', question: 'What makes a data visualization effective?' },
        { id: 8, type: 'Short Answer', question: 'What is a dashboard?' },
        { id: 9, type: 'Open-Ended', question: 'How would you choose the right chart for a dataset?' },
        { id: 10, type: 'Open-Ended', question: 'How would you present a complex data analysis to a non-technical audience?' }
      ],
      'Excel': [
        { id: 1, type: 'MCQ', question: 'Which Excel function calculates the average of a range?', options: ['AVERAGE()', 'MEAN()', 'AVG()', 'SUM()'], answer: 'AVERAGE()' },
        { id: 2, type: 'MCQ', question: 'Which feature is commonly used to summarize large datasets?', options: ['PivotTable', 'Conditional Formatting', 'Data Validation', 'AutoFill'], answer: 'PivotTable' },
        { id: 3, type: 'MCQ', question: 'Which function counts cells containing numbers?', options: ['COUNT()', 'COUNTA()', 'COUNTIF()', 'SUM()'], answer: 'COUNT()' },
        { id: 4, type: 'Short Answer', question: 'What is a PivotTable?' },
        { id: 5, type: 'Short Answer', question: 'What is conditional formatting?' },
        { id: 6, type: 'Short Answer', question: 'What is the difference between relative and absolute cell references?' },
        { id: 7, type: 'Short Answer', question: 'What is VLOOKUP used for?' },
        { id: 8, type: 'Short Answer', question: 'How can you remove duplicate values in Excel?' },
        { id: 9, type: 'Open-Ended', question: 'How would you clean and prepare a large Excel dataset for analysis?' },
        { id: 10, type: 'Open-Ended', question: 'How would you create an Excel dashboard to present business performance?' }
      ]
    },
    'Software Developer': {
      'Programming': [
        { id: 1, type: 'MCQ', question: 'What is a variable used for?', options: ['Storing data values', 'Compiling source code', 'Measuring execution speed', 'Styling UI elements'], answer: 'Storing data values' },
        { id: 2, type: 'MCQ', question: 'Which data structure follows the LIFO principle?', options: ['Stack', 'Queue', 'Array', 'Linked List'], answer: 'Stack' },
        { id: 3, type: 'MCQ', question: 'What is the purpose of a function?', options: ['To encapsulate reusable blocks of code', 'To create database connections', 'To speed up network requests', 'To format terminal outputs'], answer: 'To encapsulate reusable blocks of code' },
        { id: 4, type: 'Short Answer', question: 'What is a programming language?' },
        { id: 5, type: 'Short Answer', question: 'What is a variable?' },
        { id: 6, type: 'Short Answer', question: 'What is a function?' },
        { id: 7, type: 'Short Answer', question: 'What is recursion?' },
        { id: 8, type: 'Short Answer', question: 'What is exception handling?' },
        { id: 9, type: 'Open-Ended', question: 'How would you approach solving a programming problem you have never seen before?' },
        { id: 10, type: 'Open-Ended', question: 'How would you debug a program that produces incorrect output?' }
      ],
      'DSA': [
        { id: 1, type: 'MCQ', question: 'Which data structure follows FIFO?', options: ['Queue', 'Stack', 'Tree', 'Graph'], answer: 'Queue' },
        { id: 2, type: 'MCQ', question: 'Which data structure follows LIFO?', options: ['Stack', 'Queue', 'Array', 'Heap'], answer: 'Stack' },
        { id: 3, type: 'MCQ', question: 'What is the average time complexity of binary search?', options: ['O(log n)', 'O(1)', 'O(n)', 'O(n log n)'], answer: 'O(log n)' },
        { id: 4, type: 'Short Answer', question: 'What is an array?' },
        { id: 5, type: 'Short Answer', question: 'What is a linked list?' },
        { id: 6, type: 'Short Answer', question: 'What is a stack?' },
        { id: 7, type: 'Short Answer', question: 'What is a queue?' },
        { id: 8, type: 'Short Answer', question: 'What is time complexity?' },
        { id: 9, type: 'Open-Ended', question: 'How would you choose an appropriate data structure for a programming problem?' },
        { id: 10, type: 'Open-Ended', question: 'Explain how you would find duplicate elements in an array efficiently.' }
      ],
      'OOP': [
        { id: 1, type: 'MCQ', question: 'Which OOP concept hides internal implementation details?', options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'], answer: 'Encapsulation' },
        { id: 2, type: 'MCQ', question: 'Which OOP concept allows a class to inherit properties from another class?', options: ['Inheritance', 'Encapsulation', 'Abstraction', 'Overloading'], answer: 'Inheritance' },
        { id: 3, type: 'MCQ', question: 'What is an object?', options: ['An instance of a class', 'A function declaration', 'A data type definition', 'A memory pointer'], answer: 'An instance of a class' },
        { id: 4, type: 'Short Answer', question: 'What is Object-Oriented Programming?' },
        { id: 5, type: 'Short Answer', question: 'What is a class?' },
        { id: 6, type: 'Short Answer', question: 'What is an object?' },
        { id: 7, type: 'Short Answer', question: 'What is inheritance?' },
        { id: 8, type: 'Short Answer', question: 'What is polymorphism?' },
        { id: 9, type: 'Open-Ended', question: 'Explain how you would use OOP concepts when designing a real-world application.' },
        { id: 10, type: 'Open-Ended', question: 'Explain the difference between inheritance and composition and when you might use each.' }
      ],
      'Databases': [
        { id: 1, type: 'MCQ', question: 'Which key uniquely identifies a record?', options: ['Primary Key', 'Foreign Key', 'Secondary Key', 'Candidate Key'], answer: 'Primary Key' },
        { id: 2, type: 'MCQ', question: 'Which SQL command retrieves data?', options: ['SELECT', 'GET', 'FETCH', 'EXTRACT'], answer: 'SELECT' },
        { id: 3, type: 'MCQ', question: 'Which operation combines rows from multiple tables?', options: ['JOIN', 'MERGE', 'UNION', 'COMBINE'], answer: 'JOIN' },
        { id: 4, type: 'Short Answer', question: 'What is a database?' },
        { id: 5, type: 'Short Answer', question: 'What is a primary key?' },
        { id: 6, type: 'Short Answer', question: 'What is a foreign key?' },
        { id: 7, type: 'Short Answer', question: 'What is normalization?' },
        { id: 8, type: 'Short Answer', question: 'What is a database transaction?' },
        { id: 9, type: 'Open-Ended', question: 'How would you design a database for a student management system?' },
        { id: 10, type: 'Open-Ended', question: 'How would you maintain data consistency in a database-driven application?' }
      ],
      'Testing': [
        { id: 1, type: 'MCQ', question: 'What is the main purpose of software testing?', options: ['To verify software quality and detect defects', 'To rewrite code faster', 'To design modern user interfaces', 'To configure database instances'], answer: 'To verify software quality and detect defects' },
        { id: 2, type: 'MCQ', question: 'Which type of testing checks individual units of code?', options: ['Unit Testing', 'System Testing', 'Integration Testing', 'User Acceptance Testing'], answer: 'Unit Testing' },
        { id: 3, type: 'MCQ', question: 'Which testing checks whether different components work together correctly?', options: ['Integration Testing', 'Unit Testing', 'Stress Testing', 'Smoke Testing'], answer: 'Integration Testing' },
        { id: 4, type: 'Short Answer', question: 'What is unit testing?' },
        { id: 5, type: 'Short Answer', question: 'What is integration testing?' },
        { id: 6, type: 'Short Answer', question: 'What is regression testing?' },
        { id: 7, type: 'Short Answer', question: 'What is a test case?' },
        { id: 8, type: 'Short Answer', question: 'What is the difference between functional and non-functional testing?' },
        { id: 9, type: 'Open-Ended', question: 'How would you test a login feature in a web application?' },
        { id: 10, type: 'Open-Ended', question: 'How would you decide which parts of an application should be tested first?' }
      ],
      'Git': [
        { id: 1, type: 'MCQ', question: 'Which command initializes a Git repository?', options: ['git init', 'git create', 'git start', 'git new'], answer: 'git init' },
        { id: 2, type: 'MCQ', question: 'Which command uploads commits to a remote repository?', options: ['git push', 'git send', 'git commit', 'git publish'], answer: 'git push' },
        { id: 3, type: 'MCQ', question: 'Which command creates a new branch?', options: ['git checkout -b', 'git make-branch', 'git create', 'git branch -n'], answer: 'git checkout -b' },
        { id: 4, type: 'Short Answer', question: 'What is Git?' },
        { id: 5, type: 'Short Answer', question: 'What is a commit?' },
        { id: 6, type: 'Short Answer', question: 'What is a branch?' },
        { id: 7, type: 'Short Answer', question: 'What is a merge conflict?' },
        { id: 8, type: 'Short Answer', question: 'What is .gitignore used for?' },
        { id: 9, type: 'Open-Ended', question: 'Explain how you would use Git to manage a software project from development to completion.' },
        { id: 10, type: 'Open-Ended', question: 'How would you collaborate with other developers using Git and GitHub?' }
      ]
    }
  }
};