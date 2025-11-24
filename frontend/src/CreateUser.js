import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const navigate = useNavigate();
    
    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/create', { name, email})
        .then(() => {
            alert('User Created Successfully');
            navigate('/');
        })
        .catch((err) => {
            console.error('There was an error creating the user!', err);
        });
    }
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className='w-50 bg-light p-5 rounded shadow'>
            <form onSubmit={handleSubmit}>
                <h2 className="mb-4">Add User</h2>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Enter name" 
                    onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" 
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
  );
}

export default CreateUser;