import { auth } from "../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OtpInput from "otp-input-react"; 
import {BsFillShieldLockFill,BsTelephoneFill} from "react-icons/bs";
import {CgSpinner} from "react-icons/cg";
import {useState,useEffect} from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {Toaster,toast} from "react-hot-toast"




export default function PhoneAuth() {
    const [otp, setOtp] =useState("");
    const [ph, setPh] =useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user,setUser] = useState(null);

    function onCaptchaVerify(){
        if(!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                  // reCAPTCHA solved, allow signInWithPhoneNumber.               
                },
                'expired-callback': () => {
                  // Response expired. Ask user to solve reCAPTCHA again.
                }
              });
        }
    }
    
    function onSignup(){
        setLoading(true);
        onCaptchaVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh ='+'  + ph;
        console.log(formatPh);

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
             
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success('OTP sent successfully!')
                // ...
            }).catch((error) => {
                
                console.log(error);
                    setLoading(false);
            });

    }
    
    function onOTPVerify(){
        setLoading(true);
        window.confirmationResult.confirm(otp)
        .then( async(result)=>{
            console.log(result.user);
            setUser(result.user);
            setLoading(false); 
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false);
        })

    }
    
    

    return (
        <div className="w-screen h-screen bg-emerald-500 flex justify-center items-center">
            <div>
            <Toaster toastOptions={{duration:4000 }}/>
            <div id="recaptcha-container"></div>
            {
                !user
                ?
                <div className="w-100  flex flex-col gap-4 rounded-lg p-4">
                    <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                        Welcome to <br/> FIREBASE OTP VERIFICATION
                    </h1>

                    {
                        showOTP ?
                        <>
                            <div className="text-emerald-500 bg-white w-max mx-auto p-4 rounded-full">
                                <BsFillShieldLockFill size={30}/>
                            </div>
                            <label htmlFor="otp" className="font-bold text-xl text-white">
                                Enter Your OTP
                            </label>
                            <OtpInput 
                                OTPLength={6} 
                                onChange={setOtp}  //automatically puts otp typed as argument to setOtp func
                                value={otp}
                                otpType="number"
                                disabled={false}
                                autoFocus         // to keep field in focus as the page opens
                                className="otp-container"
                            ></OtpInput>
                            <button onClick={onOTPVerify} className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded" >
                                    {
                                        loading? 
                                        <CgSpinner size={20} className="mt-1 animate-spin"/>
                                        :
                                        "Verify OTP"

                                    }
                                    
                                
                            </button>
                        </>
                        :
                        <>
                            <div className="text-emerald-500 bg-white w-max mx-auto p-4 rounded-full">
                                <BsTelephoneFill size={30}/>
                            </div>
                            <label htmlFor="ph" className="font-bold text-xl text-white">
                               <div>Verify your Phone Number</div> 
                            </label>
                            <div id='ph' >
                                <PhoneInput country={"in"} value={ph} onChange={setPh} buttonClass="phBtn" dropdownClass="phDropDown" containerClass="phCont" className="w-full"/>
                                <button onClick={onSignup} className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded" >
                                        {
                                            loading? 
                                            <CgSpinner size={20} className="mt-1 animate-spin"/>
                                            :
                                            "Send code via SMS"

                                        }
                                        
                                    
                                </button>
                            </div>
                        
                        </>

                    }
                    
                    
                </div>
                :
                <h2 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                    You Have Logged In Succesfully!
                </h2>
            }
                
                
            </div>
        </div>
    );
}
