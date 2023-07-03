// Retrieve tasks from local storage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
  
  // Save tasks to local storage
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Render tasks on the webpage
  function renderTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';
  
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.title}</span>
        <span>${task.description}</span>
        <button class="delete-btn">Delete</button>
      `;
  
      const checkbox = li.querySelector('input[type="checkbox"]');
      const deleteBtn = li.querySelector('.delete-btn');
  
      checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks(tasks);
      });
  
      deleteBtn.addEventListener('click', () => {
        const index = tasks.indexOf(task);
        if (index !== -1) {
          tasks.splice(index, 1);
          saveTasks(tasks);
          renderTasks();
        }
      });
  
      taskList.appendChild(li);
    });
  }
  
  // Add a new task
  function addTask(event) {
    event.preventDefault();
  
    const titleInput = document.getElementById('task-title');
    const descriptionInput = document.getElementById('task-description');
    
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
  
    if (title === '' || description === '') {
      alert('Please enter both task title and description.');
      return;
    }
  
    const tasks = getTasks();
    tasks.push({ title, description, completed: false });
    saveTasks(tasks);
    renderTasks();
  
    titleInput.value = '';
    descriptionInput.value = '';
  }
  
  // Attach event listener to the form
  const taskForm = document.getElementById('task-form');
  taskForm.addEventListener('submit', addTask);
  
  // Initial rendering of tasks
  renderTasks();