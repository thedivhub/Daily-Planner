// Load tasks from localstorage
window.onload = function () { loadtasks(); };

function addtask() {
    const input = document.getElementById("taskinput");
    const tasktext = input.value.trim();

    if (tasktext === "") return;

    const task = {
        Text: tasktext,
        done: false
    };

    const tasks = gettasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    rendertasks();
}

function gettasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadtasks() {
    rendertasks();
}

function toggledone(index) {
    const tasks = gettasks();
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    rendertasks();
}

function deletetask(index) {
    const tasks = gettasks();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    rendertasks();
}

function rendertasks() {
    const tasklist = document.getElementById("tasklist");
    tasklist.innerHTML = "";

      const tasks = gettasks();
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.done ? "done" : "";
        li.innerHTML = `
            <span onclick="toggledone(${index})">${task.Text}</span>
            <span class="delete-btn" onclick="deletetask(${index})">✖️</span>
        `;
        tasklist.appendChild(li);
    });
}