import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoModal from "../components/TodoModal.jsx";
import formatDate from "../utils/formatDate.js";

function TodoDetail({ todos, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);

  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <div className="page">
        <div className="card center">
          <p>Tugas tidak ditemukan</p>
          <button className="btn outline" onClick={() => navigate("/")}>
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const handleUpdate = (data) => {
    onUpdate(todo.id, data);
    setShowEdit(false);
  };

  return (
    <div className="page narrow">
      <button className="back" onClick={() => navigate("/")}>
        &lt; Kembali ke daftar
      </button>

      <div className="card">
        <h1 className="detail-title">{todo.title}</h1>

        <div className="badges">
          <span className={`badge s-${todo.status.replace(" ", "-")}`}>
            {todo.status}
          </span>
          <span className={`badge p-${todo.priority}`}>
            prioritas {todo.priority}
          </span>
        </div>

        <h3>Deskripsi</h3>
        <p className="desc">{todo.description || "-"}</p>

        <h3>Tenggat</h3>
        <p className="desc">{formatDate(todo.deadline)}</p>

        <div className="detail-actions">
          <button className="btn green" onClick={() => setShowEdit(true)}>
            Ubah Tugas
          </button>
        </div>
      </div>

      {showEdit && (
        <TodoModal
          heading="Ubah Tugas"
          submitLabel="Simpan Perubahan"
          initialData={{
            title: todo.title,
            description: todo.description,
            status: todo.status,
            priority: todo.priority,
            deadline: todo.deadline,
          }}
          onSubmit={handleUpdate}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}

export default TodoDetail;
