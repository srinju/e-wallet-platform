import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const Signin = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignin = async() => {
        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
            });

            if(response.status === 200) {
                const {token} = response.data;
                localStorage.setItem("token",token)
                navigate("/dashboard");
            } else {
                console.log("Response data : " , response.data);
                alert("Authentication failed . Please check your credentias!!")
            }
        } catch(err) {
            console.error("error signing in:",err);
            alert("an error occured during signin . please try again later");
        }
    }

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to access oyur account"} />
                <InputBox label={"Email"} placeholder={"adbcd@gmail.com"} onChange={e => {
                    setUsername(e.target.value)
                }} />
                <InputBox label={"Password"} placeholder={"123456"} onChange={e => {
                    setPassword(e.target.value)
                }}/>
                <div className="pt-4">
                    <Button label={"Sign in"} onClick={handleSignin}/>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>

}