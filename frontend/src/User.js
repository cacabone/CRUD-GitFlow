import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/api/users')
        .then(response => {
          const data = response.data;
          if (Array.isArray(data)) {
            setUsers(data);
          } else if (data && Array.isArray(data.users)) {
            setUsers(data.users);
          } else if (data && Array.isArray(data.data)) {
            setUsers(data.data);
          } else {
            console.warn('Unexpected response shape from API, expected an array. Response:', data);
            setUsers([]);
          }
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    }, []);

    async function handleDelete(id) {
      try {
        const res = await axios.delete(`http://localhost:5000/delete/${id}`);
        if (res && res.data && res.data.success) {
          alert('User Deleted Successfully');
          // Refresh the user list after deletion
          setUsers(prevUsers => prevUsers.filter(user => (user.id || user.ID) !== id));
        } else {
          console.warn('Delete returned unexpected response', res && res.data);
        }
      } catch (error) {
        console.error('There was an error deleting the user!', error);
      }
    }

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0">Users</h1>
        <Link to="/create" className="btn btn-primary">+ Add User</Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-muted">No users found</td>
                  </tr>
                )}
                {users.map((user) => (
                  <tr key={user.id || user.ID}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="text-end">
                      <Link to={`/update/${user.id || user.ID}`} className="btn btn-sm btn-outline-warning me-2">Edit</Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(user.id || user.ID)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;