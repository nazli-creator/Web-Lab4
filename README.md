# Assignment 4 - Task Dashboard

This assignment builds a dynamic task dashboard in vanilla JavaScript. Tasks are fetched from a simulated asynchronous server, modeled with ES6 classes that have immutable IDs and immutable updates, and rendered dynamically to the DOM.

## File Organization

```
lab4/
├── index.html       # DOM structure: heading, loadTasksBtn, statusMessage and empty taskList container
├── styles.css       # Minimal styling, including the line-through style for the completed class
├── taskManager.js   # Task class (read-only id via Object.defineProperty, toggle() returns a new Task) and TaskManager class (immutable setTasks, addTask, removeTask, toggleTask)
├── api.js           # fetchTasks(): returns a Promise that resolves with raw task data after a 1500ms setTimeout
├── main.js          # Entry point: handles Load Tasks click, JSON.stringify/parse, creates Task instances, renders with DOM methods, handles Toggle and Delete
└── README.md        # This file
```

## Challenges I Faced

- **Keeping the state immutable:** `TaskManager` cannot mutate the original `tasks` array, so methods like `push` and `splice` were off the table. I used the spread operator, `.filter()` and `.map()` to build a new array each time and assign it to `this.tasks`.
- **Making `id` read-only:** `Object.defineProperty` with `writable: false` makes assigning to `task.id` fail silently instead of changing it. I also set `enumerable: true` so the `id` still shows up when the object is inspected.
- **Toggling without mutating:** `toggle()` returns a new `Task` with the flipped `completed` value, so `toggleTask` uses `.map()` to replace only the matching task and keep the others unchanged.
- **Waiting for the async data:** The tasks only exist after the 1500ms delay, so everything that depends on them (creating `Task` instances, storing them, rendering) comes after `await fetchTasks()` inside a `try/catch`, so a failure shows an error in `statusMessage`.
- **The JSON round trip:** The raw data goes through `JSON.stringify` and `JSON.parse` before rendering. The parsed result is plain objects, not `Task` instances, so I had to map them into `new Task(...)` to get `toggle()` back.
- **Building the DOM without inline HTML:** Each task is built with `createElement` and `appendChild`, with event listeners attached in JavaScript. After every toggle or delete the list is cleared with `textContent = ""` and re-rendered from `TaskManager`.
