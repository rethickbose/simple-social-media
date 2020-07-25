import React, {useState, useEffect } from 'react';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import Posts from './Posts';
import './App.css';
import {auth, db} from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button ,Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));






function App() {
   const [posts, setPosts] = useState([]);
   const [open , setOpen]=useState(false);
   const classes = useStyles();
   const [modalStyle] = React.useState(getModalStyle);
  

   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const[user,setUser]=useState(null)
  const[openSignIn,setOpenSignIn]=useState(false);



   useEffect(() => {
    const unsubscribe= auth.onAuthStateChanged((authUser)=>{
        if(authUser)
        {
            console.log(authUser);
            setUser(authUser);
           
        
       }
        
        else{
          setUser(null)
        }
          
     })

     return()=>{
      unsubscribe();
    }
   }, [user,username])
   
   
   useEffect(()=>{
    db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot=>(

      setPosts(snapshot.docs.map(doc=>({
        
        id:doc.id,
        posts:doc.data()
      })))      
    ))

   }, [] );
  
   const signUp = (event)=>{
    event.preventDefault();

     auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
        return  authUser.user.updateProfile({
          displayName:username
        })
      })
    .catch((error)=>alert(error.message));
   
    setOpen(false);
  }


   const signIn = (event) => {
     event.preventDefault();

     auth
     .signInWithEmailAndPassword(email,password)
     .catch( (error) =>  alert(error.message))
   
    setOpenSignIn(false);

    }




  return (
    <div className="App">
   
     
     
     
     
     
     <Modal
        open={open}
        onClose={()=>setOpen(false)   }
        
      >
        <div style={modalStyle} className={classes.paper}>
              
              <form className="app_signup">
              <center>

                  <div className="app_headerImage">
                          <DynamicFeedIcon  fontSize="large"  />
                  </div>  
              </center>
              <Input 
                placeholder="username" 
                type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}

              />
              <Input 
              placeholder="email" 
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}

              />
              <Input 
              placeholder="password" 
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}

                />

              <Button type="submit" onClick={signUp}> sign Up</Button>





              </form>
              
              
              
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)   }
        
      >
        <div style={modalStyle} className={classes.paper}>
              
              <form className="app_signup">
              <center>

                  <div className="app_headerImage">
                          <DynamicFeedIcon  fontSize="large"  />
                  </div>  
              </center>
              
              <Input 
              placeholder="email" 
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}

              />
              <Input 
              placeholder="password" 
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}

                />

              <Button type="submit" onClick={signIn}> sign In</Button>





              </form>
              
              
              
        </div>
      </Modal>


       
          <div className="app_header" >
         
            <div className="app_headerImage">
                 <DynamicFeedIcon  fontSize="large"  />
            </div>  
           
            {user ? (
            <Button onClick={()=>auth.signOut()}>Logout</Button>

          ):
          
          (
              <div className="app_loginContainer">
              
                  <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>

                 
                  <Button onClick={()=>setOpen(true)}>Sign Up</Button>

              </div>



              

          )}

          </div>

         

          <div className="app__posts">
          
              <div className="app__postsLeft">
              {
                posts.map(( {id,posts})=>
               (
                  <Posts key={id} postId={id} user={user} username={posts.username} caption={posts.caption} imageurl={posts.imageurl}/> 
                ))

                 }

              </div>
              <div className="app__postsRight">
              
              <InstagramEmbed
               url=''
              maxWidth={320}
              hideCaption={false}
               containerTagName='div'
               protocol=''
               injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
              />

              {user?.displayName ? (
                  <ImageUpload username={user.displayName}/>

                ):
              (
                <h3>Sorry you need to login</h3>
                )}
     
          

              </div>
          
          </div>

          
        





          
    </div>
       
       
       
       

  );
}

export default App;

/* <img  className="app_headerImage" 
                    src={DynamicFeedIcon}
                    alt='no picture'

              />
              
              
              {
        username:"rethick",
        caption:"UOLO",
        imageurl:" http://static.dnaindia.com/sites/default/files/styles/full/public/2018/03/10/659317-arvind-kejriwal-1-pti.jpg"
   
    },

    {
      username:"rethick",
      caption:"UOLO",
      imageurl:" http://static.dnaindia.com/sites/default/files/styles/full/public/2018/03/10/659317-arvind-kejriwal-1-pti.jpg"
 
    }

              
             
    
        {user?.displayName ? (
          <ImageUpload username={user.displayName}/>

        ):
        (
          <h3>Sorry you need to login</h3>
        )}
     

              
              */
             