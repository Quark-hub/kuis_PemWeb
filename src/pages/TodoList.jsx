import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoModal from "../components/TodoModal.jsx";
import formatDate from "../utils/formatDate.js";

function TodoList({ todos, onAdd, onDelete }) {
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  const handleAdd = (data) => {
    onAdd(data);
    setShowAdd(false);
  };

  return (
    <div className="page">
      <header className="topbar">
        <h1>Catatan Tugas</h1>
        <button className="btn green" onClick={() => setShowAdd(true)}>
          + Tugas Baru
        </button>
      </header>

      <main className="card">
        <p className="summary">Total {todos.length} tugas</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tugas</th>
                <th>Status</th>
                <th>Prioritas</th>
                <th>Tenggat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {todos.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty">
                    Belum ada tugas. Klik "Tugas Baru" untuk menambahkan.
                  </td>
                </tr>
              )}
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td className="task-title">{todo.title}</td>
                  <td>
                    <span className={`badge s-${todo.status.replace(" ", "-")}`}>
                      {todo.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge p-${todo.priority}`}>
                      {todo.priority}
                    </span>
                  </td>
                  <td>{formatDate(todo.deadline)}</td>
                  <td className="actions">
                    <button
                      className="btn outline small"
                      onClick={() => navigate(`/todo/${todo.id}`)}
                    >
                      Detail
                    </button>
                    <button
                      className="btn danger small"
                      onClick={() => onDelete(todo.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showAdd && (
        <TodoModal
          heading="Tugas Baru"
          submitLabel="Simpan"
          onSubmit={handleAdd}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}

export default TodoList;
