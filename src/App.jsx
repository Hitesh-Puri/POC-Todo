import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoTable from "./components/TodoTable";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./utilities/todoService";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
// import Todo from "./components/Todo";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const response = await getTodos();
    setTodos(response.data);
  };

  // const generateId = () => {
  //   return Math.max(0, ...todos.map((todo) => todo.id)) + 1; // Simple ID generator
  // };

  const generateId = () => {
    return uuidv4(); // generates a unique string ID
  };

  const handleCreate = async (newTodo) => {
    const todoWithId = { ...newTodo, id: generateId() }; // Add generated ID
    const response = await createTodo(todoWithId);
    setTodos([...todos, response.data]);
  };

  const handleEdit = (id, field, value) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, [field]: value } : todo))
    );
  };

  const handleSave = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      await updateTodo(id, todoToUpdate); // Update API with the edited todo
    }
  };

  const handleToggleComplete = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      const updatedFields = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      };
      await updateTodo(id, updatedFields);
      setTodos(todos.map((todo) => (todo.id === id ? updatedFields : todo)));
    }
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Task Manager
      </h1>
      <TodoForm onCreate={handleCreate} />
      <TodoTable
        todos={todos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSave={handleSave}
        onToggleComplete={handleToggleComplete}
      />
      {/* <br />
      <Todo /> */}
    </div>
  );
};

export default App;
