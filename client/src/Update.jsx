import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const Update = () => {
    // const [user, setuser] = useState()
    const userData = useLoaderData();
    const handleUpdate = (e) =>{
        e.preventDefault()
        console.log("update")
        const name = e.target.name.value
        const email = e.target.email.value
        const user = {name,email}
        console.log(user)

        fetch(`http://localhost:5000/user/${userData?._id}`,{
            method:"PUT",
            headers:{
                'content-type':"application/json"
            },
            body: JSON.stringify(user)

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                alert("Update successsfully")
            }
        })
        
    }
    return (
        <div>
            <h2>Update</h2>
            <div>
                <form onSubmit={ handleUpdate}>
                    <input type="text" placeholder='Name' name='name' defaultValue={userData?.name} /><br />
                    <input type="text" placeholder='Email' name='email' defaultValue={userData?.email}  /><br />
                    <input type="submit" value="Update" />
                </form>
            </div>
        </div>
    )
}

export default Update