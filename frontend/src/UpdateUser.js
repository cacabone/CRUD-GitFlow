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
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="h5 mb-4">Update User</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>

                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-success">Save changes</button>
                                    <a href="/" className="btn btn-secondary">Cancel</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;