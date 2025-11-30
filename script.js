document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    loadTasks();

    // Add task when button is clicked
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if(taskText) addTask(taskText);
        taskInput.value = '';
    });

    // Add task on pressing Enter
    taskInput.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if(taskText) addTask(taskText);
            taskInput.value = '';
        }
    });

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false));
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', () => {
            li.remove();
            updateLocalStorage();
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage
        if(save) updateLocalStorage();
    }

    // Function to update Local Storage
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push(li.firstChild.textContent); // exclude remove button text
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
