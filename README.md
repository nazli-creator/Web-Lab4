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

- **Updating state without mutating it:** `TaskManager` is not allowed to change the original `tasks` array, so `push` and `splice` were not an option. I used the spread operator, `.filter()` and `.map()` to build a new array and assign it to `this.tasks`. `toggle()` works the same way: it returns a new `Task` instead of changing `completed`, and `toggleTask` uses `.map()` to swap only the matching task.
- **Making `id` read-only:** I used `Object.defineProperty` with `writable: false`. Assigning to `task.id` afterwards does not change it, and it fails silently because normal scripts are not in strict mode (in strict mode it would throw a `TypeError`).
- **Waiting for the async data:** The tasks only exist after the 1500ms delay, so creating `Task` instances, storing them and rendering all happen after `await fetchTasks()`. Everything is wrapped in `try/catch` so a failure shows an error message in `statusMessage`.
- **The JSON round trip:** After `JSON.stringify` and `JSON.parse` I only get plain objects back, not `Task` instances, so `toggle()` does not exist on them. I had to map each object into `new Task(...)` before storing it in `TaskManager`.
- **Building the DOM without inline HTML:** Each task is created with `createElement` and `appendChild`, and the click events are added with `addEventListener`. After every toggle or delete I clear the list with `textContent = ""` and render it again from `TaskManager`.
