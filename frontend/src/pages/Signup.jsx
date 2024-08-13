import { useState } from "react"
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const Signup = () => {

    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox label={"First Name"} placeholder={"John"} onChange={e => {
                    setFirstName(e.target.value)
                }}/>
                <InputBox label={"Last Name"} placeholder={"Doe"} onChange={e => {
                    setLastName(e.target.value)
                }} />
                <InputBox label={"Email"} placeholder={"abcd@gmail.com"} onChange={e => {
                    setUsername(e.target.value)
                }} />
                <InputBox label={"Password"} placeholder={"123456"} onChange={e => {
                    setPassword(e.target.value)
                }}/>
                <div className="pt-4">
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }} label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>  
        </div>
    </div>
}