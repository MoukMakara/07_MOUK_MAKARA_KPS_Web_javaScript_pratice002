document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskTable = document.getElementById("taskTable");
  let tasks = [];

  // Validate form
  const validateForm = () => {
    const taskName = document.getElementById("task_name").value.trim();
    const dueDate = new Date(document.getElementById("due_date").value);
    const priority = document.getElementById("priority").value;
    const today = new Date().setHours(0, 0, 0, 0);
    const validName = /^[A-Za-z0-9\s]+$/.test(taskName);
    const validDate = !isNaN(dueDate.getTime()) && dueDate >= today;

    console.log("taskname: ", taskName);
    console.log("dueDate: ", dueDate);
    console.log("priority: ", priority);
    console.log("validateName: ", validName);
    console.log("validateDate: ", validDate);

    // dateError
    const dateError = document.getElementById("dateError");

    console.log("Form validation:", { validName, validDate, priority });

    // show or hide dateError
    if (!validDate) {
      dateError.style.display = "block";
    } else {
      dateError.style.display = "none";
    }

    return validName && validDate && priority;
  };

  // Add object task to array
  const addTask = (e) => {
    e.preventDefault();
    console.log("Form submit triggered.");

    if (!validateForm()) {
      console.log("Form validation failed.");
      return;
    }

    const task = {
      name: document.getElementById("task_name").value.trim(),
      dueDate: document.getElementById("due_date").value,
      priority: document.getElementById("priority").value,
      status: "Pending",
    };

    console.log("Task added:", task);
    tasks.push(task);
    updateTable();
    taskForm.reset();
  };

  // Update task table
  const updateTable = () => {
    console.log("Updating table...");
    taskTable.innerHTML = "";
    tasks.forEach((task, index) => {
      console.log("Creating row for task:", task);
      const row = document.createElement("tr");

      row.innerHTML = `
        <td class="px-6 py-3">${task.name}</td>
        <td class="px-6 py-3">${task.dueDate}</td>
        <td class="px-6 py-3">
          <span class="px-2 py-1 rounded-lg ${
            task.priority === "High"
              ? "bg-red-500 text-white"
              : task.priority === "Medium"
              ? "bg-yellow-500 text-white"
              : "bg-green-500 text-white"
          }">
            ${task.priority}
          </span>
        </td>
        <td class="px-6 py-3">
          <button class="px-3 py-1 text-white rounded-lg ${
            task.status === "Pending" ? "bg-yellow-400" : "bg-green-700"
          }" 
            onclick="toggleStatus(${index})">${task.status}</button>
        </td>
      `;

      taskTable.appendChild(row);
    });
  };

  // Toggle task status
  window.toggleStatus = (index) => {
    console.log(`Toggling status for task ${index}:`, tasks[index]);
    tasks[index].status =
      tasks[index].status === "Pending" ? "Completed" : "Pending";
    updateTable();
  };

  taskForm.addEventListener("submit", addTask);
});
