import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import axios from "axios"
import { User } from "./User"

export const UsersContainer: React.FC<any> = ({users:any}) => {

    const navigate = useNavigate()
    const [users, setUsers] = useState<UserInterface[]>([])

    useEffect(()=>{
        getAllUsers()
    })

    const getAllUsers = async () => {
        const response = await axios.get("http://localhost:8080/users", {withCredentials:true})
        .then(
            (response) => {
                setUsers(response.data)
                console.log(response.data)
            }
        )
    }

        
        return(
            <div className="container-fluid vh-100 vw-100 background ">
    
                <div className="navbar navbar-dark bg-dark">
                
                    <a className="nav-item nav-link text-white ms-4 " href="#"  onClick={() => navigate("/")}>
                        Login
                    </a>
                    <a className="nav-item nav-link text-white me-4" href="#" onClick={() => navigate("/users")}>
                        Users
                    </a>
                    <a className="nav-item nav-link text-white me-4" href="#" onClick={() => navigate("/addReim")}>
                        Add Reimbursement
                    </a>

                    <a className="nav-item nav-link text-white " href="#" onClick={() => navigate("/reim")} >
                        See Reimbursements
                    </a>
                    <a className="nav-item nav-link text-white" href="#" onClick={() => navigate("/allReim")}>
                        Users Reimbursements
                    </a>
                    <a className="nav-item nav-link text-white me-4" href="#" onClick={() => navigate("/profile")}>
                        Profile
                    </a>
                    
                </div>
                <div className="container"><User users={users}></User></div>
               


            </div>
        )
}