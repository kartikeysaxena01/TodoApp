let tasks = [];
let editingIndex = null;

// Load tasks from localStorage
const loadTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTaskList();
    }
}

// Save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add or update task
const addTask = () => {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Enter a valid task");
        return;
    }

    if (editingIndex !== null) {
        // Update existing task
        tasks[editingIndex].text = taskText;
        editingIndex = null;
        document.getElementById("addTask").innerHTML = `<i class="ri-add-line"></i>`;
    } else {
        // Add new task
        tasks.push({ text: taskText, complete: false });
        alert("New task added");
    }

    taskInput.value = "";
    saveTasks();
    updateTaskList();
};

// Edit task
const editTask = (index) => {
    const taskInput = document.getElementById("task");
    taskInput.value = tasks[index].text;
    taskInput.focus();
    editingIndex = index;
    document.getElementById("addTask").textContent = "Update";
};

// Toggle complete task
const toggleTaskComplete = (index) => {
    tasks[index].complete = !tasks[index].complete;
    updateTaskList();
    progressBar();
    saveTasks();

    // Animate completed text
    gsap.from(".completed p", {
        opacity: 0,
        x: -10,
        duration: 0.4,
    });
};

// Delete task
const deleteTask = (index) => {
    const taskItems = document.querySelectorAll(".taskItem");

    gsap.to(taskItems[index], {
        opacity: 0,
        x: 60,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
            tasks.splice(index, 1);
            updateTaskList();
            progressBar();
            saveTasks();
        }
    });
};

// Progress bar update
const progressBar = () => {
    const completeTask = tasks.filter(task => task.complete).length;
    const TotalTask = tasks.length;
    const progressPercent = TotalTask === 0 ? 0 : (completeTask / TotalTask) * 100;

    const progress = document.getElementById("progress");
    gsap.to(progress, {
        width: `${progressPercent}%`,
        duration: 0.4,
        ease: "power2.out"
    });

    const progressNumber = document.getElementById("numbers");
    progressNumber.innerText = `${completeTask}/${TotalTask}`;
};

// Update task list in DOM
const updateTaskList = () => {
    const taskList = document.getElementById("task_list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listitem = document.createElement("li");
        listitem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.complete ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.complete ? "checked" : ""}/>
                    <p>${task.text}</p>
                </div>
                <div class="icon">
                    <i class="ri-edit-2-line" onClick="editTask(${index})"></i>
                    <i class="ri-delete-bin-line" onClick="deleteTask(${index})"></i>
                </div>
            </div>
        `;
        listitem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listitem);

        // Animate task item
        gsap.from(listitem, {
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    progressBar();
};

// Add task button click
document.getElementById("addTask").addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});

// Load tasks on page load
loadTasks();

// Animate H1 text
function breaktext() {
    let h1 = document.querySelector("h1");
    let h1Text = h1.textContent;
    let splitTexth1 = h1Text.split("");
    let clutter = "";

    splitTexth1.forEach(function(ele) {
        clutter += `<span>${ele}</span>`;
    });

    h1.innerHTML = clutter;
}
breaktext();

// GSAP animations on page load
gsap.from("h1 span", {
    x: -100,
    delay: 0.3,
    duration: 0.7,
    opacity: 0,
    stagger: 0.03
});
gsap.from(".stats_container", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: "power2.out"
});
gsap.from("form", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.8,
    ease: "power2.out"
});

// Add hover animation on Add/Update button
const addBtn = document.getElementById("addTask");
console.log(addBtn);
addBtn.addEventListener("mouseenter", () => {
    gsap.to(addBtn, { scale: 1.08, duration: 0.2 });
});
addBtn.addEventListener("mouseleave", () => {
    gsap.to(addBtn, { scale: 1, duration: 0.2 });
});



