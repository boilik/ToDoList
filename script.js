let tasks = [];
let currentFilter = 'all';

const input = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');
const filterBtns = document.querySelectorAll('.filter-btn');
const countEl = document.getElementById('count');

function loadFromStorage() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
        tasks = JSON.parse(stored);
    }
}

function saveToStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        done: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(task);
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.done = !task.done;
    }
}

function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(task => !task.done);
        case 'done':
            return tasks.filter(task => task.done);
        default:
            return tasks;
    }
}

function updateCount() {
    const activeCount = tasks.filter(t => !t.done).length;
    const word = activeCount === 1 ? 'задача' : activeCount >= 2 && activeCount <= 4 ? 'задачи' : 'задач';
    countEl.textContent = `${activeCount} ${word}`;
}

function render() {
    list.innerHTML = '';
    const filtered = getFilteredTasks();

    filtered.forEach(task => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => {
            toggleTask(task.id);
            saveToStorage();
            render();
            updateCount();
        });

        const span = document.createElement('span');
        span.className = `task-text${task.done ? ' done' : ''}`;
        span.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Удалить';
        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
            saveToStorage();
            render();
            updateCount();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    updateCount();
}

function handleAddTask() {
    const text = input.value.trim();
    if (text) {
        addTask(text);
        saveToStorage();
        input.value = '';
        render();
    }
}

addBtn.addEventListener('click', handleAddTask);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleAddTask();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        render();
    });
});

loadFromStorage();
render();
