import React, {useState,useEffect}from 'react'
import './Posts.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import firebase from  "firebase";



const Posts = ({postId,user,username, caption ,imageurl})=> {
    
    const [comments,setComments]= useState([]);
    const [comment,setComment]= useState('');

    
    useEffect(() => {
        let unsubscribe;
        if(postId){

            unsubscribe=db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp','desc')                
                .onSnapshot((snapshot)=>{
                    setComments(snapshot.docs.map((doc)=>doc.data()));
                });
        }


        
        return () => {
            unsubscribe();
        };
    }, [postId]); 
  
    const postComment = (event) =>{
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text:comment,
            username:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');

    }
  
  
  
  
    
    return (
        <div className="posts">
           <div className="posts_header"> 
                <Avatar 
                        className="posts_avatar"
                        alt={username}
                        src="/static/images/avatar/1.jpg"
                />
            
            
            
                 <h3>{username}</h3>
            </div>
            
            
            <img className="posts__image" src={imageurl} />
            
            
            <h4 className="posts_text"><strong>{username}</strong>: {caption} </h4>

            <div className="post__comments">
                {
                    comments.map((comment)=>(
                        <p>
                            <strong>{comment.username}</strong>{comment.text}
                        </p>

                    ))
                }


            </div>
            
            
            {user && (  <form className="post__commentBox">
                <input
                 className="post__input"
                 type="text"
                 placeholder="add comment"
                 value={comment}
                 onChange={(e)=>setComment(e.target.value)}


                />
                <button
                className="post__button"
                disabled={!comment}
                type="submit"
                onClick={postComment}
                >Post</button>
            </form>)}
            
          
       
       
       
       
       
       
       
       
        </div>
    )
}


export default Posts;