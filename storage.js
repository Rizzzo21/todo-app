/**
 * Local Storage Manager
 * Handles persistent storage of todo items
 */
class StorageManager {
    constructor(storageKey = 'todoApp') {
        this.storageKey = storageKey;
        this.initStorage();
    }

    /**
     * Initialize storage if it doesn't exist
     */
    initStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({
                tasks: [],
                lastModified: new Date().toISOString()
            }));
        }
    }

    /**
     * Get all tasks
     */
    getAllTasks() {
        try {
            const data = JSON.parse(localStorage.getItem(this.storageKey));
            return data.tasks || [];
        } catch (error) {
            console.error('Error reading from storage:', error);
            return [];
        }
    }

    /**
     * Save all tasks
     */
    saveTasks(tasks) {
        try {
            const data = {
                tasks: tasks,
                lastModified: new Date().toISOString()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error writing to storage:', error);
            return false;
        }
    }

    /**
     * Add a single task
     */
    addTask(task) {
        const tasks = this.getAllTasks();
        tasks.push(task);
        return this.saveTasks(tasks);
    }

    /**
     * Update a task by ID
     */
    updateTask(taskId, updates) {
        const tasks = this.getAllTasks();
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            Object.assign(task, updates);
            task.updatedAt = new Date().toISOString();
            return this.saveTasks(tasks);
        }
        return false;
    }

    /**
     * Delete a task by ID
     */
    deleteTask(taskId) {
        const tasks = this.getAllTasks();
        const filtered = tasks.filter(t => t.id !== taskId);
        return this.saveTasks(filtered);
    }

    /**
     * Toggle task completion status
     */
    toggleTask(taskId) {
        const tasks = this.getAllTasks();
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.updatedAt = new Date().toISOString();
            return this.saveTasks(tasks);
        }
        return false;
    }

    /**
     * Clear all completed tasks
     */
    clearCompleted() {
        const tasks = this.getAllTasks();
        const filtered = tasks.filter(t => !t.completed);
        return this.saveTasks(filtered);
    }

    /**
     * Clear all tasks
     */
    clearAll() {
        return this.saveTasks([]);
    }

    /**
     * Export tasks as JSON
     */
    exportTasks() {
        const data = {
            tasks: this.getAllTasks(),
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };
        return JSON.stringify(data, null, 2);
    }

    /**
     * Import tasks from JSON
     */
    importTasks(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.tasks && Array.isArray(data.tasks)) {
                return this.saveTasks(data.tasks);
            }
            return false;
        } catch (error) {
            console.error('Error importing tasks:', error);
            return false;
        }
    }

    /**
     * Get storage stats
     */
    getStats() {
        const tasks = this.getAllTasks();
        return {
            total: tasks.length,
            completed: tasks.filter(t => t.completed).length,
            active: tasks.filter(t => !t.completed).length
        };
    }
}
