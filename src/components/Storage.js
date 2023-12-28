import {useState} from "react"
import {storage} from "../config/firebase"
import {uploadBytes,ref} from "firebase/storage"


export default function Storage(){
    const [file, setFile]= useState(null);
    const [loading,setLoading] = useState(false);
    

    const uploadFile = async ()=>{
        
        if(!file) return
    
        const folderRef = ref(storage, `project-files/${file.name}`);
        console.log(file.name);
        try{
            setLoading(true);
            await uploadBytes(folderRef, file);
            setLoading(false);
        }
        catch(err){
            setLoading(false);
            console.error(err);
        }
        
       
        
    }
    return(
        <div className="h-screen w-screen bg-emerald-500">
            <input type="file" onChange={(e)=> setFile(e.target.files[0])} />
            <br/>
            <button onClick={uploadFile}>upload File</button>
            <div>
                {
                    loading && "uploading please wait..." 
                }
            </div>

        </div>
    )
}   