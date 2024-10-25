import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    isSelected: "No",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(
        "https://transcript-app-management-portal-service.azurewebsites.net/api/Task"
      );
      const formattedTasks = response.data.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.body,
        isSelected: "No",
      }));
      setTasks(formattedTasks);
    };
    fetchTasks();
  }, []);

  const handleEditChange = (id, field, value) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, [field]: value } : task))
    );
  };

  const handleCreateTask = () => {
    const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const taskToAdd = { id: newId, ...newTask };
    setTasks([...tasks, taskToAdd]);
    setNewTask({ title: "", description: "", isSelected: "No" });
  };

  const handleEditButtonClick = (id) => {
    setEditingTaskId(id);
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSaveTask = async (task) => {
    await axios.put(`https://jsonplaceholder.typicode.com/posts/${task.id}`, {
      title: task.title,
      body: task.description,
      isSelected: task.isSelected,
    });
    setEditingTaskId(null); // Exit editing mode after saving
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <div className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={handleCreateTask}>Create Task</button>
      </div>
      <div className="task-table">
        <div className="task-row header">
          <span>ID</span>
          <span>Title</span>
          <span>Description</span>
          <span>Is Selected</span>
          <span>Actions</span>
        </div>
        {tasks.map((task) => (
          <div className="task-row" key={task.id}>
            <span>{task.id}</span>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) =>
                    handleEditChange(task.id, "title", e.target.value)
                  }
                />
                <input
                  type="text"
                  value={task.description}
                  onChange={(e) =>
                    handleEditChange(task.id, "description", e.target.value)
                  }
                />
                <select
                  value={task.isSelected}
                  onChange={(e) =>
                    handleEditChange(task.id, "isSelected", e.target.value)
                  }
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <span>{task.description}</span>
                <span>{task.isSelected}</span>
              </>
            )}
            <div className="actions">
              {editingTaskId === task.id ? (
                <>
                  <button onClick={() => handleSaveTask(task)}>Save</button>
                  <button onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditButtonClick(task.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
