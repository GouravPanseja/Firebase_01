import logo from './logo.svg';
import './App.css';
import Auth from './components/Auth';
import PhoneAuth from './components/PhoneAuth';
import { Routes ,Route,useNavigate} from 'react-router-dom';
import Firestore from "./components/Firestore";
import Storage from './components/Storage';


function App() {
  const navigate = useNavigate();
  return (
    <div className="App bg-emerald-500">
        <nav className='flex justify-around h-[40px] w-screen'>
            <div onClick={()=>{navigate("/Phone")}} className='cursor-pointer'>SMS</div>
            <div onClick={()=>{navigate("/Auth")}} className='cursor-pointer'>Email</div>
            <div onClick={()=>{navigate("/")}} className='cursor-pointer'>Database</div>
            <div onClick={()=>{navigate("/Storage")}} className='cursor-pointer'>Storage</div>
        </nav>

        <Routes>
            <Route path="/" element={<Firestore/>}/>
            <Route path="/Phone" element={<PhoneAuth/>}/>
            <Route path="/Auth" element={<Auth/>}/>
            <Route path="/Storage" element={<Storage/>}/>
        </Routes>
        
    
    </div>
  );
}

export default App;
