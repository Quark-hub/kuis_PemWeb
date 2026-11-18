import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import dummyTodos from "./data/dummyTodos.js";
import TodoList from "./pages/TodoList.jsx";
import TodoDetail from "./pages/TodoDetail.jsx";

function App() {
  const [todos, setTodos] = useState(dummyTodos);

  const addTodo = (data) => {
    const newTodo = { id: Date.now(), ...data };
    setTodos([...todos, newTodo]);
    alert("Tugas berhasil ditambahkan");
  };

  const updateTodo = (id, data) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, ...data } : t)));
    alert("Tugas berhasil diperbarui");
  };

  const deleteTodo = (id) => {
    if (window.confirm("Yakin ingin menghapus tugas ini?")) {
      setTodos(todos.filter((t) => t.id !== id));
      alert("Tugas berhasil dihapus");
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <TodoList todos={todos} onAdd={addTodo} onDelete={deleteTodo} />
        }
      />
      <Route
        path="/todo/:id"
        element={<TodoDetail todos={todos} onUpdate={updateTodo} />}
      />
    </Routes>
  );
}

export default App;
