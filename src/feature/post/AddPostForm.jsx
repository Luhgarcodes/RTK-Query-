import { useState } from "react"
import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/usersSlice"
import { useNavigate } from "react-router-dom"
import { useAddNewPostMutation } from "./postSlice"


const AddPostForm = () => {



    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const users = useSelector(selectAllUsers)
    const [addNewPost,{isLoading}] = useAddNewPostMutation()

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(Number(e.target.value))

    const optionsMenu = users.map(user =>(
        <option key={user.id} value={user.id}>{user.name}</option>
    ))


    const saveBtn = [userId,content,title].every(Boolean) && !isLoading 
    // const saveBtn = Boolean(title) && Boolean(content) && Boolean(userId)

    const onSubmit = async() => {
        if (saveBtn) { 
            try{
                await addNewPost({title,body:content,userId }).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
            }catch(err){
                console.log('Failed',err);
            }
        }
        // if (title && content && userId) {
        //     console.log(title , content , userId);
        //     dispatch(postAdded(title,content,userId))

        //     setTitle('')
        //     setContent('')
        //     setUserId('')
        // }
    }

    return (<>
        <section>
            <h2>
                Add a New Posts
            </h2>
            <form >
                <label htmlFor="posttitle">Title</label>
                <input type="text" name="postTitle" value={title} onChange={onTitleChanged} />
                <label htmlFor="">Content</label>
                <input type="text" name="postContent" value={content} onChange={onContentChanged} />
                <label htmlFor="">Select User</label>
                <select type="text" name="postUserId" value={userId} onChange={onAuthorChanged} >
                    <option value=""></option>
                    {optionsMenu}
                    </select>
                <button disabled={!saveBtn} type="button" onClick={onSubmit}>Submit </button>
            </form>
        </section>
    </>)
}

export default AddPostForm