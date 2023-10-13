import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'

const Users = () => {
    const loadUsers = useLoaderData();
    const [users, setUsers] = useState(loadUsers)
    // console.log(loadUsers)

    const addUser = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        console.log(email, name)
        const user = { email, name }

        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    const newUser = [...loadUsers, user]
                    setUsers(newUser)
                    form.reset();
                    console.log(data)
                }
            })
        // .catch((error) => console.log(error))
    }
    const handleDelete = (id) =>{
        // e.preventDefault();
        console.log("click")
        console.log(id)

        fetch(`http://localhost:5000/users/${id}`,{
            method:"DELETE",
        })
        .then((res)=> res.json())
        .then((data) =>{
            console.log(data)
            if(data.deletedCount>0){
                alert("user deleted Successfully")
                const remaining = users.filter((user)=> user._id !== id)
                setUsers(remaining)
            }
        })
    }
    return (
        <div>
            <h2>Users: {users.length}</h2>
            <div>
                <form onSubmit={addUser}>
                    <input type="text" name='name' placeholder='Name' /> <br />
                    <input type="text" name='email' placeholder='Email' /> <br />
                    <button>Add user</button>
                </form>
            </div>

            <br />
            {
                users?.map((user) => (
                    <div key={user._id}>
                        <Link to={`/user/${user._id}`} >{user.name}</Link>
                        {/* <p>{user.name}</p> */}
                        <button onClick={()=> handleDelete(user._id)}>Delete</button>
                        <Link to={`/update/${user._id}`}><button>Update</button></Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Users