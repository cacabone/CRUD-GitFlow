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
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className='w-50 bg-light p-5 rounded shadow'>
        <Link to="/create" className="btn btn-primary mb-4">Add</Link>
        <table className="table table-bordered">
         <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
         </thead>
          <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2">Edit</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>                
      </div>
    </div>
  );
}

export default User;