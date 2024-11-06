import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Todo.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    isCompleted: true,
  });
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Fetch all tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://usermanagementportalfrontend-gpgegxbqcbgncngz.canadacentral-01.azurewebsites.net/api/Task"
        );
        setTasks(response.data); // assuming response data is already an array of tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleEditChange = (id, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  };

  // Create a new task
  const handleCreateTask = async () => {
    try {
      const response = await axios.post(
        "https://usermanagementportalfrontend-gpgegxbqcbgncngz.canadacentral-01.azurewebsites.net/api/Task",
        {
          id: new Date(),
          title: newTask.title,
          description: newTask.description,
          isCompleted: newTask.isCompleted,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]); // add new task with ID assigned by server
      setNewTask({ title: "", description: "", isCompleted: "No" }); // reset form
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleEditButtonClick = (id) => {
    setEditingTaskId(id);
  };

  // Update an existing task
  const handleSaveTask = async (task) => {
    try {
      await axios.put(
        `https://usermanagementportalfrontend-gpgegxbqcbgncngz.canadacentral-01.azurewebsites.net/api/Task/${task.id}`,
        {
          id: `${task.id}`,
          title: task.title,
          description: task.description,
          isCompleted: task.isCompleted,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setEditingTaskId(task.id); // Exit editing mode after saving
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(
        `https://usermanagementportalfrontend-gpgegxbqcbgncngz.canadacentral-01.azurewebsites.net/api/Task/${id}`
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
          <span>Is Completed</span>
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
                  value={task.isCompleted}
                  onChange={(e) =>
                    handleEditChange(task.id, "isCompleted", e.target.value)
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
                <span>{task.isCompleted}</span>
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

export default Todo;
