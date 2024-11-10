document.addEventListener('DOMContentLoaded', () => {
    // Define elements
    const todoForm = document.querySelector('#todo-form');
    const todoInput = document.querySelector('#todo-input');
    const todoList = document.querySelector('#todo-list');
    const formContainer = document.querySelector('.form-container');
    const listContainer = document.querySelector('.list-container');

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // let taskNo = document.querySelectorAll('.todo-item').length + 1;
        addTask(`${todoInput.value}`);
        todoInput.value = '';
    });

    function addTask(task) {
        if (task.trim() === '') return;

        const li = document.createElement('li');
        li.classList.add('todo-item');

        const taskText = document.createElement('span');
        taskText.textContent = task;

        const taskNo = document.createElement('span');
        listLength = document.querySelectorAll('.todo-item').length + 1;
        taskNo.textContent = `${listLength}.`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');

        li.appendChild(taskNo);
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        todoList.appendChild(li);

        taskNo.classList.add('task-no');
        taskText.classList.add('task-text');

        // Mark task as completed on click
        taskText.addEventListener('click', () => {
            taskText.classList.toggle('completed');
        });

        // Delete task on button click
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
        });
    }
    if (document.querySelectorAll('.todo-item').length == 0) {
        listContainer.style.padding = 0;
    } else {
        formContainer.style.borderRadius = 0;
        listContainer.style.padding = '20px';
    }
});
