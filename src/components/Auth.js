import { useState,useRef } from "react";
import {auth,googleProvider} from "../config/firebase"
import { createUserWithEmailAndPassword,signInWithPopup,signOut } from "firebase/auth";
function Auth(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const display = useRef();

    const displayText =()=>{ 
        display.current.innerHTML = (auth?.currentUser?.email) ? `User email: ${auth.currentUser.email}` : "None";
        console.log(auth?.currentUser?.photoURL)
    }
    const signInWithGoogle= async ()=>{
        try{
            await signInWithPopup(auth,googleProvider);
        } 
        catch(e){
            console.log(e);
        }
      
    }
    const clickHandler= async (e)=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password);
           

        }
        catch(error){
            console.log(error)
        }
    }
    const logOut = async ()=>{
        await signOut(auth);
    }
    return(
        <div>
            <div>
                <input placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/> 
                <br/>
                <input placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/> 
            </div>
            <br/>
            <div>
                <button onClick={clickHandler}>Sign In</button>
                <br/>
                <button onClick={displayText}>Display user</button>
                <br/>
                <button onClick={signInWithGoogle}>Sign in with Google!</button>
                <br/>
                <button onClick={logOut}>Logout</button>
            </div>
            <div>
                <div ref={display}></div>
            </div>
            
            

            
        </div> 
            

    ) 
    
}    

export default Auth;