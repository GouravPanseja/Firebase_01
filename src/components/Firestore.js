import {useState,useEffect} from "react"
import {db} from "../config/firebase";
import { getDocs,collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";

export default function Firestore(){
    const [movieList , setMovieList] = useState([]);
    const movieCollectionRef = collection(db,"Movies");

    // add movie input states
    const [formTitle, setFormTitle] = useState("");
    const [formReleaseYear, setFormReleaseYear] = useState(0);
    const [formWonOscar, setFormWonOscar] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");

    const getMoviesList = async ()=>{
        try{
            const data = await getDocs(movieCollectionRef);
            const finalList = data.docs.map((doc)=>{
                return ( 
                    {
                        ...doc.data(),
                        id:doc.id,
                    }
                    
                     );
            })

            setMovieList(finalList);
         
        }
        catch(error){
            console.log(error);
        }
        

    }

    useEffect(()=>{
        getMoviesList();
    },[] )
    
    async function submitMovieHandler(){
         
        try{
            await addDoc(movieCollectionRef, {
                title: formTitle,
                releaseYear: formReleaseYear,
                wonOscar: formWonOscar, 
            })
            getMoviesList();
        }
        catch(error){
            console.log(error);
        }
        
    }

    const deleteMovie = async (id)=>{
       
        const movieDoc = doc(db,"Movies",id);
        await deleteDoc(movieDoc); 
        getMoviesList();
    }

    const updateTitle = async(id)=>{
        const movieDoc = doc(db,"Movies",id);
        await updateDoc(movieDoc,{title:updatedTitle} )
        getMoviesList();
    }


    return (
        <div className="h-screen w-screen bg-emerald-500 justify-around  ">

            <div className="flex flex-col">
                <input
                    type="text"
                    value={formTitle}
                    placeholder="movie title..."
                    className="mx-4 rounded h-7 px-2 w-[170px] mb-2"
                    onChange={(e)=> setFormTitle(e.target.value)}
                />
                <input
                    type="number"
                    value={formReleaseYear}
                    placeholder="release Year..."
                    className="mx-4 rounded h-7 px-2 w-[170px] mb-2"
                    onChange={(e)=> setFormReleaseYear(e.target.value)}
                />
                <label className="  flex items-center w-[150px] ml-3">Won Oscar
                    <input
                        type="checkBox"
                        checked={formWonOscar}
                        placeholder="won Oscar..."
                        className="mx-4 rounded h-7 px-2 "
                        onChange={(e)=> setFormWonOscar(e.target.checked)}
                    />
                </label>

                <button 
                    onClick={submitMovieHandler}
                    className="w-[100px] ml-3 bg-white p-1 text-[14px] rounded">
                        Submit Movie
                </button>
                
            </div>
            <div className="flex gap-5 justify-center flex-wrap">
                {
                    movieList &&
                    movieList.map((doc)=>(

                        <div className=" bg-gray-700 rounded w-[150px] h-[180px] flex flex-col justify-center text-white">
                            <h2>{doc.title}</h2>
                            <h3>{doc.releaseYear}</h3>
                            <h3>{doc.wonOscar ? "Oscar" : "No oscar"}</h3>

                            <button onClick={()=> deleteMovie(doc.id)}  className="bg-black w-[80%] mx-auto rounded"> Delete </button>

                            <input className="w-[80%] mx-auto rounded mt-2 mb-2 text-black" placeholder="update title..." value={updatedTitle} onChange={(e)=> setUpdatedTitle(e.target.value)}/>
                            <button onClick={()=> updateTitle(doc.id)}  className="bg-black w-[80%] mx-auto rounded">update</button>
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}