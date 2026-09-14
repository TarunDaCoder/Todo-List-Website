document.addEventListener('DOMContentLoaded', () => {
    // Define elements
    const todoForm = document.querySelector('#todo-form');
    const todoInput = document.querySelector('#todo-input');
    const todoList = document.querySelector('#todo-list');
    const formContainer = document.querySelector('.form-container');
    const listContainer = document.querySelector('.list-container');
    const addButton = document.querySelector('#add-button');
    const clearAllBtn = document.querySelector('#clear-all-btn');

    // ---- State ----
    let tasks = [];
    let nextId = 1;

    // ---- State-changing actions ----
    function addTask(text) {
        if (text.trim() === '') return;
        tasks.push({ id: nextId++, text: text.trim(), completed: false });
        render();
        saveTasks();
        todoList.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    function deleteTask(id, buttonEl) {
        buttonEl.disabled = true;
        buttonEl.classList.add('flash');
        setTimeout(() => {
            tasks = tasks.filter(task => task.id !== id);
            render();
        }, 150);
    }

    function toggleTask(id) {
        const task = tasks.find(t => t.id === id);
        if (task) task.completed = !task.completed;
        render();
        saveTasks();
    }
    
    function saveTasks() {
      localStorage.setItem('todos', JSON.stringify(tasks));
    }

    function loadTasks() {
      const saved = JSON.parse(localStorage.getItem('todos') || '[]');
      tasks = saved;
      nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
      render();
    }

    // ---- Rendering ----
    function render() {
        todoList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('todo-item');
            li.dataset.id = task.id;

            const taskNo = document.createElement('span');
            taskNo.classList.add('task-no');
            taskNo.textContent = `${index + 1}.`;
            if (task.completed) taskNo.classList.add('no-completed');

            const taskText = document.createElement('span');
            taskText.classList.add('task-text');
            taskText.textContent = task.text;
            if (task.completed) taskText.classList.add('completed');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');

            li.appendChild(taskNo);
            li.appendChild(taskText);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });

        updateEmptyState();
    }

    // Update padding and border-radius
    function updateEmptyState() {
        if (tasks.length === 0) {
            listContainer.style.padding = 0;
            formContainer.style.borderRadius = '';
        } else {
            formContainer.style.borderRadius = 0;
            listContainer.style.padding = '20px';
        }
    }

    // ---- Events ----
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addButton.classList.add('flash');
        setTimeout(() => {
            addButton.classList.remove('flash');
        }, 150);
        addTask(todoInput.value);
        todoInput.value = '';
    });

    clearAllBtn.addEventListener('click', () => {
        clearAllBtn.classList.add('flash');
        setTimeout(() => {
            tasks = [];
            render();
            saveTasks();
            clearAllBtn.classList.remove('flash');
        }, 150);
    });

    todoList.addEventListener('click', (event) => {
        const li = event.target.closest('.todo-item');
        if (!li) return;
        const id = Number(li.dataset.id);

        if (event.target.classList.contains('delete-btn')) {
            deleteTask(id, event.target);
        } else if (event.target.classList.contains('task-text')) {
            toggleTask(id);
        }
    });

    loadTasks();
});
