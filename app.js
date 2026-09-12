/**
 * Todo App Main Application Logic
 */
class TodoApp {
    constructor() {
        this.storage = new StorageManager('todoApp');
        this.currentFilter = 'all';
        this.initElements();
        this.attachEventListeners();
        this.render();
    }

    /**
     * Initialize DOM elements
     */
    initElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.clearCompleteBtn = document.getElementById('clearCompleted');
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.importFile = document.getElementById('importFile');
        this.taskCount = document.getElementById('taskCount');
        this.completedCount = document.getElementById('completedCount');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        this.clearCompleteBtn.addEventListener('click', () => this.clearCompleted());
        this.exportBtn.addEventListener('click', () => this.exportTasks());
        this.importBtn.addEventListener('click', () => this.importFile.click());
        this.importFile.addEventListener('change', (e) => this.importTasks(e));
    }

    /**
     * Add a new task
     */
    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) return;

        const task = {
            id: Date.now().toString(),
            text: text,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.storage.addTask(task);
        this.taskInput.value = '';
        this.taskInput.focus();
        this.render();
    }

    /**
     * Toggle task completion
     */
    toggleTask(taskId) {
        this.storage.toggleTask(taskId);
        this.render();
    }

    /**
     * Delete a task
     */
    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.storage.deleteTask(taskId);
            this.render();
        }
    }

    /**
     * Set active filter
     */
    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    /**
     * Clear completed tasks
     */
    clearCompleted() {
        const stats = this.storage.getStats();
        if (stats.completed === 0) {
            alert('No completed tasks to clear.');
            return;
        }
        if (confirm(`Clear ${stats.completed} completed task(s)?`)) {
            this.storage.clearCompleted();
            this.render();
        }
    }

    /**
     * Export tasks to JSON file
     */
    exportTasks() {
        const json = this.storage.exportTasks();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tasks_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Import tasks from JSON file
     */
    importTasks(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (this.storage.importTasks(e.target.result)) {
                alert('Tasks imported successfully!');
                this.render();
            } else {
                alert('Error importing tasks. Please check the file format.');
            }
        };
        reader.readAsText(file);
        this.importFile.value = '';
    }

    /**
     * Get filtered tasks
     */
    getFilteredTasks() {
        const tasks = this.storage.getAllTasks();
        switch (this.currentFilter) {
            case 'active':
                return tasks.filter(t => !t.completed);
            case 'completed':
                return tasks.filter(t => t.completed);
            default:
                return tasks;
        }
    }

    /**
     * Get priority badge HTML
     */
    getPriorityBadge(priority) {
        return `<span class="task-priority priority-${priority}">${priority}</span>`;
    }

    /**
     * Format date
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    /**
     * Render task list
     */
    render() {
        const tasks = this.getFilteredTasks();
        const stats = this.storage.getStats();

        // Update stats
        this.taskCount.textContent = `${stats.total} ${stats.total === 1 ? 'task' : 'tasks'}`;
        this.completedCount.textContent = `${stats.completed} completed`;

        // Render task list
        if (tasks.length === 0) {
            this.taskList.innerHTML = `
                <div class="empty-state">
                    <p>🎯 No tasks yet</p>
                    <small>Add a task above to get started!</small>
                </div>
            `;
            return;
        }

        this.taskList.innerHTML = tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="app.toggleTask('${task.id}')"
                >
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                ${this.getPriorityBadge(task.priority)}
                <span class="task-date">${this.formatDate(task.createdAt)}</span>
                <button class="delete-btn" onclick="app.deleteTask('${task.id}')">Delete</button>
            </div>
        `).join('');
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
});
