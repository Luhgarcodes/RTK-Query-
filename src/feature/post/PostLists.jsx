import { useSelector } from "react-redux"
import { selectPostIds } from "./postSlice"
import PostExcert from "./PostExcert"
import { useGetpostsQuery } from "./postSlice"



const PostLists = () => {


    const {
        isLoading, isSuccess,isError,error
    } = useGetpostsQuery()

    const orderedPostIds = useSelector(selectPostIds)
    let content;
    if(isLoading){
        content=<p>Loading..........</p>
    }else if(isSuccess){
        content = orderedPostIds.map((post)=> <PostExcert key={post.id} postId={post}/>);
    }else if(isError){
        content=<p>Error..........</p>  
    }

 

    return (<>
        <section>
            {content}
        </section>
    </>)
}

export default PostLists