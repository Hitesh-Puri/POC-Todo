/* eslint-disable react/prop-types */
import { useState } from "react";
import "../App.css";

const TodoTable = ({ todos, onEdit, onDelete, onSave, onToggleComplete }) => {
  const [editRowId, setEditRowId] = useState(null);

  const handleEditClick = (id) => {
    setEditRowId(id);
  };

  const handleSaveClick = (id) => {
    onSave(id);
    setEditRowId(null);
  };

  return (
    <table
      style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
          {/* <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th> */}
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Title</th>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>
            Description
          </th>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>
            Is Completed
          </th>
          <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {/* <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {todo.id}
            </td> */}
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {editRowId === todo.id ? (
                <input
                  type="text"
                  value={todo.title}
                  onChange={(e) => onEdit(todo.id, "title", e.target.value)}
                  style={{ padding: "6px", width: "100%" }}
                />
              ) : (
                todo.title
              )}
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {editRowId === todo.id ? (
                <input
                  type="text"
                  value={todo.description}
                  onChange={(e) =>
                    onEdit(todo.id, "description", e.target.value)
                  }
                  style={{ padding: "6px", width: "100%" }}
                />
              ) : (
                todo.description
              )}
            </td>
            <td
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleComplete(todo.id)}
                style={{ cursor: "pointer" }}
              />
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {editRowId === todo.id ? (
                <button
                  onClick={() => handleSaveClick(todo.id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#2861a7",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(todo.id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => onDelete(todo.id)}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;
