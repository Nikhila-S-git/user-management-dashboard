import React from "react";

const UserTable = ({ users, onEdit, onDelete, onSort }) => {
  const tableStyles = {
    container: {
      overflowX: "auto",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 20,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
    table: { width: "100%", borderCollapse: "collapse", minWidth: 700 },
    th: { padding: 12, textAlign: "left", borderBottom: "1px solid #e2e8f0", backgroundColor: "#edf2f7", cursor: "pointer" },
    td: { padding: 12, borderBottom: "1px solid #e2e8f0" },
    actions: { display: "flex", gap: 5 },
    editBtn: { backgroundColor: "#1990e5ff", color: "#fff", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer" },
    deleteBtn: { backgroundColor: "#e53e3e", color: "#fff", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer" },
    noUsers: { textAlign: "center", padding: 10, color: "#718096" },
  };

  return (
    <div style={tableStyles.container}>
      <table style={tableStyles.table}>
        <thead>
          <tr>
            {["id", "firstName", "lastName", "email", "department"].map((field) => (
              <th key={field} style={tableStyles.th} onClick={() => onSort(field)}>
                {field === "id" ? "ID" : field.charAt(0).toUpperCase() + field.slice(1)}
              </th>
            ))}
            <th style={tableStyles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((user) => (
              <tr key={user.id}>
                <td style={tableStyles.td}>{user.id}</td>
                <td style={tableStyles.td}>{user.firstName}</td>
                <td style={tableStyles.td}>{user.lastName}</td>
                <td style={tableStyles.td}>{user.email}</td>
                <td style={tableStyles.td}>{user.department}</td>
                <td style={{ ...tableStyles.td, ...tableStyles.actions }}>
                  <button style={tableStyles.editBtn} onClick={() => onEdit(user)}>Edit</button>
                  <button style={tableStyles.deleteBtn} onClick={() => onDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={tableStyles.noUsers}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
