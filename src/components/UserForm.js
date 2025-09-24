import React, { useState, useEffect } from "react";

const UserForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ firstName: "", lastName: "", email: "", department: "" });
  };

  // Inline styles
  const styles = {
    container: {
      backgroundColor: "#fff",
      padding: 30,
      borderRadius: 20,
      maxWidth: 500,
      margin: "0 auto 20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    input: {
      padding: 12,
      borderRadius: 10,
      border: "1px solid #cbd5e0",
      fontSize: 16,
      marginBottom: 10,
      width: "100%",
    },
    buttons: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 },
    cancelBtn: {
      backgroundColor: "#e2e8f0",
      color: "#2d3748",
      padding: "10px 18px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
    },
    submitBtn: {
      backgroundColor: "#3182ce",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2>{initialData ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <div style={styles.buttons}>
          <button type="button" onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
          <button type="submit" style={styles.submitBtn}>
            {initialData ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
