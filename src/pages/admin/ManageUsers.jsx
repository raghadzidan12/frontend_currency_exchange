import { useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" },
  ]);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="content-wrapper">
      <h2 className="title">Manage Users</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map(user => (
          <li key={user.id} style={{
            background: "#111",
            color: "#fff",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span>{user.name} ({user.email})</span>
            <button className="convert-btn" style={{ width: "80px", padding: "5px" }} onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
