import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'

const User = () => {
    const user = useLoaderData()
    console.log(user)
  return (
    <div>
        <p>user Id : {user._id}</p>
        <p>user Name : {user.name}</p>
        <p>user Email : {user.email}</p>
        <Link to={`/users`}>Go to Users</Link>
    </div>
  )
}

export default User;