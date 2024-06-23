import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from './usersSlice'
import { useGetPostsByUserIDQuery } from '../post/postSlice'


const UserPage = () => {
    

const {userId} = useParams()
const user = useSelector(state => selectUserById(state,userId))

const {data:postForUser,isLoading,isSuccess,isError,error}= useGetPostsByUserIDQuery(userId)

let content;
if(isLoading){
  content = <p>Loading......</p>
}else if(isSuccess){
  const {ids,entities} = postForUser
  content = ids.map(id =>(
    <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
    </li>
  ))
  
}else if(isError){
  content = <p>{error}</p>
}

    return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{content}</ol>
    </section>
  )
}

export default UserPage
