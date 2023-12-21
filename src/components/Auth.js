import { useState,useRef } from "react";
import {auth,googleProvider} from "../config/firebase"
import { createUserWithEmailAndPassword,signInWithPopup,signOut,signInWithEmailAndPassword } from "firebase/auth";
function Auth(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const display = useRef();

    const displayText =(text)=>{ 
        display.current.innerHTML = text
        
    }
    const signUpwithGoogle= async ()=>{
        try{
            await signInWithPopup(auth,googleProvider);
            displayText(`signedUp with google ${email} `)
        } 
        catch(e){
            displayText(e);
        }

    }
    const signUp= async (e)=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password);
            displayText(`signedUp as ${email} `)
           

        }
        catch(error){
            displayText(error)
        }
    }
    const logOut = async ()=>{
        try{
            await signOut(auth);
            displayText("logged out")
        }
        catch(error){
            displayText(error)
        }
        
    }
    const signIn = async()=>{
        try{
            await signInWithEmailAndPassword(auth,email,password);
            displayText(`signed in as ${email}`)
        }
        catch(error){
            displayText(error)
        }
        
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
                <button onClick={signIn}>signIn</button>
                <button onClick={signUp}>Sign Up</button>
                <br/>
                <button onClick={signUpwithGoogle}>Sign up with Google!</button>
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