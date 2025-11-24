import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    React.useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:5000/api/users/${id}`)
        .then(res => {
            setName(res.data.name || '');
            setEmail(res.data.email || '');
        })
        .catch(err => {
            console.error('Failed to fetch user:', err);
        });
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        axios.put(`http://localhost:5000/update/${id}`, {name, email})
        .then(() => {
            alert('User Updated Successfully');
            navigate('/');
        })
        .catch((err) => {
            console.error('There was an error updating the user!', err);
        });
    }
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className='w-50 bg-light p-5 rounded shadow'>
            <form onSubmit={handleSubmit}>
                <h2 className="mb-4">Update User</h2>
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
                <button type="submit" className="btn btn-success">Update</button>
            </form>
        </div>
    </div>
  );
}

export default UpdateUser;