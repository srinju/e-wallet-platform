import { useNavigate } from "react-router-dom"


export const TransactionSucess = () => {
    const navigate = useNavigate();
    return <div className="flex">
        <div className="text-xl text-bold">
            <p>Transaction successful</p>
        </div>
        <div className="ml-10 underline mt-2">
            <button onClick={() => {
                navigate("/dashboard")
            }}>Home</button>
        </div>
    </div>
}