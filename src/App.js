import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { getUsers, addUser, updateUser, deleteUser } from "./components/mockApi";

function App() {
  const [users,setUsers] = useState([]);
  const [showForm,setShowForm] = useState(false);
  const [editingUser,setEditingUser] = useState(null);
  const [sortField,setSortField] = useState(null);
  const [sortOrder,setSortOrder] = useState("asc");
  const [search,setSearch] = useState("");
  const [page,setPage] = useState(1);
  const [rowsPerPage,setRowsPerPage] = useState(10);

  useEffect(()=>{ loadUsers(); }, []);

  const loadUsers = async ()=>{ const data = await getUsers(); setUsers(data); };
  const handleAddUser = async (user)=>{
    if(editingUser) await updateUser(editingUser.id,user);
    else await addUser(user);
    setEditingUser(null); setShowForm(false); loadUsers();
  };
  const handleDeleteUser = async id=>{ await deleteUser(id); loadUsers(); };
  const handleEditUser = user=>{ setEditingUser(user); setShowForm(true); };
  const handleSort = field=>{
    const order = sortField===field && sortOrder==="asc" ? "desc" : "asc";
    setSortField(field); setSortOrder(order);
    const sorted = [...users].sort((a,b)=>{
      if(a[field]<b[field]) return order==="asc"?-1:1;
      if(a[field]>b[field]) return order==="asc"?1:-1;
      return 0;
    });
    setUsers(sorted);
  };

  const filteredUsers = users.filter(u =>
    u.firstName.toLowerCase().includes(search.toLowerCase()) ||
    u.lastName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.department.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice((page-1)*rowsPerPage,page*rowsPerPage);

  const styles = {
    container:{ maxWidth:1200, margin:"20px auto", fontFamily:"Arial,sans-serif", padding:"0 20px" },
    header:{ textAlign:"center", marginBottom:20, color:"#2d3748" },
    controls:{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:20 },
    searchInput:{ padding:10, borderRadius:10, border:"1px solid #cbd5e0", flex:1, minWidth:200 },
    addBtn:{ backgroundColor:"#38a169", color:"#fff", border:"none", borderRadius:10, padding:"10px 20px", cursor:"pointer" },
    pagination:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:15, flexWrap:"wrap", gap:10 },
    rowsPerPage:{ display:"flex", alignItems:"center", gap:5 },
    pageControls:{ display:"flex", alignItems:"center", gap:5 },
    pageBtn:{ padding:"5px 12px", borderRadius:8, border:"none", cursor:"pointer", backgroundColor:"#3182ce", color:"#fff" },
    pageBtnDisabled:{ backgroundColor:"#a0aec0", cursor:"not-allowed" }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}><h1>User Management Dashboard</h1></header>
      <div style={styles.controls}>
        <input type="text" placeholder="Search users..." value={search} onChange={e=>setSearch(e.target.value)} style={styles.searchInput} />
        <button style={styles.addBtn} onClick={()=>{ setEditingUser(null); setShowForm(true); }}>Add User</button>
      </div>
      {showForm && <UserForm onSubmit={handleAddUser} onCancel={()=>{ setShowForm(false); setEditingUser(null); }} initialData={editingUser} />}
      <UserTable users={paginatedUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} onSort={handleSort} />
      <div style={styles.pagination}>
        <div style={styles.rowsPerPage}>
          <label>Rows per page:</label>
          <select value={rowsPerPage} onChange={e=>{ setRowsPerPage(Number(e.target.value)); setPage(1); }}>
            {[10,25,50,100].map(n=><option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div style={styles.pageControls}>
          <button onClick={()=>setPage(prev=>prev-1)} disabled={page===1} style={page===1 ? {...styles.pageBtn,...styles.pageBtnDisabled} : styles.pageBtn}>Prev</button>
          <span>Page {page}</span>
          <button onClick={()=>setPage(prev=>prev+1)} disabled={page*rowsPerPage>=filteredUsers.length} style={page*rowsPerPage>=filteredUsers.length ? {...styles.pageBtn,...styles.pageBtnDisabled} : styles.pageBtn}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
