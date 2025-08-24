// Array untuk menyimpan semua tasks
let todos = [];
let filter = 'all'; // all, active, completed

// Ambil elemen HTML
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const taskCount = document.getElementById('taskCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompleted');

// Function untuk membuat ID unik
function generateId() {
    return Date.now().toString();
}

// Function untuk menambah task baru
function addTask() {
    const taskText = todoInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const newTask = {
        id: generateId(),
        text: taskText,
        completed: false,
        createdAt: new Date()
    };
    
    todos.push(newTask);
    todoInput.value = '';
    saveToLocalStorage();
    renderTasks();
    updateTaskCount();
}

// Function untuk render/tampilkan tasks
function renderTasks() {
    todoList.innerHTML = '';
    
    // Filter tasks berdasarkan status
    let filteredTasks = todos;
    if (filter === 'active') {
        filteredTasks = todos.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = todos.filter(task => task.completed);
    }
    
    // Buat HTML untuk setiap task
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleTask('${task.id}')">
                <span class="task-text" ondblclick="editTask('${task.id}')">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask('${task.id}')">❌</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

// Function untuk toggle complete/incomplete
function toggleTask(id) {
    todos = todos.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    
    saveToLocalStorage();
    renderTasks();
    updateTaskCount();
}

// Function untuk delete task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        todos = todos.filter(task => task.id !== id);
        saveToLocalStorage();
        renderTasks();
        updateTaskCount();
    }
}

// Function untuk edit task
function editTask(id) {
    const task = todos.find(task => task.id === id);
    const newText = prompt('Edit task:', task.text);
    
    if (newText !== null && newText.trim() !== '') {
        todos = todos.map(t => {
            if (t.id === id) {
                t.text = newText.trim();
            }
            return t;
        });
        
        saveToLocalStorage();
        renderTasks();
    }
}

// Function untuk update task counter
function updateTaskCount() {
    const activeTasks = todos.filter(task => !task.completed).length;
    taskCount.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
}

// Function untuk filter tasks
function setFilter(newFilter) {
    filter = newFilter;
    
    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === newFilter) {
            btn.classList.add('active');
        }
    });
    
    renderTasks();
}

// Function untuk clear completed tasks
function clearCompleted() {
    const completedTasks = todos.filter(task => task.completed).length;
    
    if (completedTasks === 0) {
        alert('No completed tasks to clear!');
        return;
    }

    if (confirm(`Delete ${completedTasks} completed task${completedTasks !== 1 ? 's' : ''}?`)) {
        todos = todos.filter(task => !task.completed);
        saveToLocalStorage();
        renderTasks();
        updateTaskCount();
    }
}

// Function untuk save ke localStorage
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function untuk load dari localStorage
function loadFromLocalStorage() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
}

// Event Listeners
addBtn.addEventListener('click', addTask);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        setFilter(this.getAttribute('data-filter'));
    });
});

clearCompletedBtn.addEventListener('click', clearCompleted);

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    renderTasks();
    updateTaskCount();
    
    // Welcome message
    console.log('📝 Todo App loaded successfully!');
    console.log('Try adding some tasks!');
});