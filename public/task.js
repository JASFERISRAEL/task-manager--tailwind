document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is loaded and running'); // Debug log
    let tasks = [];

    // Select elements
    const taskInput = document.querySelector('#taskInput');
    const addTaskButton = document.querySelector('#addTask');
    const showCompletedButton = document.querySelector('#showCompleted');
    const showIncompleteButton = document.querySelector('#showIncomplete');
    const taskList = document.querySelector('#taskList');

    // Function to display tasks
    function displayTasks(taskArray) {
        taskList.innerHTML = ''; // Clear current tasks
        taskArray.forEach((task) => {
            const taskDiv = document.createElement('div');
            taskDiv.className = `task  flex items-center justify-between p-2 border-2 rounded-lg  mb-2 w-1/2 ${task.completed ? 'completed' : ''}`;
            taskDiv.innerHTML = `<span>${task.description}</span>`;
            
            const taskButton = document.createElement('button');
            taskButton.textContent = task.completed ? 'Undo' : 'Complete';
            taskButton.className = 'button-common'
            taskButton.addEventListener('click', () => toggleComplete(task.id));
            taskDiv.appendChild(taskButton);

            taskList.appendChild(taskDiv);
        });
    }

    // Add a new task
    addTaskButton.addEventListener('click', () => {
        const taskDescription = taskInput.value.trim();

        if (taskDescription && taskDescription.length <= 50) {
            const task = {
                id: Date.now().toString(),
                description: taskDescription,
                completed: false,
            };
            tasks.push(task);
            taskInput.value = '';
            displayTasks(tasks);
        } else {
            alert('Task must be non-empty and less than 50 characters!');
        }
    });

    // Filter completed tasks
    showCompletedButton.addEventListener('click', () => {
        const completedTasks = tasks.filter((task) => task.completed);
        displayTasks(completedTasks);
    });

    // Filter incomplete tasks
    showIncompleteButton.addEventListener('click', () => {
        const incompleteTasks = tasks.filter((task) => !task.completed);
        displayTasks(incompleteTasks);
    });

    // Toggle task completion
    function toggleComplete(taskId) {
        tasks.forEach((task) => {
            if (task.id === taskId) {
                task.completed = !task.completed;
            }
        });
        displayTasks(tasks);
    }
});
