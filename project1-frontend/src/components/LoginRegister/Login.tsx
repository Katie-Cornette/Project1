import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"
import { Register } from "./Register"
import { Button } from "react-bootstrap"
import "../../App.css"

export const Login: React.FC = () => {
    
    const[user, setUser] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate()

    const storeValues = (input:any) => {
        if(input.target.name ==="username"){
            setUser((user)=>({...user, username:input.target.value}))
        }else{
            setUser((user)=>({...user, password:input.target.value}))
        }
    }
    const login = async() => {

        const response = await axios.post("http://localhost:8080/auth", user, {withCredentials:true})
        .then(
            (response) => {
                console.log(response.data)
                store.loggedInUser = response.data
                alert("Welcome, " + store.loggedInUser.username)

                if(response.data.role==="user"){
                    navigate("/reim")
                }
                if(response.data.role==="manager"){
                    navigate("/users")
                }
            }
        )
        .catch(
            (error) => {
                alert("Login failed! Check that username and password are correct")
            }
        )
    }

    return(
        <div className="d-flex justify-content-center align-items-center vh-100 background">
            <div className="container border border bg-light text-center w-50 p-4">
                <h1 className="mt-5">Welcome to the Employee Reimbursement System</h1>
                <h5 className="mt-3">Login in to Create and View Reimbursements</h5>

                <div className="form-group mb-4 mt-4 w-50 mx-auto">
                    <input type="text" className="form-control" placeholder="username" name="username" onChange={storeValues} />
                </div>
                <div className="form-group w-50 mx-auto">
                    <input type="password" className="form-control" placeholder="password" name="password" onChange={storeValues} />
                </div>
                <Button variant="outline-info" className="m-4" onClick={login}>Login</Button>
                <Button variant="outline-info" className="m-4" onClick={() => navigate("/register")}>Create Account</Button>

            </div>

        </div>
    )
}