import { useEffect, useState } from "react"
import axios from "axios";


export const Balance = () => {
    const [balance,setBalance] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                });
                setBalance(response.data.balance);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBalance();
    },[]);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error : {error}</p>;
    
    return <div className="flex">
        <div className="font-bold text-lg">
            <p>Your Balance</p>
        </div>
        <div className="font-semibold ml-4 text-lg">
            <p>Rs {balance}</p>
        </div>
    </div>
}