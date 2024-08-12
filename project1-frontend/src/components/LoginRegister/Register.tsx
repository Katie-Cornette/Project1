import axios from "axios"
import { useState } from "react"
import { Alert, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "../../App.css"

export const Register: React.FC = () => {

    const[errorMessage, setErrorMessage] = useState('')
    const[showAlert, setShowAlert] = useState(false)
    const[user, setUser] = useState({
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        role: "user"
    })

    const navigate = useNavigate()

    const validateInputs = async (): Promise<boolean> => {
        if (!user.firstName || !user.lastName) {
            setErrorMessage("First name and last name are required.")
            setShowAlert(true)
            return false
        }

        if (user.username.length <= 7) {
            setErrorMessage("Username must be greater than 7 characters.")
            setShowAlert(true)
            return false
        }

        try {
            const usernameCheck = await axios.get("http://localhost:8080/users/" + user.username, {withCredentials:true})
            if (usernameCheck.data.exists) {
                setErrorMessage("Username is already taken. Please choose a different username.")
                setShowAlert(true)
                return false
            }
        } catch (error) {
            setErrorMessage("Error checking username availability. Please try again.")
            setShowAlert(true)
            return false
        }

        if (user.password.length <= 8) {
            setErrorMessage("Password must be greater than 8 characters.")
            setShowAlert(true)
            return false
        }

        return true
    };

    const storeValues =(input:any) => {

        if(input.target.name ==="firstName"){
            setUser((user)=>({...user, firstName:input.target.value}))
        }else if(input.target.name === "lastName"){
            setUser((user) =>({...user, lastName:input.target.value}))
        }else if(input.target.name === "username"){
            setUser((user)=>({...user, username:input.target.value}))
        }else{
            setUser((user)=>({...user, password:input.target.value}))
        }
    }

    const register = async () => {
        const response = await axios.post("http://localhost:8080/users", user)
        .then((response)=>{
            console.log(response.data)
            alert(response)
            navigate("/")
        })
        .catch((error)=>{
            if(error.response && error.response.status === 400){
                setErrorMessage(error.response.data)
            } else {
                setErrorMessage("An unexpected error occurred")
            }
            setShowAlert(true);
        })
    }
    return(
        <div className="d-flex justify-content-center align-items-center vh-100 background">
            <div className="container border border bg-light text-center w-50 p-4">
                <h3>Register for a new account here!</h3>
                {showAlert && (
                    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                        {errorMessage}
                    </Alert>
                )}

            
                <div className="container border bg-light mt-4"> 
                    <div className="form-group mb-4 mt-4">
                        <input type="text" className="form-control" placeholder="First name" name="firstName" onChange={storeValues} />
                    </div>
                    <div className="form-group  mb-4 mt-4">
                        <input type="text" className="form-control" placeholder="Last name" name="lastName" onChange={storeValues} />
                    </div>
                    <div className="form-group  mb-4 mt-4">
                        <input type="text" className="form-control" placeholder="username" name="username" onChange={storeValues} />
                    </div>
                    <div className="form-group mb-4 mt-4">
                        <input type="password" className="form-control" placeholder="password" name="password" onChange={storeValues} />
                    </div>
                    <Button variant="outline-info" className="m-4" onClick={register}>Create</Button>
                    <Button variant="outline-info" className="m-4" onClick={() => navigate("/")}>Login</Button>
                </div>
       
           
            </div>
        </div>
    )
}