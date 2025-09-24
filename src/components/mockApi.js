// Mock API implementation

let users = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", department: "Engineering" },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", department: "Marketing" },
];

let nextId = 3;

export const getUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...users]), 300);
  });
};

export const addUser = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = { id: nextId++, ...user };
      users.push(newUser);
      resolve(newUser);
    }, 300);
  });
};

export const updateUser = async (id, updatedData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      users = users.map((u) => (u.id === id ? { ...u, ...updatedData } : u));
      resolve(users.find((u) => u.id === id));
    }, 300);
  });
};

export const deleteUser = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      users = users.filter((u) => u.id !== id);
      resolve(true);
    }, 300);
  });
};
