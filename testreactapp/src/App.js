import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'

function App() {

    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [name1, setName1] = useState('');
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/users')
            .then((res) => {
                setUsers(res.data)
                console.log(res)
            })
            .catch(err => console.log(err))

    }, [users]);

    const handleSubmit = (event) => {
        event.preventDefault();

        //create a new user in the database

        axios.post('http://localhost:8080/users', {
            name: name1,
            email: email1,
            password: password1
        })
            .then(res => {
                setUsers([...users, res.data]);
                setName1('');
                setEmail1('');
                setPassword1('');
            })
            .catch(err => {
                console.log("Error creating a new user ", err);
            })
    };
    const handleUpdate = (id, name, email, password) => {
        axios.put(`http://localhost:8080/users/${id}`, {
            name,
            email,
            password
        })
            .then(response => {
                const updatedUsers = users.map(user => {
                    if (user.id === id) {
                        return {
                            ...user,
                            name: response.data.name,
                            email: response.data.email,
                            password: response.data.password
                        };
                    } else {
                        return user;
                    }
                });
                setUsers(updatedUsers);
                setEditingUserId(null);
            })
            .catch(error => {
                console.error('Error updating an existing user:', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/users/${id}`)
            .then(res => {
                const updatedUsers = users.filter(user => user.id !== id);
                setUsers(updatedUsers);
            })
            .catch(err => console.log('error deleting an existing user : ', err))
    };

    const handleEdit = (id, name, email, passwore) => {
        setEditingUserId(id);
        setName(name);
        setEmail(email);
        setPassword(password);
    }


    return (
        <div>
            <h1 style={{textAlign : 'center'}}>Users</h1>
            <div className='container'>

                {users.map(user => (
                    <div key={user.id}>
                        {editingUserId === user.id ? (
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                handleUpdate(user.id, name, email, password);
                            }}>
                                <input type='text' placeholder='Name' value={name} onChange={(event) => setName(event.target.value)}></input> <br></br>
                                <input type='email' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)}></input> <br></br>
                                <input type='password' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}></input><br></br>
                                <button type='submit'>Update</button>
                            </form>
                        ) : (
                            <>
                                    <div className='innerDiv'><strong>Name : </strong>{user.name}</div>
                                    <div className='innerDiv'><strong>Email : </strong>{user.email}</div>
                                    <div className='innerDiv'><strong>Password : </strong><span>{user.password}</span></div>
                                    <button onClick={() => handleEdit(user.id, user.name, user.email, user.password)} className='edit'>Edit</button>
                                    <button onClick={() => handleDelete(user.id)} className='delete'>Delete</button> 
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className='containerForm'>
                <div>
                    <br></br>
                    <h3>Add the User</h3>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                      <input type='text' placeholder='Name' value={name1} onChange={(event) => setName1(event.target.value)}></input><br></br>
                      <input type='email' placeholder='Email' value={email1} onChange={(event) => setEmail1(event.target.value)}></input><br></br>
                      <input type='password' placeholder='Password' value={password1} onChange={(event) => setPassword1(event.target.value)}></input><br></br>
                        <br></br>
                        <button type='submit' >Add User</button>
                        <br></br>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default App;