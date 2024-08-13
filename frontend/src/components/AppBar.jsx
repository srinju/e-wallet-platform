import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export const AppBar = () => {

    const [initial,setInitial] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem("username");
        if(username){
            setInitial(username.charAt(0).toUpperCase());
        }
    },[]);
    
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            <p>Wallet</p>
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                <p>Hello</p>
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    <span className="text-xl text-gray-800">U</span>
                </div>
            </div>
            <div className="mt-4 mr-2 ml-2">
                <button onClick={() => {
                    localStorage.clear("token");
                    navigate("/signin");
                }}>Logout</button>
            </div>
            
        </div>
    </div>
    
}

    
