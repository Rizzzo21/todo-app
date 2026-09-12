# 📝 Todo App

A modern, lightweight to-do list application with local storage functionality. Organize your tasks efficiently with a clean, intuitive interface.

## ✨ Features

- ✅ **Add & Manage Tasks** - Create, complete, and delete tasks
- 💾 **Local Storage** - All data persists in your browser
- 🎯 **Filter Tasks** - View all, active, or completed tasks
- 📊 **Task Statistics** - Track total and completed tasks
- 📥 **Import/Export** - Backup and restore tasks as JSON
- 🎨 **Modern UI** - Beautiful, responsive design
- ⚡ **Fast & Lightweight** - No dependencies, pure JavaScript
- 📱 **Mobile Friendly** - Works on all devices

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. Start adding tasks!

No installation or server required.

## 📖 Usage

### Adding Tasks
- Type your task in the input field
- Press Enter or click "Add Task"

### Managing Tasks
- Check the checkbox to mark a task as complete
- Click "Delete" to remove a task
- Completed tasks appear with strikethrough text

### Filtering
- Click "All" to view all tasks
- Click "Active" to see incomplete tasks
- Click "Completed" to see finished tasks

### Data Management
- **Clear Completed** - Remove all finished tasks at once
- **Export** - Download your tasks as a JSON file
- **Import** - Load tasks from a previously exported JSON file

## 💻 Technical Details

### Project Structure

```
todo-app/
├── index.html       # HTML structure
├── styles.css       # Styling and layout
├── app.js           # Main application logic
├── storage.js       # Local storage management
└── README.md        # Documentation
```

### LocalStorage API

The app uses the browser's `localStorage` API to persist data:
- All tasks are stored as JSON in browser storage
- Data persists across browser sessions
- Storage limit is typically 5-10MB per domain
- No server or database required

### Task Object Structure

```json
{
  "id": "1234567890",
  "text": "Task description",
  "completed": false,
  "priority": "medium",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## 🎨 Customization

### Colors

Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #007bff;
    --success-color: #28a745;
    --danger-color: #dc3545;
    /* ... more colors ... */
}
```

### Storage Key

Change the storage key in `app.js`:

```javascript
const app = new TodoApp('myCustomKey');
```

## 📋 API Reference

### StorageManager Class

#### `getAllTasks()`
Returns array of all tasks.

#### `addTask(task)`
Adds a new task to storage.

#### `updateTask(taskId, updates)`
Updates a specific task.

#### `deleteTask(taskId)`
Deletes a task by ID.

#### `toggleTask(taskId)`
Toggles task completion status.

#### `clearCompleted()`
Removes all completed tasks.

#### `exportTasks()`
Exports tasks as JSON string.

#### `importTasks(jsonData)`
Imports tasks from JSON string.

#### `getStats()`
Returns object with task statistics.

## 🌐 Browser Support

- Chrome 4+
- Firefox 3.5+
- Safari 4+
- Edge (all versions)
- Opera 10.5+
- IE 8+ (with localStorage polyfill)

## 📝 License

MIT License - feel free to use this project for any purpose.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📚 Future Enhancements

- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Recurring tasks
- [ ] Task editing
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Undo/Redo functionality
- [ ] Cloud sync

## 💡 Tips

- Regularly export your tasks for backup
- Use the import feature to restore from backups
- Check browser storage usage (usually in DevTools)
- Clear browser cache carefully - it won't affect localStorage

---

Enjoy staying productive! 🎯
