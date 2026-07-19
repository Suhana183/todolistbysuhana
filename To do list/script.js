// Elements
const welcomeScreen = document.getElementById("welcomeScreen");
const homeScreen = document.getElementById("homeScreen");
const addScreen = document.getElementById("addScreen");

const startBtn = document.getElementById("startBtn");
const addTaskBtn = document.getElementById("addTaskBtn");
const cancelBtn = document.getElementById("cancelBtn");
const saveTaskBtn = document.getElementById("saveTaskBtn");

const taskContainer = document.getElementById("taskContainer");

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskDate = document.getElementById("taskDate");
const priority = document.getElementById("priority");

// Show today's date
const today = new Date();
document.getElementById("todayDate").innerHTML =
today.toDateString();

// Load tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Welcome -> Home
startBtn.addEventListener("click", () => {
    welcomeScreen.classList.remove("active");
    homeScreen.classList.add("active");
});

// Home -> Add Task
addTaskBtn.addEventListener("click", () => {
    homeScreen.classList.remove("active");
    addScreen.classList.add("active");
});

// Cancel -> Home
cancelBtn.addEventListener("click", () => {
    addScreen.classList.remove("active");
    homeScreen.classList.add("active");
});

// Save Task
saveTaskBtn.addEventListener("click", () => {

    if (taskTitle.value.trim() === "") {
        alert("Please enter task title");
        return;
    }

    const task = {
        title: taskTitle.value,
        description: taskDescription.value,
        date: taskDate.value,
        priority: priority.value,
        completed: false
    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskTitle.value = "";
    taskDescription.value = "";
    taskDate.value = "";
    priority.value = "High";

    displayTasks();

    addScreen.classList.remove("active");
    homeScreen.classList.add("active");
});

// Display Tasks
function displayTasks() {

    taskContainer.innerHTML = "";

    tasks.forEach((task, index) => {

        let color = "";

        if(task.priority === "High"){
            color = "high";
        }
        else if(task.priority === "Medium"){
            color = "medium";
        }
        else{
            color = "low";
        }

        const div = document.createElement("div");

        div.className = "task";

        div.innerHTML = `
            <h3 style="${task.completed ? 'text-decoration:line-through;color:gray;' : ''}">
                ${task.title}
            </h3>

            <p>${task.description}</p>

            <p>${task.date}</p>

            <span class="priority ${color}">
                ${task.priority}
            </span>

            <br><br>

            <button onclick="completeTask(${index})">
                ${task.completed ? "Completed" : "Complete"}
            </button>

            <button onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskContainer.appendChild(div);

    });

}

// Complete Task
function completeTask(index){

    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

}

// Delete Task
function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        localStorage.setItem("tasks",JSON.stringify(tasks));

        displayTasks();

    }

}

// Initial Load
displayTasks();