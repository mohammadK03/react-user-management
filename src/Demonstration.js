import React, { useEffect } from 'react'

import SingleUser from './SingleUser'

export default function Demonstration(props) {
    const handleDeleteUser = user => {
        props.handleDeleteUser(user);
    }

  return (
    <div>
        {
            props.users.map((user, i) => {
                return <SingleUser 
                        key={i}
                        user={user}
                        handleDelete={handleDeleteUser}/>
            })
        }
    </div>
  )
}
